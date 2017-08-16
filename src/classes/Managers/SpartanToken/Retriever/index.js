import LiveService from './Services/Live'
import WaypointService from './Services/Waypoint'

const REDIRECT_URIS = {
    DESKTOP: 'https://login.live.com/oauth20_desktop.srf'
}

const CLIENT_IDS = {
    HALO_SPARTAN_STRIKE_IOS: '000000004415041A',
    HALO_APP: '00000000401A2535',
    HALO_CHANNEL: '000000004C151C36',
    HALO_WAYPOINT: '000000004C0BD2F1',
    HALO_5_FORGE: '000000004419DE2C'
}

export default class SpartanTokenRetriever
{
    /**
     * SpartanTokenRetriever constructor
     * @param {string} email 
     * @param {string} password
     */
    constructor(email, password) {
        this.email = (email || '').toLowerCase();
        this.password = password;
    }

    /**
     * Get email
     * @return {string} email
     */
    getEmail = () => this.email

    /**
     * Get password
     * @return {string} password
     */
    getPassword = () => this.password

    /**
     * Retrive spartan token
     * @param {number} version
     * @return Promise
     */
    retriveSpartanToken = async () => {

        const live = new LiveService(
            CLIENT_IDS.HALO_SPARTAN_STRIKE_IOS,
            REDIRECT_URIS.DESKTOP
        );

        const WLIDToken = await live.authUser(
            this.getEmail(),
            this.getPassword()
        );

        const waypoint = new WaypointService();
        const spartanToken = await waypoint.authSpartan(WLIDToken);

        return new Promise((resolve, reject) => {
            resolve(spartanToken);
        });
        
    }
}