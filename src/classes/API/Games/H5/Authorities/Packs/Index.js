import { v4 as createUUID } from 'uuid'

import Request from '@classes/Request'
import HTTPMethods from '@modules/http/methods'

export default class Packs extends Request
{
    /**
     * Packs constructor
     */
    constructor() {
        super();
    }

    /**
     * Get packs
     * @param {string} player
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPacks = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.PACKS.PACKS'), {
            player, options
        }
    )

    /**
     * Get pack item
     * @param {string} player
     * @param {string} packId
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPackItem = (player, packId, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.PACKS.PACK'), {
            player, packId, options
        }
    )

    /**
     * Get cards
     * @param {string} player
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getCards = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.PACKS.CARDS'), {
            player, options
        }
    )

    /**
     * Get card item
     * @param {string} player
     * @param {string} cardId
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getCardItem = (player, cardId, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.PACKS.CARD'), {
            player, cardId, options
        }
    )

    /**
     * Get store
     * @param {string} player
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getStore = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.PACKS.STORE'), {
            player, options
        }
    )

    /**
     * Open pack instance
     * @param {string} player
     * @param {string} packId
     * @param {string} instanceId
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    openPackInstance = (player, packId, instanceId, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.PACKS.PACK_INSTANCE'), {
            player, packId, instanceId, body: {
                State: 'Opened',
                Reason: 'Opening pack',
                RequestorDetail: 'Halo 5 Client',
                TrackingId: createUUID().toUpperCase()
            }, options
        }
    )

    /**
     * Patch pack instance
     * @param {string} player
     * @param {string} packId
     * @param {string} instanceId
     * @param {Object} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    patchPackInstance = (player, packId, instanceId, body, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.PACKS.PACK_INSTANCE'), {
            player, packId, instanceId, body: Object.assign({}, {
                State: null,
                Reason: null,
                RequestorDetail: 'Halo 5 Client',
                TrackingId: createUUID().toUpperCase()
            }, body), options
        }
    )

    /**
     * Patch card instance
     * @param {string} player
     * @param {string} cardId
     * @param {string} instanceId
     * @param {Object} body
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    patchCardInstance = (player, cardId, instanceId, body, options = {}) => this.call(
        HTTPMethods.PATCH,
        this.getEndpointByKey('H5.PACKS.CARD_INSTANCE'), {
            player, cardId, instanceId, body: Object.assign({}, {
                State: null,
                Reason: null,
                RequestorDetail: 'Halo 5 Client',
                TrackingId: createUUID().toUpperCase()
            }, body), options
        }
    )
}