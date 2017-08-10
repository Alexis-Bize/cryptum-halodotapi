import lodashGet from 'lodash.get'
import HTTPStatus from '@modules/http/status'

const DEFAULT_CODE = 0
const DEFAULT_STATUS = HTTPStatus.INTERNAL_ERROR
const DEFAULT_MESSAGE = 'Something went wrong...'

const errorNamespaces = {
    // HTTP
    INTERNAL_ERROR:             [DEFAULT_CODE, DEFAULT_STATUS, DEFAULT_MESSAGE],
    NOT_FOUND:                  [1, HTTPStatus.NOT_FOUND, 'Not found'],
    UNAUTHORIZED:               [2, HTTPStatus.UNAUTHORIZED, 'Unauthorized'],
    AUTH_REQUIRED:              [3, HTTPStatus.AUTH_REQUIRED, 'Authentication required'],
    METHOD_NOT_ALLOWED:         [4, HTTPStatus.METHOD_NOT_ALLOWED, 'Method not allowed'],
    SERVICE_UNAVAILABLE:        [5, HTTPStatus.SERVICE_UNAVAILABLE, 'Service not available'],
    TOO_MANY_REQUESTS:          [6, HTTPStatus.TOO_MANY_REQUESTS, 'Too many requests'],
    BAD_REQUEST:                [7, HTTPStatus.BAD_REQUEST, 'Bad request'],
    REQUEST_TIMEOUT:            [8, HTTPStatus.REQUEST_TIMEOUT, 'Request timeout'],
    // Misc
    UNKNOWN_GAME:               [30, HTTPStatus.BAD_REQUEST, 'Specified game does not exist: {0}'],
    // Spartan Token
    SPARTAN_TOKEN_MALFORMATED:  [60, HTTPStatus.UNAUTHORIZED, 'Specified SpartanToken is malformated'],
    SPARTAN_TOKEN_EXPIRED:      [61, HTTPStatus.UNAUTHORIZED, 'Specified SpartanToken has expired'],
}

export const getErrorByNamespaceKey = (namespace, keys = []) => {

    let error = lodashGet(errorNamespaces, namespace) || errorNamespaces.INTERNAL_ERROR;
    let clone = error.slice(0);

    keys = typeof keys === 'string' ? [keys] : keys;

    if (keys.length) {
        keys.forEach((key, index) => {
            clone[2] = clone[2].replace(`{${index}}`, key);
        });
    }

    return clone;

}

export const extractErrorParameters = (error = []) => {
    return {
        code: error[0],
        status: error[1],
        message: error[2]
    }
}

export default class HaloDotAPIError extends Error
{
    constructor(error = [], additionalParameters = {}) {

        const { headers, debug } = additionalParameters;

        error = extractErrorParameters(error);
        super(error.message);

        Object.setPrototypeOf(this, HaloDotAPIError.prototype);
        this.name = this.constructor.name;

        this.extra = {
            error: {
                code: error.code,
                status: error.status,
                message: this.message,
                headers, debug
            }
        };
        
    }
}