import Request from '@classes/Request'
import HTTPMethods from '@modules/http/methods'

export default class BanProcessor extends Request
{
    /**
     * BanProcessor constructor
     * @param {Object} spartanToken
     */
    constructor(spartanToken) {
        super(spartanToken);
    }

    /**
     * Get players ban summary
     * @param {Array} players
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayersBanSummary = (players, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.BANPROCESSOR.SUMMARY'), {
            players, options
        }
    )
}