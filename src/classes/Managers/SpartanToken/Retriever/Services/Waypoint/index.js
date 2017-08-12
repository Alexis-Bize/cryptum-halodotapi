import request from 'request'
import queryString from 'query-string'

import HaloDotAPIError, { getErrorByNamespaceKey } from '@classes/Errors'

import HTTPStatus from '@modules/http/status'
import HTTPMethods from '@modules/http/methods'
import HTTPContentTypes from '@modules/http/content-types'

const RELYING_PARTIES = {
    XBOX_LIVE: 'http://xboxlive.com',
    PROD_XSTS: 'https://prod.xsts.halowaypoint.com/',
    TEST_XSTS: 'https://test.xsts.halowaypoint.com/',
    HALO_XSTS: 'https://halo-xsts-token.svc.halowaypoint.com/',
    DUMMY_XSTS: 'https://dummy-xsts-host.svc.halowaypoint.com/'
}

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
     * @param {string} clientId 
     * @param {string} callbackUri
     */
    constructor(clientId, callbackUri) {
        this.clientId = clientId;
        this.callbackUri = callbackUri;
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
     * @param {string} authorizationCode
     * @throws HaloDotAPIError
     * @return Promise
     */
    authSpartan = async authorizationCode => {

        const HaloXSTS = await this.retrieveHaloXSTS(authorizationCode);
        const spartanToken = await this.retrieveSpartanToken(HaloXSTS);

        return new Promise(resolve => {
            resolve(spartanToken);
        });

    }

    /**
     * Retrieve Halo xsts
     * @param {string} authorizationCode
     * @throws HaloDotAPIError
     * @return Promise
     */
    retrieveHaloXSTS = authorizationCode => {

        return new Promise((resolve, reject) => {

            const uri = [
                `https://linear-auth.svc.halowaypoint.com/authentication/refresh/${this.getClientId()}`,
                queryString.stringify({
                    callback: this.getCallbackUri(),
                    xstsTokenRelyingParties: [
                        RELYING_PARTIES.XBOX_LIVE,
                        RELYING_PARTIES.PROD_XSTS
                    ].join(',')
                })
            ].join('?');

            request({
                uri,
                method: HTTPMethods.GET,
                headers: Object.assign({}, HEADERS, {
                    'Authorization': `linear ${authorizationCode}`,
                    'Accept': HTTPContentTypes.JSON
                }),
                agentOptions: {
                    rejectUnauthorized: false
                },
                gzip: true,
                json: true,
                followRedirect: false
            }, (err, response, body) => {

                if (err || response.statusCode !== HTTPStatus.SUCCESS) {
                    return reject(err || new HaloDotAPIError(
                        getErrorByNamespaceKey('INTERNAL_ERROR')
                    ));
                }

                const xsts = JSON.parse(
                    new Buffer(
                        body.linearToken.split('.')[1],
                        'base64'
                    ).toString('ascii')
                )[RELYING_PARTIES.PROD_XSTS];

                return resolve(xsts);

            });

        });

    }

    /**
     * Retrieve spartan token
     * @param {string} HaloXSTS
     * @throws HaloDotAPIError
     * @return Promise
     */
    retrieveSpartanToken = HaloXSTS => {

        return new Promise((resolve, reject) => {

            request({
                uri: `https://settings.svc.halowaypoint.com/spartan-token?v=${SPARTAN_TOKEN_VERSION}`,
                method: HTTPMethods.GET,
                headers: Object.assign({}, HEADERS, {
                    'X-343-Authorization-XBL3': `XBL3.0 x=*;${HaloXSTS}`,
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