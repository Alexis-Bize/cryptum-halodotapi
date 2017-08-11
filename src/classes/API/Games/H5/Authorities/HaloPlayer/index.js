import _ from '@modules/helpers/lodash'
import Request from '@classes/Request'
import HTTPMethods from '@modules/http/methods'
import HTTPContentTypes from '@modules/http/content-types'

export default class HaloPlayer extends Request
{
    /**
     * HaloPlayer constructor
     */
    constructor() {
        super();
    }

    /**
     * Get player spartan
     * @param {string} player
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerSpartan = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HALO_PLAYER.SPARTAN'), {
            player, options: _.merge(options, {
                headers: {
                    'Accept': HTTPContentTypes.PNG
                }
            })
        }
    )

    /**
     * Get player emblem
     * @param {string} player
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerEmblem = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HALO_PLAYER.EMBLEM'), {
            player, options: _.merge(options, {
                headers: {
                    'Accept': HTTPContentTypes.PNG
                }
            })
        }
    )

    /**
     * Get players profile
     * @param {Array} players
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayersProfile = (players, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HALO_PLAYER.BATCH_PROFILES'), {
            players
        }
    )

    /**
     * Get player appearance
     * @param {string} player
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerAppearance = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HALO_PLAYER.APPEARANCE'), {
            player
        }
    )

    /**
     * Get player inventory
     * @param {string} player
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerInventory = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HALO_PLAYER.INVENTORY'), {
            player
        }
    )

    /**
     * Get player preferences
     * @param {string} player
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerPreferences = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HALO_PLAYER.PREFERENCES'), {
            player
        }
    )

    /**
     * Get player controls:
     * @param {string} player
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerControls = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HALO_PLAYER.CONTROLS'), {
            player
        }
    )

    /**
     * Get player campaign
     * @param {string} player
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerCampaign = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.HALO_PLAYER.CAMPAIGN'), {
            player
        }
    )

    /**
     * Update player apperance
     * @param {string} player
     * @param {Object} appearance
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    updatePlayerAppearance = (player, appearance, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.HALO_PLAYER.APPEARANCE'), {
            player, body: appearance
        }
    )

    /**
     * Update player preferences
     * @param {string} player
     * @param {Object} preferences
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    updatePlayerPreferences = (player, preferences, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.HALO_PLAYER.PREFERENCES'), {
            player, body: preferences
        }
    )

    /**
     * Update player controls
     * @param {string} player
     * @param {Object} controls
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    updatePlayerControls = (player, controls, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.HALO_PLAYER.CONTROLS'), {
            player, body: controls
        }
    )

    /**
     * Update player campaign
     * @param {string} player
     * @param {Object} campaign
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    updatePlayerCampaign = (player, campaign, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.HALO_PLAYER.CAMPAIGN'), {
            player, body: campaign
        }
    )
}