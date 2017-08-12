import Request from '@classes/Request'
import HTTPMethods from '@modules/http/methods'

export default class UGC extends Request
{
    /**
     * UGC constructor
     */
    constructor() {
        super();
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
     * Get film
     * @param {string} id
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getFilmItem = (id, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.UGC.FILM'), {
            id, options
        }
    )

    /**
     * Get film manifest
     * @param {string} id
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getFilmItemManifest = (id, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.UGC.FILM'), {
            id, query: {
                view: 'film-manifest'
            }, options
        }
    )

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
    getPlayerMapVariantItem = (player, id, options = {}) => this.call(
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
    getPlayerGameVariantItem = (player, id, options = {}) => this.call(
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
    getPlayerForgeGroupItem = (player, id, options = {}) => this.call(
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
    getPlayerBookmarkedItem = (player, id, options = {}) => this.call(
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
     * Patch player map variant
     * @param {string} player 
     * @param {string} id
     * @param {Object} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    patchPlayerMapVariantItem = (player, id, body, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.UGC.MAP_VARIANT'), {
            player, id, body, options
        }
    )

    /**
     * Patch player game variant
     * @param {string} player 
     * @param {string} id
     * @param {Object} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    patchPlayerGameVariantItem = (player, id, body, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.UGC.GAME_VARIANT'), {
            player, id, body, options
        }
    )

    /**
     * Patch player forge group
     * @param {string} player 
     * @param {string} id
     * @param {Object} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    patchPlayerForgeGroupItem = (player, id, body, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.UGC.FORGE_GROUP'), {
            player, id, body, options
        }
    )

    /**
     * Patch player bookmark
     * @param {string} player 
     * @param {string} id
     * @param {Object} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    patchPlayerBookmarkItem = (player, id, body, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.UGC.BOOKMARK'), {
            player, id, body, options
        }
    )

    /**
     * Post game variant
     * @param {string} player 
     * @param {Objecy} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    postGameVariant = (player, body, options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.UGC.GAME_VARIANTS'), {
            player, body, options
        }
    )

    /**
     * Post game variant
     * @param {string} player 
     * @param {Objecy} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    postMapVariant = (player, body, options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.UGC.MAP_VARIANTS'), {
            player, body, options
        }
    )

    /**
     * Post game variant
     * @param {string} player 
     * @param {Objecy} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    postForgeGroup = (player, body, options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.UGC.FORGE_GROUPS'), {
            player, body, options
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
    deleteMapVariantItem = (player, id, options = {}) => this.call(
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
    deleteGameVariantItem = (player, id, options = {}) => this.call(
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
    deleteForgeGroupItem = (player, id, options = {}) => this.call(
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
    deleteBookmarkItem = (player, id, options = {}) => this.call(
        HTTPMethods.DELETE,
        this.getEndpointByKey('H5.UGC.BOOKMARK'), {
            player, id, options
        }
    )

    /**
     * Copy game variant
     * @param {string} player
     * @param {string} id
     * @param {string=} ownerName
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    copyGameVariantItem = (player, id, ownerName = '', options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.UGC.COPY_ITEM'), {
            player, collection: 'gamevariants', body: {
                SourceFile: {
                    ResourceId: id,
                    ResourceType: 'GameVariant',
                    Owner: ownerName,
                    OwnerType: ownerName ? 'UgcPlayer' : 'Cms'
                }
            }, options
        }
    )

    /**
     * Copy map variant
     * @param {string} player
     * @param {string} id
     * @param {string=} ownerName
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    copyMapVariantItem = (player, id, ownerName = '', options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.UGC.COPY_ITEM'), {
            player, collection: 'mapvariants', body: {
                SourceFile: {
                    ResourceId: id,
                    ResourceType: 'MapVariant',
                    Owner: ownerName,
                    OwnerType: ownerName ? 'UgcPlayer' : 'Cms'
                }
            }, options
        }
    )

    /**
     * Copy forge group
     * @param {string} player
     * @param {string} id
     * @param {string=} ownerName
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    copyForgeGroupItem = (player, id, ownerName = '', options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.UGC.COPY_ITEM'), {
            player, collection: 'forgegroups', body: {
                SourceFile: {
                    ResourceId: id,
                    ResourceType: 'ForgeGroup',
                    Owner: ownerName,
                    OwnerType: ownerName ? 'UgcPlayer' : 'Cms'
                }
            }, options
        }
    )

    /**
     * Post player files
     * @param {string} player
     * @param {Object} files
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    postBatchPlayerFiles = (player, body, options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.UGC.FILES'), {
            player, body, options
        }
    )
}