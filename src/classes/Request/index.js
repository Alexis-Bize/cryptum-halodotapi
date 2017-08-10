import request from 'request'
import queryString from 'query-string'
import { v4 as createUUID } from 'uuid'

import HaloDotAPIError, {
    getErrorByNamespaceKey
} from '@classes/Errors'

import _ from '@modules/helpers/lodash'
import endpoints from '@modules/api/endpoints'
import platforms from '@modules/api/platforms'

import HTTPStatus from '@modules/http/status'
import HTTPMethods from '@modules/http/methods'
import HTTPContentTypes from '@modules/http/content-types'

export default class Request
{
    /**
     * Request constructor
     * @param {string} spartanToken
     * @param {string=} telemetrySessionId
     */
    constructor(spartanToken, telemetrySessionId = '') {
        this.spartanToken = String(spartanToken || '');
        this.telemetrySessionId = telemetrySessionId || createUUID();
    }

    /**
     * Get spartan token
     * @return {string}
     */
    getSpartanToken = () => this.spartanToken

    /**
     * Get telemetry session id
     * @return {string}
     */
    getTelemetrySessionId = () => this.telemetrySessionId

    /**
     * Get endpoints
     * @return {Object}
     */
    getEndpoints = () => endpoints

    /**
     * Get endpoint by key
     * @return {Object}
     */
    getEndpointByKey = key => _.get(this.getEndpoints(), key) || null

    /**
     * Check spartanToken format
     * @return {boolean}
     */
    isSpartanTokenValid = () => /^v[2-3]=([a-zA-Z0-9;\-:_]+)$/g.test(
        this.getSpartanToken()
    )
    
    formatParameters = parameters => {

        const formated = {};

        Object.keys(parameters).forEach(name => {

            let value = parameters[name];

            if (typeof value === 'string') {
                value = encodeURIComponent(value);
            } else if (true === Array.isArray(value)) {
                value = Array.isArray(value) ? value : [value]
                .map(value => encodeURIComponent(value));
            }

            formated[name] = value;

        });

        return formated;

    }

    /**
     * Format endpoint
     * @param {string} endpoint
     * @param {Object=} parameters
     * @return {string}
     */
    formatEndpoint = (endpoint, parameters = {}) => {

        (endpoint.match(/{([a-zA-Z]*?)}/g) || []).forEach(match => {
            endpoint = endpoint.replace(
                match, (parameters[match.replace(/\{|\}/g, '')] || null)
            );
        });

        const { options } = parameters || {
            options: {}
        };

        const platform = options.platform === platforms.PC ? (
            options.platform.toLowerCase()
        ) : '';

        return endpoint.replace(/\[platform\]/g, platform);

    }

    /**
     * Format headers
     * @param {Object} headers
     * @return {string}
     */
    formatHeaders = headers => {

        let output = {};

        Object.keys(headers).forEach(header => {

            const headerName = header.split('-').map(key => {
                return key.charAt(0).toUpperCase() + key.slice(1);
            }).join('-');

            output[headerName] = headers[header];

        });

        return output;
        
    }

