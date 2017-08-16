# Cryptum: HaloDotAPI
[![N|Solid](https://i.imgur.com/vfYkceM.png)](https://www.twitter.com/_SuckMyLuck)

### What is this?
**HaloDotAPI** is an advanced **Halo 5 API wrapper** which is **NOT** based on the [official one](https://). But what does it mean? No rate limit, new endpoints, POST / PATCH / POST / PUT methods support, and last but not least, **It can be extended to other Halo games**.

Note: This API requires your **SpartanToken** Authorization (v2 and v3 are supported). See "[How-to retrieve my SpartanToken?](#how-to-retrieve-my-spartantoken)" section for further information.

### What about new endpoints?
Looking for variants or Forge groups? There is a **search endpoint** for that. Wondering which weapon skin or service tag is used by an another player? There is an **appearance endpoint** for that. Want to update your controller settings, know how many REQ points you got or change your matchmaking preferences? There are also **endpoints** for that! See [Documentation](#documentation).

### Basic usages
```javascript
import HaloDotAPI from 'cryptum-halodotapi'

const H5 = HaloDotAPI.initializeGame(
	HaloDotAPI.getGames().H5, // h5
	'...' // SpartanToken
);

const H5HaloPlayer = H5.getHaloPlayer(); // Authority

H5HaloPlayer.getPlayerAppearance('ske7ch')
.then(response => console.log(response))
.catch(error => console.log(error));
```
Output:
```javascript
{
    "Model": {
        "Gender": 0
    },
    "Emblem": {
        "ColorPrimary": 32,
        "ColorSecondary": 0,
        "ColorTertiary": 36,
        "EmblemId": 220,
        "HarmonyGroupIndex": 25,
        "HarmonyIndex": 0
    },
    "ModelCustomization": {
        "ColorPrimary": 0,
        "ColorSecondary": 24,
        "WeaponSkinIds": {
            "34195": 4398,
            "34197": 4035,
            "34198": 4499,
            "44596": 4207,
            "44600": 4110
        },
        "HelmetId": 2002002,
        "VisorId": 3020,
        "ArmorSuitId": 1101,
        "DeathFX": 0, // Not used
        "Assassination": 6006,
        "StanceRotation": 0,
        "StanceZoom": 1, // Not used
        "VoiceOver": 118003
    },
    "StanceId": 7007,
    "Gamertag": "ske7ch",
    "DateFidelity": 1,
    "Links": [],
    "LastModifiedUtc": {
        "ISO8601Date": "2017-06-22T16:20:59.297Z"
    },
    "FirstModifiedUtc": {
        "ISO8601Date": "2015-10-27T13:44:04.296Z"
    },
    "StatusCode": 0,
    "ServiceTag": "SKE7",
    "Company": {
        "Id": "e77b33e8-8133-4c00-850e-8db63b030aac",
        "Name": "Filthy Animals"
    }
}
```

### How-to retrieve my SpartanToken?
Quicker way:

Go to the [Halo4Stats](https://halo4stats.halowaypoint.com/oauth/spartanToken) website, authorize the application and copy / paste the page response to the HaloDotAPI constructor. Pros? It's fast. Yeah, that's all. Cons? The website will provide you a **v2** token which is grant limited, you can not handle its expiration, and there is now way to guarantee that this website will remain open.

Recommended way:
```javascript
import HaloDotAPI from 'cryptum-halodotapi'

let H5 = null;

// Requires Xbox LIVE credentials
HaloDotAPI.getSpartanTokenManager().generate(
	'email@xboxlive.com',
	'password'
).then(spartanToken => {

	H5 = HaloDotAPI.initializeGame(
		HaloDotAPI.getGames().H5,
		spartanToken
	);
	
	// ...

}).catch(error => console.log(error));

// ...
```
Note: Once retrieved / generated, your **SpartanToken** will expires after ~3 hours. No worries, the **SpartanTokenManager** will renew it and replay your request automatically.

### Documentation
**API methods:**

* `getGames()`:
	— Return supported games.

* `getPlatforms()`:
	— Return supported platforms. May be used for stats.

* `getSpartanTokenManager()`:
	— Return an instance of SpartanTokenManager.

* `initializeGame(string:game)`:
	— Initialize a GameClass. 

**Authorities methods (H5):**

* `getUGC()`:
	— Provides Metadata about User-Generated Content.

* `getSpartanStats()`:
	— Provides Metadata about User-Generated Content.

* `getHaloPlayer()`:
	— Provides Profile information about Players.

* `getContentHacs()`:
	— Provides Metadata information.

* `getPacks()`:
	— Provides data about REQ Packs and Cards.

* `getSearch()`:
	— Provides Search endpoints.

* `getBanProcessor()`:
	— Provides ban informations about Players.

Each method returned by a selected authority supports an additional `options` argument which can be used to pass `query`,`headers`, and `platform` parameters .

```javascript
const options = {
	query: {
		count: 10,
		// ...
	},
	headers: {
		Accept: 'text/xml',
		// ...
	}
}
```

### H5.getUGC() methods:

**getFilmItem():**

* Parameters:
	* {string} filmId
	* {Object} [options]
* Sample code:
```javascript
H5.getUGC().getFilmItem('FILM_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getFilmItemManifest():**

* Parameters:
	* {string} filmId
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().getFilmItemManifest('FILM_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerMapVariants():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().getPlayerMapVariants('Le ZeNy')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerGameVariants():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().getPlayerGameVariants('X3CXeX v3')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerForgeGroups():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().getPlayerForgeGroups('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerMapVariantItem():**

* Parameters:
	* {string} player
	* {string} mapVariantItemId
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().getPlayerMapVariantItem('Le ZeNy', 'a5081546-b6be-4f3c-98a7-0ebb765fd7e2')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerGameVariantItem():**

* Parameters:
	* {string} player
	* {string} gameVariantItemId
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().getPlayerGameVariantItem('X3CXeX v3', 'b768f833-878b-4e15-96e3-8e84675b553c')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerForgeGroupItem():**

* Parameters:
	* {string} player
	* {string} forgeGroupItemId
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().getPlayerForgeGroupItem('PLAYER', 'FORGE_GROUP_ITEM_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerBookmarkedItem():**

* Parameters:
	* {string} player
	* {string} bookmarkItemId
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().getPlayerBookmarkedItem('PLAYER', 'BOOKMARK_ITEM_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerBookmarkedMapVariants():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().getPlayerBookmarkedMapVariants('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerBookmarkedGameVariants():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().getPlayerBookmarkedGameVariants('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerBookmarkedForgeGroups():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().getPlayerBookmarkedForgeGroups('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerBookmarkedFilms():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().getPlayerBookmarkedFilms('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**patchPlayerMapVariantItem():**

* Parameters:
	* {string} player
	* {string} mapVariantItemId
	* {Object} patchData
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().patchPlayerMapVariantItem('PLAYER', 'MAP_VARIANT_ITEM_ID', {
	Name: 'Battle Of Noctus',
	Description: 'HaloDotAPI',
	Tags: [ 'cryptum', 'zeny' ]
})
.then(result => console.log(result))
.catch(error => console.log(error));
```

**patchPlayerGameVariantItem():**

* Parameters:
	* {string} player
	* {string} gameVariantItemId
	* {Object} patchData
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().patchPlayerGameVariantItem('PLAYER', 'GAME_VARIANT_ITEM_ID', {
	Name: 'No Weapon Start',
	Description: 'HaloDotAPI',
	Tags: [ 'cryptum', 'x3cxex v3', 'mods' ]
})
.then(result => console.log(result))
.catch(error => console.log(error));
```

**patchPlayerForgeGroupItem():**

* Parameters:
	* {string} player
	* {string} forgeGroupItemId
	* {Object} patchData
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().patchPlayerForgeGroupItem('PLAYER', 'FORGE_GROUP_ITEM_ID', {
	Name: 'HCS Decals',
	Description: 'From the hidden 343i Forge menus.',
	Tags: [ 'mods' ]
})
.then(result => console.log(result))
.catch(error => console.log(error));
```

**patchPlayerBookmarkItem():**

* Parameters:
	* {string} player
	* {string} bookmarkItemId
	* {Object} patchData
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().patchPlayerForgeGroupItem('PLAYER', 'BOOKMARK_ITEM_ID', {
	Name: 'Slice Disabled',
	Description: 'HaloDotAPI',
	Tags: [ 'cryptum', 'x3cxex v3', 'mods' ]
})
.then(result => console.log(result))
.catch(error => console.log(error));
```

**deletePlayerMapVariantItem():**

* Parameters:
	* {string} player
	* {string} mapVariantItemId
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().deletePlayerMapVariantItem('PLAYER', 'MAP_VARIANT_ITEM_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**deletePlayerGameVariantItem():**

* Parameters:
	* {string} player
	* {string} gameVariantItemId
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().deletePlayerGameVariantItem('PLAYER', 'GAME_VARIANT_ITEM_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**deletePlayerForgeGroupItem():**

* Parameters:
	* {string} player
	* {string} forgeGroupItemId
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().deletePlayerForgeGroupItem('PLAYER', 'FORGE_GROUP_ITEM_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**deletePlayerBookmarkItem():**

* Parameters:
	* {string} player
	* {string} bookmarkItemId
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().deletePlayerBookmarkItem('PLAYER', 'BOOKMARK_ITEM_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**copyGameVariantItem():**

* Parameters:
	* {string} player
	* {string} gameVariantItemId
	* {string} ownerName 
	* {Object} [options]
* Sample call (UgcPlayer):
```javascript
H5.getUGC().copyGameVariantItem('PLAYER', 'GAME_VARIANT_ITEM_ID', 'OWNER_NAME')
.then(result => console.log(result))
.catch(error => console.log(error));
```
* Sample call ([Cms](https://content-hacs.svc.halowaypoint.com/content/guid-0e98003f35ef472db0111367172b6cf0)):
```javascript
H5.getUGC().copyGameVariantItem('PLAYER', 'GAME_VARIANT_ITEM_ID', null)
.then(result => console.log(result))
.catch(error => console.log(error));
```

**copyMapVariantItem():**

* Parameters:
	* {string} player
	* {string} mapVariantItemId
	* {string} ownerName 
	* {Object} [options]
* Sample call (UgcPlayer):
```javascript
H5.getUGC().copyMapVariantItem('PLAYER', 'MAP_VARIANT_ITEM_ID', 'OWNER_NAME')
.then(result => console.log(result))
.catch(error => console.log(error));
```
* Sample call ([Cms](https://content-hacs.svc.halowaypoint.com/content/guid-46c3b1f1e6fb4893bac232a235bfbeae)):
```javascript
H5.getUGC().copyMapVariantItem('PLAYER', 'MAP_VARIANT_ITEM_ID', null)
.then(result => console.log(result))
.catch(error => console.log(error));
```

**copyForgeGroupItem():**

* Parameters:
	* {string} player
	* {string} forgeGroupItemId
	* {string} ownerName 
	* {Object} [options]
* Sample call:
```javascript
H5.getUGC().copyForgeGroupItem('PLAYER', 'FORGE_GROUP_ITEM_ID', 'OWNER_NAME')
.then(result => console.log(result))
.catch(error => console.log(error));
```

### H5.getSpartanStats() methods:

**getPlayerCredits():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getSpartanStats().getPlayerCredits('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerCommendations():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getSpartanStats().getPlayerCommendations('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerServiceRecords():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getSpartanStats().getPlayerServiceRecords('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerMatches():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getSpartanStats().getPlayerMatches('PLAYER', {
	platform: 'PC' // HaloDotAPI.getPlatforms().PC
})
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getCampaignMatchResult():**

* Parameters:
	* {string} player
	* {string} matchId
	* {Object} [options]
* Sample call:
```javascript
H5.getSpartanStats().getCampaignMatchResult('PLAYER', 'MATCH_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getArenaMatchResult():**

* Parameters:
	* {string} player
	* {string} matchId
	* {Object} [options]
* Sample call:
```javascript
H5.getSpartanStats().getArenaMatchResult('PLAYER', 'MATCH_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getWarzoneMatchResult():**

* Parameters:
	* {string} player
	* {string} matchId
	* {Object} [options]
* Sample call:
```javascript
H5.getSpartanStats().getWarzoneMatchResult('PLAYER', 'MATCH_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getCustomMatchResult():**

* Parameters:
	* {string} player
	* {string} matchId
	* {Object} [options]
* Sample call:
```javascript
H5.getSpartanStats().getCustomMatchResult('PLAYER', 'MATCH_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getCampaignMatchEvents():**

* Parameters:
	* {string} player
	* {string} matchId
	* {Object} [options]
* Sample call:
```javascript
H5.getSpartanStats().getCampaignMatchEvents('PLAYER', 'MATCH_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getArenaMatchEvents():**

* Parameters:
	* {string} player
	* {string} matchId
	* {Object} [options]
* Sample call:
```javascript
H5.getSpartanStats().getArenaMatchEvents('PLAYER', 'MATCH_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getWarzoneMatchEvents():**

* Parameters:
	* {string} player
	* {string} matchId
	* {Object} [options]
* Sample call:
```javascript
H5.getSpartanStats().getWarzoneMatchEvents('PLAYER', 'MATCH_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getCustomMatchEvents():**

* Parameters:
	* {string} player
	* {string} matchId
	* {Object} [options]
* Sample call:
```javascript
H5.getSpartanStats().getCustomMatchEvents('PLAYER', 'MATCH_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getSpartanCompany():**

* Parameters:
	* {string} spartanCompanyId
	* {Object} [options]
* Sample call:
```javascript
H5.getSpartanStats().getSpartanCompany('SPARTAN_COMPANY_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getSpartanCompanyCommendations():**

* Parameters:
	* {string} spartanCompanyId
	* {Object} [options]
* Sample call:
```javascript
H5.getSpartanStats().getSpartanCompanyCommendations('SPARTAN_COMPANY_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

### H5.getHaloPlayer() methods:

**getPlayerSpartan():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getHaloPlayer().getPlayerSpartan('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerEmblem():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getHaloPlayer().getPlayerEmblem('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayersProfile():**

* Parameters:
	* {Array} players
	* {Object} [options]
* Sample call:
```javascript
H5.getHaloPlayer().getPlayersProfile(['PLAYER_1', 'PLAYER_2'])
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerAppearance():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getHaloPlayer().getPlayerAppearance('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerInventory():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getHaloPlayer().getPlayerInventory('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerPreferences():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getHaloPlayer().getPlayerPreferences('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerControls():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getHaloPlayer().getPlayerControls('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerCampaign():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getHaloPlayer().getPlayerCampaign('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**patchPlayerAppearance():**

* Parameters:
	* {string} player
	* {Object} patchData
	* {Object} [options]
* Sample call:
```javascript
H5.getHaloPlayer().patchPlayerAppearance('PLAYER', {
	Emblem: {
		PrimaryColor: 60,
		HarmonyGroupIndex: 0
	},
	ModelCustomization: {
		ColorSecondary: 12,
		WeaponSkinIds: {
			'44600': 0
		},
		StanceRotation: 180,
		DeathFX: 0
	},
	ServiceTag: 'ZENY'
})
.then(result => console.log(result))
.catch(error => console.log(error));
```

**patchPlayerPreferences():**

* Parameters:
	* {string} player
	* {Object} patchData
	* {Object} [options]
* Sample call:
```javascript
H5.getHaloPlayer().patchPlayerPreferences('PLAYER', {
	Forge: {
		CinematicPlayerCount: 32
	},
	Matchmaking: {
		MatchmakingPreferences: 2
	},
	Hud: {
		TeamColorMode: 1
	}
})
.then(result => console.log(result))
.catch(error => console.log(error));
```

**patchPlayerControls():**

* Parameters:
	* {string} player
	* {Object} patchData
	* {Object} [options]
* Sample call:
```javascript
H5.getHaloPlayer().patchPlayerControls('PLAYER', {
	MaintainSprint: false,
	AimStickAxialDeadZone: 10,
	SmoothScrolling: true,
	AimAssist: true // What?
})
.then(result => console.log(result))
.catch(error => console.log(error));
```

**patchPlayerCampaign():**

* Parameters:
	* {string} player
	* {Object} patchData
	* {Object} [options]
* Sample call:
```javascript
H5.getHaloPlayer().patchPlayerCampaign('PLAYER', {
	AvailableMissionIds: [
		{
			Id: 1,
			Available: true
		}
	],
	AvailableSkullIds: [
		{
			Id: 8,
			Available: false
		}
	],
	LocatedAudioLogIds: [
		{
			Id: 19,
			Available: true
		}
	],
	CompletedTutorialIds: [],
	MissionDifficulties: []
})
.then(result => console.log(result))
.catch(error => console.log(error));
```

### H5.getPacks() methods:

**getPlayerPacks():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getPacks().getPlayerPacks('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerPackItem():**

* Parameters:
	* {string} player
	* {string} packItemId
	* {Object} [options]
* Sample call:
```javascript
H5.getPacks().getPlayerPackItem('PLAYER', 'PACK_ITEM_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerCards():**

* Parameters:
	* {string} player
	* {string} packItemId
	* {Object} [options]
* Sample call:
```javascript
H5.getPacks().getPlayerCards('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerCardItem():**

* Parameters:
	* {string} player
	* {string} cardItemId
	* {Object} [options]
* Sample call:
```javascript
H5.getPacks().getPlayerCardItem('PLAYER', 'CARD_ITEM_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerStore():**

* Parameters:
	* {string} player
	* {Object} [options]
* Sample call:
```javascript
H5.getPacks().getPlayerCardItem('PLAYER')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**openPlayerPackInstance():**

* Parameters:
	* {string} player
	* {string} packItemId
	* {string} packInstanceId
	* {Object} [options]
* Sample call:
```javascript
H5.getPacks().getPlayerCardItem('PLAYER', 'PACK_ITEM_ID', 'PACK_INSTANCE_ID')
.then(result => console.log(result))
.catch(error => console.log(error));
```

### H5.getSearch() methods:


**searchGameVariants():**

* Parameters:
	* {string} queryString
	* {Object} [options]
* Sample call:
```javascript
H5.getSearch().searchGameVariants('*', {
	query: {
		owner: 'X3CXeX v3',
		count: 10
	}
})
.then(result => console.log(result))
.catch(error => console.log(error));
```

**searchMapVariants():**

* Parameters:
	* {string} queryString
	* {Object} [options]
* Sample call:
```javascript
H5.getSearch().searchMapVariants('*', {
	query: {
		owner: 'Le ZeNy',
		count: 10
	}
})
.then(result => console.log(result))
.catch(error => console.log(error));
```

**searchForgeGroups():**

* Parameters:
	* {string} queryString
	* {Object} [options]
* Sample call:
```javascript
H5.getSearch().searchForgeGroups('UNSC')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**searchPlayerFiles():**

* Parameters:
	* {string} queryString
	* {Object} [options]
* Sample call:
```javascript
H5.getSearch().searchPlayerFiles('Warzone', {
	query: {
		count: 20
	}
})
.then(result => console.log(result))
.catch(error => console.log(error));
```

### H5.getBanProcessor() methods:

**getPlayersBanSummary():**

* Parameters:
	* {Array} players
	* {Object} [options]
* Sample call:
```javascript
H5.getSearch().getPlayersBanSummary(['PLAYER_1', 'PLAYER_2'])
.then(result => console.log(result))
.catch(error => console.log(error));
```

### H5.getContentHacs() methods:

**getMessageOfTheDay():**

* Parameters:
	* {Object} [options]
* Sample call:
```javascript
H5.getContentHacs().getMessageOfTheDay()
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getGameBaseVariants():**

* Parameters:
	* {Object} [options]
* Sample call:
```javascript
H5.getContentHacs().getGameBaseVariants()
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getGameVariantsDefinitions():**

* Parameters:
	* {Object} [options]
* Sample call:
```javascript
H5.getContentHacs().getGameVariantsDefinitions()
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getWeaponsSkins():**

* Parameters:
	* {Object} [options]
* Sample call:
```javascript
H5.getContentHacs().getWeaponsSkins()
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getHoppers():**

* Parameters:
	* {Object} [options]
* Sample call:
```javascript
H5.getContentHacs().getHoppers()
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getEmblems():**

* Parameters:
	* {Object} [options]
* Sample call:
```javascript
H5.getContentHacs().getEmblems()
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getREQs():**

* Parameters:
	* {Object} [options]
* Sample call:
```javascript
H5.getContentHacs().getREQs()
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getByType():**

* Parameters:
	* {string} type
	* {Object} [options]
* Sample call:
```javascript
H5.getContentHacs().getByType('TYPE') // Deathfx, MetaCommendation...
.then(result => console.log(result))
.catch(error => console.log(error));
```

### API Errors

**Methods:**

* `error.getReason()`:
	— Return error reason.
	
* `error.getCode()`:
	— Return error code.
	
* `error.getStatus()`:
	— Return error HTTP status.

* `error.getMessage()`:
	— Return error message.

* `error.getStack()`:
	— Return error stack trace.

**HTTP Codes:**

* 400: Bad Request
* 401: Unauthorized
* 403: Authentication Required
* 405: Method Not Allowed
* 500: Internal Error

Note: An authentication error may imply grant limitation (Trying to update another player, access to its inventory or a SpartanToken version / scope limitation).

### Special thanks
* Bungie, for making Halo
* 343 Industries, for free weapons skins and security flaws ;)
* [My dogs and I](https://www.instagram.com/p/BW1_4RXgm2C)

### Want to contribute?
Feel free to open a pull request or an issue on [GitHub](https://github.com/Alexis-Bize/cryptum-halodotapi)!

### Any questions?
Tweet me at [@_SuckMyLuck](https://www.twitter.com/_SuckMyLuck) or message me on [Reddit](https://www.reddit.com/user/Zeny-/)!

### Licence
MIT