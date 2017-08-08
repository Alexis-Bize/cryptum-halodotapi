import authorities from '@modules/api/authorities'

export default {
    UGC: {
        FILM: `${authorities.UGC}/h5/film/{id}`,
        MAP_VARIANTS: `${authorities.UGC}/h5/players/{player}/mapvariants`,
        MAP_VARIANT: `${authorities.UGC}/h5/players/{player}/mapvariants/{id}`,
        GAME_VARIANTS: `${authorities.UGC}/h5/players/{player}/gamevariants`,
        GAME_VARIANT: `${authorities.UGC}/h5/players/{player}/gamevariants/{id}`,
        FORGE_GROUPS: `${authorities.UGC}/h5/players/{player}/forgegroups`,
        FORGE_GROUP: `${authorities.UGC}/h5/players/{player}/forgegroups/{id}`,
        BOOKMARKS: `${authorities.UGC}/h5/players/{player}/bookmarks?target-type={targetType}`,
        BOOKMARK: `${authorities.UGC}/h5/players/{player}/bookmarks/{id}`,
        COPY_ITEM: `${authorities.UGC}/h5/players/{player}/{collection}/actions/copy`
    },
    SPARTAN_STATS: {
        MATCHES: `${authorities.SPARTAN_STATS}/h5[platform]/players/{player}/matches`,
        MATCH_EVENTS: `${authorities.SPARTAN_STATS}/h5[platform]/matches/{id}/events`,
        MATCH: `${authorities.SPARTAN_STATS}/h5[platform]/{mode}/matches/{id}`,
        CREDITS: `${authorities.SPARTAN_STATS}/h5/players/{player}/credits`,
        PRESENCE: `${authorities.SPARTAN_STATS}/h5/presence?players={players}`,
        SERVICE_RECORDS: `${authorities.SPARTAN_STATS}/h5/servicerecords/{mode}?players={players}`,
        COMMENDATIONS: `${authorities.SPARTAN_STATS}/h5/players/{player}/commendations`,
        SPARTAN_COMPANY: `${authorities.SPARTAN_STATS}/oban/companies/{id}`,
        SPARTAN_COMPANY_COMMENDATIONS: `${authorities.SPARTAN_STATS}/h5/companies/{id}/commendations`
    }
}