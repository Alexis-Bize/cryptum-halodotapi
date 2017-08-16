import Request from '@classes/Request'
import HTTPMethods from '@modules/http/methods'

export default class SpartanStats extends Request
{
    /**
     * Stats constructor
     */
    constructor() {
        super();
    }

    /**
     * Get player credits (REQ points)
     * @param {string} player
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerCredits = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.CREDITS'), {
            player, options
        }
    )

    /**
     * Get player commendations
     * @param {string} player
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerCommendations = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.COMMENDATIONS'), {
            player, options
        }
    )

    getPlayerServiceRecords = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.SERVICE_RECORDS'), {
            player, options
        }
    )
    
    /**
     * Get player matches
     * @param {string} player
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayerMatches = (player, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.MATCHES'), {
            player, options
        }
    )

    /**
     * Get campaign match result
     * @param {string} matchId
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getCampaignMatchResult = (matchId, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.MATCH'), {
            matchId, options, mode: 'campaign'
        }
    )

    /**
     * Get arena match result
     * @param {string} matchId
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getArenaMatchResult = (matchId, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.MATCHES'), {
            matchId, options, mode: 'arena'
        }
    )

    /**
     * Get warzone match result
     * @param {string} matchId
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getWarzoneMatchResult = (matchId, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.MATCHES'), {
            matchId, options, mode: 'warzone'
        }
    )

    /**
     * Get custom match result
     * @param {string} matchId
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getCustomMatchResult = (matchId, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.MATCHES'), {
            matchId, options, mode: 'custom'
        }
    )

    /**
     * Get campaign match events
     * @param {string} matchId
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getCampaignMatchEvents = (matchId, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.MATCH_EVENTS'), {
            matchId, options, mode: 'campaign'
        }
    )

    /**
     * Get arena match events
     * @param {string} matchId
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getArenaMatchEvents = (matchId, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.MATCH_EVENTS'), {
            matchId, options, mode: 'arena'
        }
    )

    /**
     * Get warzone match events
     * @param {string} matchId
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getWarzoneMatchEvents = (matchId, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.MATCH_EVENTS'), {
            matchId, options, mode: 'warzone'
        }
    )

    /**
     * Get custom match events
     * @param {string} matchId
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getCustomMatchEvents = (matchId, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.MATCH_EVENTS'), {
            matchId, options, mode: 'custom'
        }
    )

    /**
     * Get spartan company commendations
     * @param {string} companyId
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    getSpartanCompany = (companyId, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.SPARTAN_COMPANY'), {
            companyId, options
        }
    )

    /**
     * Get spartan company commendations
     * @param {string} companyId
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    getSpartanCompanyCommendations = (companyId, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.SPARTAN_COMPANY_COMMENDATIONS'), {
            companyId, options
        }
    )

    /**
     * Get players presence
     * @param {Array} players
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    getPlayersPresence = (players, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.PRESENCE'), {
            players, options: Object.assign({}, {
                useTelemetrySpartanToken: true
            }, options)
        }
    )
}