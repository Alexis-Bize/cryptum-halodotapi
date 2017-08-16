import url from 'url'
import request from 'request'
import queryString from 'query-string'

import _ from '@modules/helpers/lodash'
import cookieHelper from '@modules/helpers/cookie'
import HaloDotAPIError, { getErrorByNamespaceKey } from '@classes/Errors'

import HTTPStatus from '@modules/http/status'
import HTTPMethods from '@modules/http/methods'

const SCOPE = 'live.xbox.com'
const CALLBACK_PATH = '/oauth20_desktop.srf'
const RESPONSE_TYPE = 'token'

const HEADERS = {
    'Accept-Language': 'en-US',
    'Accept-Encoding': 'gzip, deflate',
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Mobile/14G60 (5701136320)'
}

export default class LiveService
{
    /**
     * LiveService constructor
     * @param {string} clientId 
     * @param {string} redirectUri 
     * @param {string} callbackUri 
     */
    constructor(clientId, redirectUri, callbackUri) {
        this.clientId = clientId;
        this.redirectUri = redirectUri;
    }

    /**
     * Get client id
     * @return {string} clientId
     */
    getClientId = () => this.clientId

    /**
     * Get redirect uri
     * @return {string} redirectUri
     */
    getRedirectUri = () => this.redirectUri

    /**
     * Auth user
     * @param {string} email
     * @param {string} password
     * @throws HaloDotAPIError
     * @return Promise
     */
    authUser = async (email, password) => {

        const postParameters = await this.retriveMandatoryPostParameters();
        const WLIDToken = await this.login(email, password, postParameters);

        return new Promise(resolve => {
            resolve(WLIDToken);
        });
        
    }

    /**
     * Retrive mandatory post parameters
     * @throws HaloDotAPIError
     * @return Promise
     */
    retriveMandatoryPostParameters = () => {

        return new Promise((resolve, reject) => {

            const uri = 'https://login.live.com/oauth20_authorize.srf' + '?' + queryString.stringify({
                client_id: this.getClientId(),
                scope: [ 'service', [ 'cryptum-halodotapi', SCOPE ].join('.'), 'MBI_SSL' ].join('::'),
                response_type: RESPONSE_TYPE,
                redirect_uri: this.getRedirectUri(),
                display: 'ios_phone'
            }).replace(/\%2B/g, '+');

            request({
                uri,
                method: HTTPMethods.GET,
                headers: HEADERS,
                agentOptions: {
                    rejectUnauthorized: false
                },
                followRedirect: false,
                gzip: true
            }, (err, response, body) => {

                if (err || response.statusCode !== HTTPStatus.SUCCESS) {
                    return reject(err || new HaloDotAPIError(
                        getErrorByNamespaceKey('INTERNAL_ERROR')
                    ));
                }

                const postUrl = _.get(body.match(/urlPost:'(.*?)'/), '[1]');
                const PPFT = _.get(body.match(/value=\"(.*?)\"/), '[1]');

                if (undefined === postUrl || undefined === PPFT) {
                    return reject(
                        new HaloDotAPIError(
                            getErrorByNamespaceKey('INTERNAL_ERROR')
                        )
                    );
                }

                return resolve({
                    postUrl, PPFT,
                    cookie: cookieHelper.toInline(
                        response.headers['set-cookie']
                    )
                });

            });

        });

    }

    /**
     * Login
     * @param {Object}
     * @throws HaloDotAPIError
     * @return Promise
     */
    login = (email, password, { postUrl, PPFT, cookie }) => {

        return new Promise((resolve, reject) => {

            const postData = {
                i13: 1,
                login: email,
                loginfmt: email,
                type: 11,
                LoginOptions: 1,
                passwd: password,
                KMSI: 'on',
                PPFT,
                PPSX: 'Pa',
                NewUser: 1,
                i19: Math.round(Math.random() * 1000 * 100 * 10)
            };

            request({
                uri: postUrl,
                method: HTTPMethods.POST,
                headers: Object.assign({}, HEADERS, {
                    'Cookie': cookie,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Length': Buffer.byteLength(
                        queryString.stringify(postData)
                    )
                }),
                agentOptions: {
                    rejectUnauthorized: false
                },
                gzip: true,
                form: postData,
                followRedirect: false
            }, (err, response, body) => {

                if (err) {
                    return reject(err);
                }

                if (CALLBACK_PATH === url.parse(_.get(response, 'headers.location') || '').pathname) {

                    const WLIDToken = (
                        response.headers.location.split('#access_token=')[1] || ''
                    ).split('&')[0];

                    if (undefined === WLIDToken) {
                        return reject(
                            new HaloDotAPIError(
                                getErrorByNamespaceKey('UNAUTHORIZED')
                            )
                        );
                    }

                    return resolve(WLIDToken);

                }

                return reject(
                    new HaloDotAPIError(
                        getErrorByNamespaceKey('UNAUTHORIZED')
                    )
                );

            });

        });

    }
}