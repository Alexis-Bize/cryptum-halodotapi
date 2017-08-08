import Request from '@classes/Request'
import HTTPMethods from '@modules/http/methods'

export default class SpartanStats extends Request
{
    /**
     * Stats constructor
     * @param {string} spartanToken
     */
    constructor(spartanToken) {
        super(spartanToken);
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
        this.getEndpointByKey('H5.SPARTAN_STATS.PLAYER_COMMENDATIONS'), {
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
     * Get match data
     * @param {string} matchId
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getMatchById = (matchId, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.MATCH'), {
            matchId, options
        }
    )

    /**
     * Get match events
     * @param {string} matchId
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    getMatchEventsById = (matchId, options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SPARTAN_STATS.MATCH_EVENTS'), {
            matchId, options
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
            player, options
        }
    )

    /**
     * Post match result
     * @param {Object} body
     * @param {Object=} options 
     * @throws HaloDotAPIError
     * @return Promise
     */
    postMatchResult = (body, options = {}) => this.call(
        HTTPMethods.POST,
        this.getEndpointByKey('H5.SPARTAN_STATS.MATCHES'), {
            body, options
        }
    )
}