    /**
     * Call the API with specified arguments
     * @param {string} method 
     * @param {string} endpoint
     * @param {Object=} parameters
     * @throws HaloDotAPIError
     * @return Promise
     */
    call = (method, endpoint, parameters = {}) => {

        return new Promise((resolve, reject) => {

            if (false === this.isSpartanTokenValid()) {
                return reject(
                    new HaloDotAPIError(
                        getErrorByNamespaceKey('MALFORMATED_SPARTAN_TOKEN')
                    )
                );
            }

            if ((endpoint || '').length === 0) {
                return reject(
                    new HaloDotAPIError(
                        getErrorByNamespaceKey('INTERNAL_ERROR')
                    )
                );
            }

            parameters = this.formatParameters(parameters);

            const { body } = parameters;
            const { options } = parameters || {
                options: {}
            };

            if (true !== options.unsetSpartanToken && (
                endpoint.indexOf('svc.halowaypoint.com') !== -1 ||
                endpoint.uri.indexOf('cloudapp.net') !== -1
            )) options.query = Object.assign({}, options.query || {}, { auth: 'st' });

            let requestOptions = {
                method,
                uri: this.formatEndpoint(endpoint, parameters),
                followRedirect: true,
                gzip: true,
                headers: Object.assign({}, {
                    'Accept': HTTPContentTypes.JSON,
                    'Accept-Encoding': 'gzip',
                    'Accept-Language': 'en',
                    'User-Agent': 'cpprestsdk/2.4.0'
                }, _.isObject(options.headers) ? (
                    this.formatHeaders(options.headers)
                ) : {})
            };

            if (true !== options.unsetSpartanToken) {
                requestOptions.headers = Object.assign({}, {
                    'X-343-Authorization-Spartan': this.getSpartanToken(),
                    '343-Telemetry-Session-Id': this.getTelemetrySessionId(),
                }, requestOptions.headers)
            }

            if (true === _.isObject(options.query)) {

                let cleanQuery = {};
                let { query } = options; 

                Object.keys(query).forEach(key => {
                    cleanQuery[key.toLowerCase()] = query[key];
                });

                cleanQuery = queryString.stringify(cleanQuery);
                
                requestOptions.uri = requestOptions.uri.indexOf('?') === -1 ? (
                    `${requestOptions.uri}?${cleanQuery}`
                ) : `${requestOptions.uri}&${cleanQuery}`

            }

            if ('application/json' === requestOptions.headers['Accept']) {
                requestOptions.json = true;
            }

            if (true === _.isObject(body) && [
                HTTPMethods.PUT,
                HTTPMethods.POST,
                HTTPMethods.PATCH
            ].indexOf(method) !== -1) {
                requestOptions.json = body;
                requestOptions.headers['Content-Type'] = `${HTTPContentTypes.JSON}; charset=utf-8`
            }

            request(requestOptions, (responseError, responseInfo, responseBody) => {

                if (responseError) {
                    return reject(responseError);
                }

                const { statusCode } = responseInfo;

                switch (statusCode)
                {
                    case HTTPStatus.SUCCESS:
                    case HTTPStatus.ACCEPTED:
                        return resolve({
                            data: responseBody
                        });

                    case HTTPStatus.NOT_FOUND:
                        return reject(
                            new HaloDotAPIError(
                                getErrorByNamespaceKey('NOT_FOUND')
                            )
                        );

                    case HTTPStatus.UNAUTHORIZED:
                        return reject(
                            new HaloDotAPIError(
                                getErrorByNamespaceKey('UNAUTHORIZED')
                            )
                        );

                    case HTTPStatus.AUTH_REQUIRED:
                        return reject(
                            new HaloDotAPIError(
                                getErrorByNamespaceKey('AUTH_REQUIRED')
                            )
                        );

                    case HTTPStatus.METHOD_NOT_ALLOWED:
                        return reject(
                            new HaloDotAPIError(
                                getErrorByNamespaceKey('METHOD_NOT_ALLOWED')
                            )
                        );

                    case HTTPStatus.SERVICE_UNAVAILABLE:
                        return reject(
                            new HaloDotAPIError(
                                getErrorByNamespaceKey('SERVICE_UNAVAILABLE')
                            )
                        );

                    case HTTPStatus.TOO_MANY_REQUESTS:
                        return reject(
                            new HaloDotAPIError(
                                getErrorByNamespaceKey('TOO_MANY_REQUESTS')
                            )
                        );

                    case HTTPStatus.BAD_REQUEST:
                        return reject(
                            new HaloDotAPIError(
                                getErrorByNamespaceKey('BAD_REQUEST'),
                                { debug: responseInfo, responseBody }
                            )
                        );

                    case HTTPStatus.REQUEST_TIMEOUT:
                        return reject(
                            new HaloDotAPIError(
                                getErrorByNamespaceKey('REQUEST_TIMEOUT')
                            )
                        );

                    default:
                        return reject(
                            new HaloDotAPIError(
                                getErrorByNamespaceKey('INTERNAL_ERROR')
                            )
                        );
                }

            });

        });

    }
}