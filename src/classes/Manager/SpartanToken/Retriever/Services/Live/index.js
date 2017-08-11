import url from 'url'
import request from 'request'
import queryString from 'query-string'

import _ from '@modules/helpers/lodash'
import cookieHelper from '@modules/helpers/cookie'
import HaloDotAPIError, { getErrorByNamespaceKey } from '@classes/Errors'

import HTTPStatus from '@modules/http/status'
import HTTPMethods from '@modules/http/methods'

const SCOPES = ['XboxLive.signin', 'XboxLive.offline_access']
const CALLBACK_PATH = '/authentication/signin/callback'
const AUTHORIZATION_PATH = '/oauth20_authorize.srf'
const RESPONSE_TYPE = 'code'

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
        this.callbackUri = callbackUri;
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
     * Get callback uri
     * @return {string} callbackUri
     */
    getCallbackUri = () => this.callbackUri

    /**
     * Auth user
     * @param {string} email
     * @param {string} password
     * @throws HaloDotAPIError
     * @return Promise
     */
    authUser = async (email, password) => {

        const postParameters = await this.retriveMandatoryPostParameters();
        const linearCodeUrl = await this.login(email, password, postParameters);
        const authorizationCode = await this.retrieveAuthorizationCode(linearCodeUrl);

        return new Promise(resolve => {
            resolve(authorizationCode);
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
                scope: SCOPES.join('+'),
                response_type: RESPONSE_TYPE,
                redirect_uri: this.getRedirectUri(),
                locale: 'en-us',
                display: 'touch',
                state: new Buffer(
                    JSON.stringify({
                        Sandbox: 'RETAIL',
                        ClientId: this.getClientId(),
                        CallbackUri: this.getCallbackUri()
                    })
                ).toString('base64')
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

                // Already authorized
                if (CALLBACK_PATH === url.parse(_.get(response, 'headers.location') || '').pathname) {
                    return resolve(
                        response.headers.location
                    );
                }

                const action = _.get(body.match(/action=\"(.*?)\"/), '[1]');
                const ipt = _.get(body.match(/value=\"(.*?)\"/), '[1]');

                // Wrong credentials
                if (undefined === action || undefined === ipt) {
                    return reject(
                        new HaloDotAPIError(
                            getErrorByNamespaceKey('UNAUTHORIZED')
                        )
                    );
                }

                return this.resolveAdditionalParameters({
                    action, ipt,
                    cookie: cookieHelper.toInline(
                        response.headers['set-cookie']
                    )
                })
                .then(this.authorizeApplication.bind(this, email, password))
                .then(linearCodeUrl => resolve(linearCodeUrl))
                .catch(err => reject(err));

            });

        });

    }

    /**
     * Resolve additional parameters
     * @param {Object}
     * @throws HaloDotAPIError
     * @return Promise
     */
    resolveAdditionalParameters = ({ action, ipt, cookie }) => {

        return new Promise((resolve, reject) => {

            const postData = { ipt };

            request({
                uri: action,
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

                if (err || response.statusCode !== HTTPStatus.SUCCESS) {
                    return reject(err || new HaloDotAPIError(
                        getErrorByNamespaceKey('INTERNAL_ERROR')
                    ));
                }

                const canary = _.get(body.match(/name="canary" value=\"(.*?)\"/), '[1]');
                const ucaccept = _.get(body.match(/name="ucaccept" value=\"(.*?)\"/), '[1]');

                if (undefined === canary || undefined === ucaccept) {
                    return reject(
                        new HaloDotAPIError(
                            getErrorByNamespaceKey('UNAUTHORIZED')
                        )
                    );
                }

                return resolve({
                    action, ipt, canary, ucaccept,
                    cookie: cookieHelper.toInline(
                        response.headers['set-cookie']
                    )
                });

            });

        });

    }

    /**
     * Authorize application
     * @param {Object}
     * @throws HaloDotAPIError
     * @return Promise
     */
    authorizeApplication = (email, password, { action, ipt, canary, ucaccept, cookie }) => {

        return new Promise((resolve, reject) => {

            const postData = { ipt, canary, ucaccept };

            request({
                uri: action,
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

                if (err || response.statusCode !== HTTPStatus.MOVED_TEMPORARILY) {
                    return reject(err || new HaloDotAPIError(
                        getErrorByNamespaceKey('INTERNAL_ERROR')
                    ));
                }

                if (AUTHORIZATION_PATH !== url.parse(_.get(response, 'headers.location') || '').pathname) {
                    return reject(
                        new HaloDotAPIError(
                            getErrorByNamespaceKey('UNAUTHORIZED')
                        )
                    );
                }

                return this.authUser(email, password)
                .then(linearCodeUrl => resolve(linearCodeUrl))
                .catch(err => reject(err));

            });

        });

    }

    /**
     * Retrieve authorization code
     * @param {string} linearCodeUrl
     * @throws HaloDotAPIError
     * @return Promise
     */
    retrieveAuthorizationCode = linearCodeUrl => {

        return new Promise((resolve, reject) => {

            request({
                uri: linearCodeUrl,
                method: HTTPMethods.GET,
                headers: HEADERS,
                agentOptions: {
                    rejectUnauthorized: false
                },
                gzip: true,
                followRedirect: false
            }, (err, response, body) => {

                if (err || response.statusCode !== HTTPStatus.MOVED_TEMPORARILY) {
                    return reject(err || new HaloDotAPIError(
                        getErrorByNamespaceKey('INTERNAL_ERROR')
                    ));
                }

                const authorizationCode = response.headers.location.split('#code=')[1];

                if (undefined === authorizationCode) {
                    return reject(
                        new HaloDotAPIError(
                            getErrorByNamespaceKey('UNAUTHORIZED')
                        )
                    );
                }

                return resolve(authorizationCode);

            });

        });

    }
}