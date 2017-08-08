import Request from '@classes/Request'
import HTTPMethods from '@modules/http/methods'

export default class UGC extends Request
{
    /**
     * UGC constructor
     * @param {string} spartanToken
     */
    constructor(spartanToken) {
        super(spartanToken);
    }

    /**
     * Set new spartan token
     * @param {string} spartanToken
     * @return {Object} this
     */
    setSpartanToken = spartanToken => {
        this.spartanToken = spartanToken;
        return this;
    }

    /**
     * Get player map variants
     * @param {string} player 
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerMapVariants = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.UGC.MAP_VARIANTS'), {
            player, options
        }
    )

    /**
     * Get player map variant
     * @param {string} player 
     * @param {string} id
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerMapVariantById = (player, id, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.UGC.MAP_VARIANT'), {
            player, id, options
        }
    )

    /**
     * Get player game variants
     * @param {string} player 
     * @param {Object} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerGameVariants = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.UGC.GAME_VARIANTS'), {
            player, options
        }
    )

    /**
     * Get player game variant
     * @param {string} player 
     * @param {string} id
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerGameVariantById = (player, id, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.UGC.GAME_VARIANT'), {
            player, id
        }
    )

    /**
     * Get player forge groups
     * @param {string} player 
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerForgeGroups = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.UGC.FORGE_GROUPS'), {
            player, options
        }
    )

    /**
     * Get player forge group
     * @param {string} player 
     * @param {string} id
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerForgeGroupById = (player, id, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.UGC.FORGE_GROUP'), {
            player, id, options
        }
    )

    /**
     * Get player bookmark
     * @param {string} player 
     * @param {string} id
      * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerBookmarkById = (player, id, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.UGC.BOOKMARK'), {
            player, id, options
        }
    )

    /**
     * Get player bookmarked map variants
     * @param {string} player
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerBookmarkedMapVariants = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.UGC.BOOKMARKS'), {
            player, options, targetType: 'mapvariant'
        }
    )

    /**
     * Get player bookmarked game variants
     * @param {string} player
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerBookmarkedGameVariants = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.UGC.BOOKMARKS'), {
            player, options, targetType: 'gamevariant'
        }
    )

    /**
     * Get player bookmarked forge groups
     * @param {string} player 
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerBookmarkedForgeGroups = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.UGC.BOOKMARKS'), {
            player, options, targetType: 'forgegroup'
        }
    )

    /**
     * Get player bookmarked films
     * @param {string} player 
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerBookmarkedFilms = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.UGC.BOOKMARKS'), {
            player, options, targetType: 'film'
        }
    )

    /**
     * Update player map variant
     * @param {string} player 
     * @param {string} id
     * @param {Object} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    updatePlayerMapVariantById = (player, id, body, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.UGC.MAP_VARIANT'), {
            player, id, body, options
        }
    )

    /**
     * Update player game variant
     * @param {string} player 
     * @param {string} id
     * @param {Object} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    updatePlayerGameVariantById = (player, id, body, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.UGC.GAME_VARIANT'), {
            player, id, body, options
        }
    )

    /**
     * Update player forge group
     * @param {string} player 
     * @param {string} id
     * @param {Object} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    updatePlayerForgeGroupById = (player, id, body, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.UGC.FORGE_GROUP'), {
            player, id, body, options
        }
    )

    /**
     * Update player bookmark
     * @param {string} player 
     * @param {string} id
     * @param {Object} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    updatePlayerBookmarkById = (player, id, body, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.UGC.BOOKMARK'), {
            player, id, body, options
        }
    )

    /**
     * Update player film
     * @param {string} player 
     * @param {string} id
     * @param {Object} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    updatePlayerFilmById = (player, id, body = {}, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.UGC.FILM'), {
            player, id, body, options
        }
    )

    /**
     * Delete map variant
     * @param {string} player 
     * @param {string} id
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    deleteMapVariantById = (player, id, options = {}) => this.call(
        HTTPMethods.DELETE,
        this.getEndpointByKey('H5.UGC.MAP_VARIANT'), {
            player, id, options
        }
    )

    /**
     * Delete game variant
     * @param {string} player 
     * @param {string} id
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    deleteGameVariantById = (player, id, options = {}) => this.call(
        HTTPMethods.DELETE,
        this.getEndpointByKey('H5.UGC.GAME_VARIANT'), {
            player, id, options
        }
    )

    /**
     * Delete forge group
     * @param {string} player 
     * @param {string} id
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    deleteForgeGroupById = (player, id, options = {}) => this.call(
        HTTPMethods.DELETE,
        this.getEndpointByKey('H5.UGC.FORGE_GROUP'), {
            player, id, options
        }
    )

    /**
     * Delete bookmark
     * @param {string} player 
     * @param {string} id
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    deleteBookmarkById = (player, id, options = {}) => this.call(
        HTTPMethods.DELETE,
        this.getEndpointByKey('H5.UGC.BOOKMARK'), {
            player, id, options
        }
    )
}