import HaloDotAPIError, { getErrorByNamespaceKey } from '@classes/Errors'
import authorities from '@modules/api/authorities'

export default class Canvas
{
    /**
     * Canvas constructor
     * @param {string} game
     */
    constructor(game) {
        this.game = game.toUpperCase();
        this.classes = [];
    }

    /**
     * Get game
     * @return {string} game
     */
    getGame = () => this.game

    /**
     * Get classes
     * @return {Array} classes
     */
    getClasses = () => this.classes

    /**
     * Assign endpoints
     * @param {Object} endpoints
     * @throws HaloDotAPIError
     * @return void
     */
    assignEndpoints = endpoints => {

        const selectedAuthorities = Object.keys(endpoints);
        const classAuthorities = {};

        selectedAuthorities.forEach(authority => {
            
            if (undefined === authorities[authority]) {
                throw new HaloDotAPIError(
                    getErrorByNamespaceKey(
                        'UNKNOWN_AUTHORITY',
                        [ authority ]
                    )
                );
            }

            classAuthorities[
                this.formatAuthority(authority)
            ] = () => this.formatMethods(
                selectedAuthorities[authority]
            );

        });

        this.getClasses().push(classAuthorities);

    }

    /**
     * Format authority
     * @param {string} authority
     * @return {string}
     */
    formatAuthority = authority => {
        return 'get' + authority.split('_').map(key => {
            key = key.toLowerCase();
            return key.charAt(0).toUpperCase() + key.slice(1);
        }).join('');
    }
}