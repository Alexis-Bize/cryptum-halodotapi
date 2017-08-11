import path from 'path'

import HaloDotAPIError, { getErrorByNamespaceKey } from '@classes/Errors'
import SpartanTokenManager from '@classes/Manager/SpartanToken'

import _ from '@modules/helpers/lodash'
import games from '@modules/api/games'
import platforms from '@modules/api/platforms'


class API
{
    /**
     * Get SpartanTokenManager
     * @return {Object} SpartanTokenManager
     */
    getSpartanTokenManager = () => SpartanTokenManager

    /**
     * Get games
     * @return {Object} games
     */
    getGames = () => games

    /**
     * Get platforms
     * @return {Object} platforms
     */
    getPlatforms = () => platforms

    /**
     * Get handlers
     * @return {Object} Handlers
     */
    getHandlers = () => Handlers

    /**
     * Initialize GameClass
     * @param {string} game
     * @param {Object|string} spartanToken
     * @throws HaloDotAPIError
     * @return {Object} Class
     */
    initializeGame = (game = '', spartanToken) => {

        game = game.toUpperCase();
        const games = this.getGames();

        if (false === Object.keys(games).some(game => games[game] === game)) {
            throw new HaloDotAPIError(
                getErrorByNamespaceKey(
                    'UNKNOWN_GAME',
                    [ game ]
                )
            )
        }
        
        const GameClass = require(
            path.join(__dirname, 'Games', game)
        ).default;
        
        if (undefined === spartanToken) {
            throw new HaloDotAPIError(
                getErrorByNamespaceKey('SPARTAN_TOKEN_MISSING')
            )
        }

        this.getSpartanTokenManager().setSpartanToken(
            spartanToken
        );

        return new GameClass();

    }
}

export default (new API())