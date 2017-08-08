import path from 'path'

import UGC from './Authorities/UGC'
import HaloPlayer from './Authorities/HaloPlayer'
import SpartanStats from './Authorities/SpartanStats'

export default class Halo5
{
    /**
     * Halo5 constructor
     * @param {string} spartanToken 
     */
    constructor(spartanToken) {
        this.ugc = new UGC(spartanToken);
        this.haloPlayer = new HaloPlayer(spartanToken);
        this.spartanStats = new SpartanStats(spartanToken);
    }

    /**
     * Get UGC authority
     * @return {Object} UGC
     */
    getUGC = () => this.ugc
    
    /**
     * Get haloPlayer authority
     * @return {Object} haloPlayer
     */
    getHaloPlayer = () => this.haloPlayer

    /**
     * Get spartanStats authority
     * @return {Object} spartanStats
     */
    getSpartanStats = () => this.spartanStats
}