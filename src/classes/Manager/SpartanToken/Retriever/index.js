import LiveService from './Services/Live'
import WaypointService from './Services/Waypoint'

const CLIENT_ID = '000000004C151C36'
const REDIRECT_URI = 'https://linear-auth.svc.halowaypoint.com/authentication/signin/callback'
const CALLBACK_URI = 'https://linear-auth.svc.halowaypoint.com/authentication/oauth_app'

export default class SpartanTokenRetriever
{
    /**
     * SpartanTokenRetriever constructor
     * @param {string} email 
     * @param {string} password
     */
    constructor(email, password) {
        this.email = email;
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
    retriveSpartanToken = async version => {

        const live = new LiveService(
            CLIENT_ID,
            REDIRECT_URI,
            CALLBACK_URI
        );
        
        const authorizationCode = await live.authUser(
            this.getEmail(),
            this.getPassword()
        );

        const waypoint = new WaypointService(
            CLIENT_ID,
            CALLBACK_URI,
            version
        );
        
        const spartanToken = await waypoint.authSpartan(
            authorizationCode
        );

        return new Promise((resolve, reject) => {
            resolve(spartanToken);
        });
        
    }
}