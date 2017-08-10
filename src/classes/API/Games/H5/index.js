import path from 'path'

import UGC from './Authorities/UGC'
import HaloPlayer from './Authorities/HaloPlayer'
import SpartanStats from './Authorities/SpartanStats'
import Packs from './Authorities/Packs'
import Search from './Authorities/Search'
import Settings from './Authorities/Settings'
import BanProcessor from './Authorities/BanProcessor'
import HACS from './Authorities/HACS'

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
        this.packs = new Packs(spartanToken);
        this.search = new Search(spartanToken);
        this.settings = new Settings(spartanToken);
        this.banprocessor = new BanProcessor(spartanToken);
        this.hacs = new HACS(spartanToken);
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

    /**
     * Get packs authority
     * @return {Object} spartanStats
     */
    getPacks = () => this.packs

    /**
     * Get search authority
     * @return {Object} search
     */
    getSearch = () => this.search

    /**
     * Get settings authority
     * @return {Object} settings
     */
    getSettings = () => this.settings

    /**
     * Get banprocessor authority
     * @return {Object} settings
     */
    getBanProcessor = () => this.banprocessor

    /**
     * Get HACS authority
     * @return {Object} hacs
     */
    getHACS = () => this.hacs
}