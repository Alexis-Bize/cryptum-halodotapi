import request from 'request'
import queryString from 'query-string'

import HaloDotAPIError, { getErrorByNamespaceKey, getErrorByHTTPStatusCode } from '@classes/Errors'
import SpartanTokenManager from '@classes/Managers/SpartanToken'

import _ from '@modules/helpers/lodash'
import endpoints from '@modules/api/endpoints'
import platforms from '@modules/api/platforms'

import HTTPStatus from '@modules/http/status'
import HTTPMethods from '@modules/http/methods'
import HTTPContentTypes from '@modules/http/content-types'

export default class Request
{
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
    hasSpartanTokenValidFormat = () => /^v[2-3]=([a-zA-Z0-9;\-:_]+)$/g.test(
        SpartanTokenManager.getSpartanToken().concat
    )

    /**
     * Check spartanToken expiration
     * @return {boolean}
     */
    isSpartanTokenExpired = () => {
        const expires = new Date(SpartanTokenManager.getSpartanToken().expires);
        return expires.getTime() - 100 * 15 * 10 <= Date.now();
    }
    
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

        const { options = {} } = parameters;
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
     * @return {Object}
     */
    call = (method, endpoint, parameters = {}) => {

        return new Promise((resolve, reject) => {
            
            if ((endpoint || '').length === 0) {
                return reject(
                    new HaloDotAPIError(
                        getErrorByNamespaceKey('INTERNAL_ERROR')
                    )
                );
            }

            if (false === this.hasSpartanTokenValidFormat()) {
                return reject(
                    new HaloDotAPIError(
                        getErrorByNamespaceKey('MALFORMATED_AUTHORIZATION')
                    )
                );
            }

            if (true === this.isSpartanTokenExpired()) {

                if (false === SpartanTokenManager.autoRenewOnExpiration()) {
                    return reject(
                        new HaloDotAPIError(
                            getErrorByNamespaceKey('AUTHORIZATION_EXPIRED')
                        )
                    );
                }

                return SpartanTokenManager.renew()
                .then(() => this.call.apply(this,
                    [ method, endpoint, parameters ]
                )).catch(err => reject(err));

            }

            parameters = this.formatParameters(parameters);

            const { body } = parameters;
            const { options = {} } = parameters;

            if (true !== options.unsetSpartanToken &&
                true !== options.useTelemetrySpartanToken && (
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
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept-Language': 'en-US',
                    'User-Agent': 'cpprestsdk/2.4.0'
                }, _.isObject(options.headers) ? (
                    this.formatHeaders(options.headers)
                ) : {})
            };

            if (true !== options.unsetSpartanToken) {
                requestOptions.headers = Object.assign({}, {
                    'X-343-Authorization-Spartan': (
                        true === options.useTelemetrySpartanToken ? [
                            `${SpartanTokenManager.getSpartanToken().preamble}`,
                            `${SpartanTokenManager.getSpartanToken().token}`
                        ].join('T;') : SpartanTokenManager.getSpartanToken().concat
                    )
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

            if (HTTPContentTypes.JSON === requestOptions.headers['Accept']) {
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
                        return resolve(responseBody);

                    default:
                        return reject(
                            new HaloDotAPIError(
                                getErrorByHTTPStatusCode(statusCode),
                                { debug: responseBody }
                            )
                        );
                }

            });

        });

    }
}