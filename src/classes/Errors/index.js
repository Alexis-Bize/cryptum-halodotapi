import _ from '@modules/helpers/lodash'
import HTTPStatus from '@modules/http/status'

const DEFAULT_CODE = 0
const DEFAULT_STATUS = HTTPStatus.INTERNAL_ERROR
const DEFAULT_MESSAGE = 'Something went wrong...'

const errorNamespaces = {
    // HTTP
    INTERNAL_ERROR:             [DEFAULT_CODE, DEFAULT_STATUS, DEFAULT_MESSAGE, 'INTERNAL_ERROR'],
    NOT_FOUND:                  [1, HTTPStatus.NOT_FOUND, 'Not found', 'NOT_FOUND'],
    UNAUTHORIZED:               [2, HTTPStatus.UNAUTHORIZED, 'Unauthorized', 'UNAUTHORIZED'],
    AUTH_REQUIRED:              [3, HTTPStatus.AUTH_REQUIRED, 'Authentication required', 'AUTH_REQUIRED'],
    METHOD_NOT_ALLOWED:         [4, HTTPStatus.METHOD_NOT_ALLOWED, 'Method not allowed', 'METHOD_NOT_ALLOWED'],
    SERVICE_UNAVAILABLE:        [5, HTTPStatus.SERVICE_UNAVAILABLE, 'Service not available', 'SERVICE_UNAVAILABLE'],
    TOO_MANY_REQUESTS:          [6, HTTPStatus.TOO_MANY_REQUESTS, 'Too many requests', 'TOO_MANY_REQUESTS'],
    BAD_REQUEST:                [7, HTTPStatus.BAD_REQUEST, 'Bad request', 'BAD_REQUEST'],
    REQUEST_TIMEOUT:            [8, HTTPStatus.REQUEST_TIMEOUT, 'Request timeout', 'REQUEST_TIMEOUT'],
    // Misc
    UNKNOWN_GAME:               [30, HTTPStatus.BAD_REQUEST, 'Specified game does not exist: {0}', 'UNKNOWN_GAME'],
    // Spartan Token
    SPARTAN_TOKEN_MALFORMATED:  [60, HTTPStatus.UNAUTHORIZED, 'Specified SpartanToken is malformated', 'SPARTAN_TOKEN_MALFORMATED'],
    SPARTAN_TOKEN_EXPIRED:      [61, HTTPStatus.UNAUTHORIZED, 'Specified SpartanToken has expired', 'SPARTAN_TOKEN_EXPIRED'],
    SPARTAN_TOKEN_MISSING:      [62, HTTPStatus.BAD_REQUEST, 'Missing mandatory SpartanToken', 'SPARTAN_TOKEN_MISSING']
}

export const getErrorByNamespaceKey = (namespace, keys = []) => {

    let error = _.get(errorNamespaces, namespace) || errorNamespaces.INTERNAL_ERROR;
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
        message: error[2],
        reason: error[3]
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
                reason: error.reason,
                headers, debug
            }
        };
        
    }

    /**
     * Get formated error
     * @return {Object}
     */
    getFormatedError = () => _.get(this.extra, 'error') || {}

    /**
     * Get error code
     * @return {number}
     */
    getErrorCode = () => this.getFormatedError().code || -1

    /**
     * Get error status
     * @return {number}
     */
    getErrorStatus = () => this.getFormatedError().status || -1

    /**
     * Get error message
     * @return {string}
     */
    getErrorMessage = () => this.getFormatedError().message || ''

    /**
     * Get error reason
     * @return {string}
     */
    getErrorReason = () => this.getFormatedError().reason || ''
}