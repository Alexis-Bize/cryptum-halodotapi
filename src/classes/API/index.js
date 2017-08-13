import path from 'path'

import HaloDotAPIError, { getErrorByNamespaceKey } from '@classes/Errors'
import SpartanTokenManager from '@classes/Managers/SpartanToken'
import Canvas from './Canvas'

import _ from '@modules/helpers/lodash'
import games from '@modules/api/games'
import platforms from '@modules/api/platforms'

import HTTPMethods from '@modules/http/methods'

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
     * Get HTTP methods
     * @return {Object} HTTPMethods
     */
    getHTTPMethods = () => HTTPMethods

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
    initializeGame = (game, spartanToken) => {

        game = (game || '').toUpperCase();
        const games = this.getGames();

        if (game.length === 0) {
            throw new HaloDotAPIError(
                getErrorByNamespaceKey(
                    'MISSING_PARAMETER',
                    [ 'game' ]
                )
            )
        }

        if (false === Object.keys(games).some(g => games[g] === game)) {
            throw new HaloDotAPIError(
                getErrorByNamespaceKey(
                    'UNKNOWN_GAME',
                    [ game ]
                )
            )
        }
        
        if (undefined === spartanToken) {
            throw new HaloDotAPIError(
                getErrorByNamespaceKey(
                    'MISSING_PARAMETER',
                    [ 'spartanToken' ]
                )
            )
        }
        
        const GameClass = require(
            path.join(__dirname, 'Games', game)
        ).default;

        this.getSpartanTokenManager().setSpartanToken(
            spartanToken
        );

        return new GameClass();

    }

    /**
     * Initialize CanvasClass
     * @throws HaloDotAPIError
     * @return {Object} Class
     */
    initializeCanvas = game => {

        game = (game || '').toUpperCase();
        const games = this.getGames();

        if (game.length === 0) {
            throw new HaloDotAPIError(
                getErrorByNamespaceKey(
                    'MISSING_PARAMETER',
                    [ 'game' ]
                )
            )
        }

        if (true === Object.keys(games).some(g => games[g] === game)) {
            throw new HaloDotAPIError(
                getErrorByNamespaceKey(
                    'DUPLICATE_ENTRY',
                    [ game ]
                )
            )
        }

        return new Canvas(game);

    }
}

export default (new API())