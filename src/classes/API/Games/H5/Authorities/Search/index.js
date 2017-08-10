import Request from '@classes/Request'
import HTTPMethods from '@modules/http/methods'

export default class Search extends Request
{
    /**
     * Search constructor
     * @param {string} spartanToken
     */
    constructor(spartanToken) {
        super(spartanToken);
    }

    /**
     * Search game variants
     * @param {string} query
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    searchGameVariants = (query = '*', options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SEARCH.GAME_VARIANTS'), {
            search: query, options
        }
    )

    /**
     * Search map variants
     * @param {string} query
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    searchMapVariants = (query = '*', options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SEARCH.MAP_VARIANTS'), {
            search: query, options
        }
    )

    /**
     * Search forge groups
     * @param {string} query
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    searchForgeGroups = (query = '*', options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SEARCH.FORGE_GROUPS'), {
            search: query, options
        }
    )

    /**
     * Search player files
     * @param {string} query
     * @param {Object=} options
     * @throws HaloDotAPIError
     * @return Promise
     */
    searchPlayerFiles = (query = '*', options = {}) => this.call(
        HTTPMethods.GET,
        this.getEndpointByKey('H5.SEARCH.PLAYER_FILS'), {
            search: query, options
        }
    )
}