import _ from '@modules/helpers/lodash'
import HTTPStatus from '@modules/http/status'

const DEFAULT_CODE = -1
const DEFAULT_STATUS = HTTPStatus.INTERNAL_ERROR
const DEFAULT_REASON = 'INTERNAL_ERROR'
const DEFAULT_MESSAGE = 'Something went wrong...'

/**
 * Error namespaces
 * @return {Object}
 */
const errorNamespaces = {
    // HTTP
    INTERNAL_ERROR:             [DEFAULT_CODE, DEFAULT_STATUS, DEFAULT_MESSAGE, DEFAULT_REASON],
    NOT_FOUND:                  [10, HTTPStatus.NOT_FOUND, 'Not found', 'NOT_FOUND'],
    UNAUTHORIZED:               [11, HTTPStatus.UNAUTHORIZED, 'Unauthorized', 'UNAUTHORIZED'],
    AUTH_REQUIRED:              [12, HTTPStatus.AUTH_REQUIRED, 'Authentication required', 'AUTH_REQUIRED'],
    METHOD_NOT_ALLOWED:         [13, HTTPStatus.METHOD_NOT_ALLOWED, 'Method not allowed', 'METHOD_NOT_ALLOWED'],
    SERVICE_UNAVAILABLE:        [14, HTTPStatus.SERVICE_UNAVAILABLE, 'Service not available', 'SERVICE_UNAVAILABLE'],
    TOO_MANY_REQUESTS:          [15, HTTPStatus.TOO_MANY_REQUESTS, 'Too many requests', 'TOO_MANY_REQUESTS'],
    BAD_REQUEST:                [16, HTTPStatus.BAD_REQUEST, 'Bad request', 'BAD_REQUEST'],
    REQUEST_TIMEOUT:            [17, HTTPStatus.REQUEST_TIMEOUT, 'Request timeout', 'REQUEST_TIMEOUT'],
    // Internal
    UNKNOWN_GAME:               [30, HTTPStatus.INTERNAL_ERROR, 'Specified game does not exist: {0}', 'GAME_UNKNOWN'],
    UNKNOWN_AUTHORITY:          [31, HTTPStatus.INTERNAL_ERROR, 'Specified authoritiy does not exist: {0}', 'UNKNOWN_AUTHORITY'],
    // Authorization
    MALFORMATED_AUTHORIZATION:  [50, HTTPStatus.INTERNAL_ERROR, 'Specified authorization is malformated', 'SPARTAN_TOKEN_MALFORMATED'],
    AUTHORIZATION_EXPIRED:      [51, HTTPStatus.UNAUTHORIZED, 'Specified authorization has expired', 'SPARTAN_TOKEN_EXPIRED'],
    // Miscellaneous
    MISSING_PARAMETER:          [70, HTTPStatus.BAD_REQUEST, 'Missing mandatory parameter: {0}', 'MISSING_PARAMETER'],
    DUPLICATE_ENTRY:            [71, HTTPStatus.BAD_REQUEST, 'Duplicate declaration for: {0}', 'MISSING_PARAMETER']
}

/**
 * Get error by namespace key
 * @param {string} namespace 
 * @param {Array=} keys 
 */
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

/**
 * Get error by https status code
 * @param {number} statusCode 
 * @param {Array=} keys 
 */
export const getErrorByHTTPStatusCode = (statusCode, keys = []) => {

    let errorNamespace = null;
    const statusKeys = Object.keys(HTTPStatus);

    for (let i = 0, l = statusKeys.length; i < l; ++i) {
        if (HTTPStatus[statusKeys[i]] === statusCode) {
            errorNamespace = statusKeys[i];
            break;
        }
    }

    return getErrorByNamespaceKey(errorNamespace, keys);

}

/**
 * Extract error parameters
 * @param {Array} error 
 */
export const extractErrorParameters = (error = []) => {
    return {
        code: error[0],
        status: error[1],
        message: error[2],
        reason: error[3]
    }
}

/**
 * HaloDotAPIError Class
 */
export default class HaloDotAPIError extends Error
{
    /**
     * @return {Object}
     */
    static lastError = {}

    /**
     * HaloDotAPIError constructor
     * @param {Array=} error 
     * @param {Object=} additionalParameters 
     */
    constructor(error = [], additionalParameters = {}) {

        const { headers, debug } = additionalParameters;

        error = extractErrorParameters(error);
        super(error.message);

        Object.setPrototypeOf(this, HaloDotAPIError.prototype);
        this.name = this.constructor.name;

        HaloDotAPIError.lastError = {
            code: error.code,
            status: error.status,
            message: this.message,
            reason: error.reason,
            headers, debug
        };
        
    }

    /**
     * Get formated error
     * @return {Object}
     */
    getFormatedError = () => {

        const error = HaloDotAPIError.lastError;
        let formated = {};

        Object.keys(error).forEach(key => {
            if (undefined !== error[key]) {
                formated[key] = error[key];
            }
        });

        return formated;

    }

    /**
     * Get error code
     * @return {number}
     */
    getCode = () => this.getFormatedError().code || DEFAULT_CODE

    /**
     * Get error status
     * @return {number}
     */
    getStatus = () => this.getFormatedError().status || DEFAULT_STATUS

    /**
     * Get error message
     * @return {string}
     */
    getMessage = () => this.getFormatedError().message || DEFAULT_MESSAGE

    /**
     * Get error reason
     * @return {string}
     */
    getReason = () => this.getFormatedError().reason || DEFAULT_REASON

    /**
     * Get error stack
     */
    getStack = () => this.stack
}