import _ from '@modules/helpers/lodash'
import Request from '@classes/Request'
import HTTPMethods from '@modules/http/methods'

export default class HACS extends Request
{   
    /**
     * HACS constructor
     * @param {Object} spartanToken
     */
    constructor() {
        super();
    }

    /**
     * Get by type
     * @param {type} string
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getByType = (type, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HACS.CUSTOM_TYPE'), {
            type, options: _.merge({
                query: {
                    StartAt: 0,
                    Count: 10,
                    OrderBy: 'fixed'
                }
            }, options)
        }
    )

    /**
     * Get REQs
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getREQs = (options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HACS.REQ'), {
            options: _.merge({
                query: {
                    StartAt: 0,
                    Count: 10,
                    OrderBy: 'fixed'
                }
            }, options)
        }
    )

    /**
     * Get Emblem
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getEmblems = (options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HACS.EMBLEM'), {
            options: _.merge({
                query: {
                    StartAt: 0,
                    Count: 10,
                    OrderBy: 'fixed'
                }
            }, options)
        }
    )

    /**
     * Get Hoppers
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getHoppers = (options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HACS.HOPPER'), {
            options: _.merge({
                query: {
                    StartAt: 0,
                    Count: 10,
                    OrderBy: 'fixed'
                }
            }, options)
        }
    )

    /**
     * Get weapons skins
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getWeaponsSkins = (options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HACS.WEAPON_SKIN'), {
            options: _.merge({
                query: {
                    StartAt: 0,
                    Count: 10,
                    OrderBy: 'fixed'
                }
            }, options)
        }
    )

    /**
     * Get game variants definitions
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getGameVariantsDefinitions = (options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HACS.GAME_VARIANT_DEFINITION'), {
            options: _.merge({
                query: {
                    StartAt: 0,
                    Count: 10,
                    OrderBy: 'fixed'
                }
            }, options)
        }
    )

    /**
     * Get game base definitions
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getGameBaseVariants = (options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HACS.GAME_BASE_VARIANT'), {
            options: _.merge({
                query: {
                    StartAt: 0,
                    Count: 10,
                    OrderBy: 'fixed'
                }
            }, options)
        }
    )

    /**
     * Get message of the day
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getMessageOfTheDay = (options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HACS.MESSAGE_OF_THE_DAY'), {
            options: _.merge({
                query: {
                    StartAt: 0,
                    Count: 10,
                    OrderBy: 'fixed'
                }
            }, options)
        }
    )
}