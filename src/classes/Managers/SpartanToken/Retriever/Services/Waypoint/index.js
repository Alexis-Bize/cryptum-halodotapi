import request from 'request'
import queryString from 'query-string'

import HaloDotAPIError, { getErrorByNamespaceKey } from '@classes/Errors'

import HTTPStatus from '@modules/http/status'
import HTTPMethods from '@modules/http/methods'
import HTTPContentTypes from '@modules/http/content-types'

const SPARTAN_TOKEN_VERSION = 3

const HEADERS = {
    'Accept-Language': 'en-US',
    'Accept-Encoding': 'gzip, deflate',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 (5701136320)'
}

export default class WaypointService
{
    /**
     * WaypointService constructor
     */
    constructor() {

    }

    /**
     * Get client id
     * @return {string} clientId
     */
    getClientId = () => this.clientId

    /**
     * Get callback uri
     * @return {string} callbackUri
     */
    getCallbackUri = () => this.callbackUri

    /**
     * Auth spartan
     * @param {string} WLIDToken
     * @throws HaloDotAPIError
     * @return Promise
     */
    authSpartan = async WLIDToken => {

        const spartanToken = await this.retrieveSpartanToken(WLIDToken);

        return new Promise(resolve => {
            resolve(spartanToken);
        });

    }

    /**
     * Retrieve spartan token
     * @param {string} WLIDToken
     * @throws HaloDotAPIError
     * @return Promise
     */
    retrieveSpartanToken = WLIDToken => {

        return new Promise((resolve, reject) => {

            request({
                uri: `https://settings.svc.halowaypoint.com/spartan-token?v=${SPARTAN_TOKEN_VERSION}`,
                method: HTTPMethods.GET,
                headers: Object.assign({}, HEADERS, {
                    'X-343-Authorization-WLID': `t=${WLIDToken}`,
                    'User-Agent': 'cpprestsdk/2.4.0'
                }),
                agentOptions: {
                    rejectUnauthorized: false
                },
                gzip: true,
                json: true,
                followRedirect: false,
            }, (err, response, body) => {

                if (err || response.statusCode !== HTTPStatus.SUCCESS) {
                    return reject(err || new HaloDotAPIError(
                        getErrorByNamespaceKey('INTERNAL_ERROR')
                    ));
                }

                return resolve(body);

            });

        });

    }
}