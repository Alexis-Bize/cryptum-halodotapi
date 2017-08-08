import authorities from '@modules/api/authorities'

export default {
    SPARTAN_STATS: {
        CREDITS: `${authorities.SPARTAN_STATS}/h5/players/{player}/credits`,
        MATCHES: `${authorities.SPARTAN_STATS}/h5[platform]/players/{player}/matches`,
        MATCH: `${authorities.SPARTAN_STATS}/h5[platform]/{mode}/matches/{id}`
    }
}