import Request from '@classes/Request'
import HTTPMethods from '@modules/http/methods'

export default class HaloPlayer extends Request
{
    /**
     * HaloPlayer constructor
     * @param {string} spartanToken
     */
    constructor(spartanToken) {
        super(spartanToken);
    }
}