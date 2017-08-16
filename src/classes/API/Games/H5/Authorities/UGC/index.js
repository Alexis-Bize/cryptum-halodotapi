import _ from '@modules/helpers/lodash'
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
            id, options: _.merge({
                query: {
                    view: 'film-manifest'
                }
            }, options)
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
        this.getEndpointByKey('H5.UGC.BOOKMARKS_TARGET'), {
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
        this.getEndpointByKey('H5.UGC.BOOKMARKS_TARGET'), {
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
        this.getEndpointByKey('H5.UGC.BOOKMARKS_TARGET'), {
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
        this.getEndpointByKey('H5.UGC.BOOKMARKS_TARGET'), {
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
     * Post player game variant
     * @param {string} player 
     * @param {Objecy} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    postPlayerGameVariant = (player, body, options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.UGC.GAME_VARIANTS'), {
            player, body, options
        }
    )

    /**
     * Post player game variant
     * @param {string} player 
     * @param {Objecy} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    postPlayerMapVariant = (player, body, options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.UGC.MAP_VARIANTS'), {
            player, body, options
        }
    )

    /**
     * Post player game variant
     * @param {string} player 
     * @param {Objecy} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    postPlayerForgeGroup = (player, body, options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.UGC.FORGE_GROUPS'), {
            player, body, options
        }
    )

    /**
     * Delete player map variant
     * @param {string} player 
     * @param {string} id
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    deletePlayerMapVariantItem = (player, id, options = {}) => this.call(
        HTTPMethods.DELETE,
        this.getEndpointByKey('H5.UGC.MAP_VARIANT'), {
            player, id, options
        }
    )

    /**
     * Delete player game variant
     * @param {string} player 
     * @param {string} id
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    deletePlayerGameVariantItem = (player, id, options = {}) => this.call(
        HTTPMethods.DELETE,
        this.getEndpointByKey('H5.UGC.GAME_VARIANT'), {
            player, id, options
        }
    )

    /**
     * Delete player forge group
     * @param {string} player 
     * @param {string} id
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    deletePlayerForgeGroupItem = (player, id, options = {}) => this.call(
        HTTPMethods.DELETE,
        this.getEndpointByKey('H5.UGC.FORGE_GROUP'), {
            player, id, options
        }
    )

    /**
     * Delete player bookmark
     * @param {string} player 
     * @param {string} id
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    deletePlayerBookmarkItem = (player, id, options = {}) => this.call(
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
                    Owner: ownerName || null,
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
                    Owner: ownerName || null,
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
                    Owner: ownerName || null,
                    OwnerType: ownerName ? 'UgcPlayer' : 'Cms'
                }
            }, options
        }
    )

    /**
     * Bookmark game variant item
     * @param {string} player
     * @param {string} id
     * @param {string} ownerName
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    bookmarkGameVariantItem = (player, id, ownerName, options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.UGC.BOOKMARKS'), {
            player, body: {
                Name: 'Cryptum - GameVariant',
                Description: 'cryptum-halodotapi',
                AccessControl: 0,
                Target: {
                    ResourceId: id,
                    ResourceType: 'GameVariant',
                    Owner: ownerName,
                    OwnerType: 'UgcPlayer'
                }
            }, options
        }
    )

    /**
     * Bookmark map variant item
     * @param {string} player
     * @param {string} id
     * @param {string} ownerName
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    bookmarkMapVariantItem = (player, id, ownerName, options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.UGC.BOOKMARKS'), {
            player, body: {
                Name: 'Cryptum - MapVariant',
                Description: 'cryptum-halodotapi',
                AccessControl: 0,
                Target: {
                    ResourceId: id,
                    ResourceType: 'MapVariant',
                    Owner: ownerName,
                    OwnerType: 'UgcPlayer'
                }
            }, options
        }
    )

    /**
     * Bookmark forge group item
     * @param {string} player
     * @param {string} id
     * @param {string} ownerName
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    bookmarkForgeGroupItem = (player, id, ownerName, options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.UGC.BOOKMARKS'), {
            player, body: {
                Name: 'Cryptum - ForgeGroup',
                Description: 'cryptum-halodotapi',
                AccessControl: 0,
                Target: {
                    ResourceId: id,
                    ResourceType: 'ForgeGroup',
                    Owner: ownerName,
                    OwnerType: 'UgcPlayer'
                }
            }, options
        }
    )

    /**
     * Bookmark film item
     * @param {string} player
     * @param {string} id
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    bookmarkFilmItem = (player, id, options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.UGC.BOOKMARKS'), {
            player, body: {
                Name: 'Cryptum - Film',
                Description: 'cryptum-halodotapi',
                AccessControl: 0,
                Target: {
                    ResourceType: 'Film',
                    ResourceId: id,
                    Owner: null,
                    OwnerType: 2
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