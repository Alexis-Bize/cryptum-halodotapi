import authorities from '@modules/api/authorities'

export default {
    UGC: {
        FILM: `${authorities.UGC}/h5/film/{id}`,
        FILES: `${authorities.UGC}/h5/playerfiles`,
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
        SPARTAN_COMPANY_COMMENDATIONS: `${authorities.SPARTAN_STATS}/h5/companies/{id}/commendations`,
    },
    HALO_PLAYER: {
        SPARTAN: `${authorities.HALO_PLAYER}/h5/profiles/{player}/spartan`,
        EMBLEM: `${authorities.HALO_PLAYER}/h5/profiles/{player}/emblem`,
        APPEARANCE: `${authorities.HALO_PLAYER}/h5/profiles/{player}/appearance`,
        CAMPAIGN: `${authorities.HALO_PLAYER}/h5/profiles/{player}/campaign`,
        INVENTORY: `${authorities.HALO_PLAYER}/h5/profiles/{player}/inventory`,
        PREFERENCES: `${authorities.HALO_PLAYER}/h5/profiles/{player}/preferences`,
        CONTROLS: `${authorities.HALO_PLAYER}/h5/profiles/{player}/controls`,
        BATCH_PROFILES: `${authorities.HALO_PLAYER}/h5/profiles?players={players}`,
    },
    PACKS: {
        PACKS: `${authorities.PACKS}/h5/players/{player}/packs`,
        PACK: `${authorities.PACKS}/h5/players/{player}/packs/{packId}`,
        PACK_INSTANCE: `${authorities.PACKS}/h5/players/{player}/packs/{packId}/{instanceId}`,
        STORE: `${authorities.PACKS}/h5/players/{player}/store`,
        CARDS: `${authorities.PACKS}/h5/players/{player}/cards`,
        CARD: `${authorities.PACKS}/h5/players/{player}/cards/{cardId}`,
        CARD_INSTANCE: `${authorities.PACKS}/h5/players/{player}/cards/{cardId}/{instanceId}`,
    },
    SEARCH: {
        FORGE_GROUPS: `${authorities.SEARCH}/h5/search/forgegroups?query={search}`,
        MAP_VARIANTS: `${authorities.SEARCH}/h5/search/mapvariants?query={search}`,
        GAME_VARIANTS: `${authorities.SEARCH}/h5/search/gamevariants?query={search}`,
        PLAYER_FILES: `${authorities.SEARCH}/h5/search/playerfiles?query={search}`
    },
    HACS: {
        REQ: `${authorities.HACS}/contents/REQ`,
        EMBLEM: `${authorities.HACS}/contents/Emblem`,
        HOPPER: `${authorities.HACS}/contents/Hopper`,
        WEAPON_SKIN: `${authorities.HACS}/contents/WeaponSkin`,
        GAME_VARIANT_DEFINITION: `${authorities.HACS}/contents/GameVariantDefinition`,
        GAME_BASE_VARIANT: `${authorities.HACS}/contents/GameBaseVariant`,
        MESSAGE_OF_THE_DAY: `${authorities.HACS}/contents/Halo5MessageoftheDay`,
        CUSTOM_TYPE: `${authorities.HACS}/contents/{type}`,
    },
    SETTINGS: {
        
    },
    BANPROCESSOR: {
        SUMMARY: `${authorities.BANPROCESSOR}/h5/bansummary?targets={players}`
    }
}