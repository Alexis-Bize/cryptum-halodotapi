import path from 'path'

import _ from '@modules/helpers/lodash'
import games from '@modules/api/games'
import platforms from '@modules/api/platforms'

import HaloDotAPIError, {
    getErrorByNamespaceKey
} from '@classes/Errors'

export default class API
{
    /**
     * API constructor
     * @param {string|Object} spartanToken 
     */
    constructor(spartanToken) {
        this.spartanToken = this.formatSpartanToken(spartanToken);
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
     * Format spartan token
     * @param {string|Object} spartanToken 
     * @return {Object} spartanToken
     */
    formatSpartanToken = spartanToken => {

        let formated = {
            concat: '',
            preamble: '',
            subject: '',
            token: '',
            expires: ''
        };

        if (true === _.isObject(spartanToken)) {

            formated = Object.assign({}, formated, {
                concat: String(spartanToken.SpartanToken || ''),
                preamble: String(spartanToken.V3Preamble || ''),
                token: String(spartanToken.V3Token || ''),
                subject: _.get(spartanToken, 'Players[0].Subject'),
                expires: _.get(spartanToken, 'ExpiresUtc.ISO8601Date') || ''
            });

        } else if (typeof spartanToken === 'string') {

            const date = new Date();
            date.setHours(date.getHours() + 3);
            const ISOString = date.toISOString();

            formated = Object.assign({}, formated, {
                concat: spartanToken,
                preamble: (spartanToken.match(/v[2-3]=/g) || '')[0] || '',
                token: (
                    (spartanToken.split(';')[1] || '') ||
                    (spartanToken.split('=')[1] || '')
                ),
                subject: (spartanToken.split('=')[1] || '').split(';')[0] || '',
                expires: [
                    ISOString.split('.')[0],
                    ISOString.split('.')[1].match(/[a-zA-Z]/)[0] || ''
                ].join('')
            });

        }
        
        return formated;

    }

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