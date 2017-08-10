import _ from '@modules/helpers/lodash'
import Request from '@classes/Request'
import HTTPMethods from '@modules/http/methods'

export default class Settings extends Request
{
    /**
     * Settings constructor
     * @param {Object} spartanToken
     */
    constructor(spartanToken) {
        super(spartanToken);
    }

    /**
     * Generate spartan token
     * @param {string} XBL3AuthorizationToken
     * @param {integer} version 
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    generateSpartanToken = (XBL3AuthorizationToken, version = 3, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SETTINGS.SPARTAN_TOKEN'), {
            version, options: _.merge({
                unsetSpartanToken: true,
                headers: {
                    'X-343-Authorization-XBL3': `XBL3.0 x=*;${XBL3AuthorizationToken}`
                }
            }, options)
        }
    )
}