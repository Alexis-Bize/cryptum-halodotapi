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
     */
    constructor() {
        this.ugc = new UGC();
        this.haloPlayer = new HaloPlayer();
        this.spartanStats = new SpartanStats();
        this.packs = new Packs();
        this.search = new Search();
        this.settings = new Settings();
        this.banprocessor = new BanProcessor();
        this.hacs = new HACS();
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