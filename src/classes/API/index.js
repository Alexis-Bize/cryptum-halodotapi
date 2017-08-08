import path from 'path'

import games from '@modules/api/games'
import platforms from '@modules/api/platforms'

import HaloDotAPIError, {
    getErrorByNamespaceKey
} from '@classes/Errors'

export default class API
{
    /**
     * API constructor
     * @param {string} spartanToken 
     */
    constructor(spartanToken) {
        this.spartanToken = String(spartanToken || '');
    }

    /**
     * Get spartan token
     * @return {string} spartanToken
     */
    getSpartanToken = () => this.spartanToken

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
     * Initialize GameClass
     * @param {string} game
     * @throws HaloDotAPIError
     * @return {Object} Class
     */
    initializeGame = (game = '') => {

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

        return new GameClass(
            this.getSpartanToken()
        );

    }
}