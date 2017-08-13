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

### HTTP Errors
* 400: Bad Request
* 401: Unauthorized
* 403: Authentication Required
* 405: Method Not Allowed
* 500: Internal Error

Note: An authentication error may imply grant limitation (Trying to update another player, access to its inventory or a SpartanToken version / scope limitation).

### Documentation
**API methods:**

* `getGames()`:
	— Return supported games.

* `getPlatforms()`:
	— Return supported platforms.

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

### H5.getUGC() methods:

**getFilmItem():**

* Parameters:
	* {string} filmId
* Sample code:
```javascript
H5.getUGC().getFilmItem('7ce4ab32-a776-43a7-aff4-fa6d7e3e695f')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getFilmItemManifest():**

* Parameters:
	* {string} filmId
* Sample call:
```javascript
H5.getUGC().getFilmItemManifest('7ce4ab32-a776-43a7-aff4-fa6d7e3e695f')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerMapVariants():**

* Parameters:
	* {string} player
* Sample call:
```javascript
H5.getUGC().getPlayerMapVariants('Le ZeNy')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerGameVariants():**

* Parameters:
	* {string} player
* Sample call:
```javascript
H5.getUGC().getPlayerGameVariants('X3CXeX v3')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerForgeGroups():**

* Parameters:
	* {string} player
* Sample call:
```javascript
H5.getUGC().getPlayerForgeGroups('Gamecheat13YT')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerMapVariantItem():**

* Parameters:
	* {string} player
	* {string} itemId
* Sample call:
```javascript
H5.getUGC().getPlayerMapVariantItem('Le ZeNy', 'a5081546-b6be-4f3c-98a7-0ebb765fd7e2')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerGameVariantItem():**

* Parameters:
	* {string} player
	* {string} itemId
* Sample call:
```javascript
H5.getUGC().getPlayerGameVariantItem('X3CXeX v3', 'b768f833-878b-4e15-96e3-8e84675b553c')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerForgeGroupItem():**

* Parameters:
	* {string} player
	* {string} itemId
* Sample call:
```javascript
H5.getUGC().getPlayerForgeGroupItem('Gamecheat13YT', 'a37e5f52-9faa-456a-a580-32106c7d3824')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerBookmarkedItem():**

* Parameters:
	* {string} player
	* {string} itemId
* Sample call:
```javascript
H5.getUGC().getPlayerBookmarkedItem('X3CXeX v3', '9b16f28b-f26d-494d-9dac-3378c84bcd01')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerBookmarkedMapVariants():**

* Parameters:
	* {string} player
* Sample call:
```javascript
H5.getUGC().getPlayerBookmarkedMapVariants('Le ZeNy')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerBookmarkedGameVariants():**

* Parameters:
	* {string} player
* Sample call:
```javascript
H5.getUGC().getPlayerBookmarkedGameVariants('X3CXeX v3')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerBookmarkedForgeGroups():**

* Parameters:
	* {string} player
* Sample call:
```javascript
H5.getUGC().getPlayerBookmarkedForgeGroups('Le ZeNy')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerBookmarkedFilms():**

* Parameters:
	* {string} player
* Sample call:
```javascript
H5.getUGC().getPlayerBookmarkedFilms('Le ZeNy')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**patchPlayerMapVariantItem():**

* Parameters:
	* {string} player
	* {string} id
	* {Object} data
* Sample call:
```javascript
H5.getUGC().patchPlayerMapVariantItem('Le ZeNy', 'a5081546-b6be-4f3c-98a7-0ebb765fd7e2', {
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
	* {string} id
	* {Object} data
* Sample call:
```javascript
H5.getUGC().patchPlayerGameVariantItem('X3CXeX v3', 'b768f833-878b-4e15-96e3-8e84675b553c', {
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
	* {string} id
	* {Object} data
* Sample call:
```javascript
H5.getUGC().patchPlayerForgeGroupItem('Gamecheat13YT', 'a37e5f52-9faa-456a-a580-32106c7d3824', {
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
	* {string} id
	* {Object} data
* Sample call:
```javascript
H5.getUGC().patchPlayerForgeGroupItem('X3CXeX v3', 'a63a79d6-7caf-4572-a546-de89588b6b46', {
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
	* {string} id
* Sample call:
```javascript
H5.getUGC().deletePlayerMapVariantItem('Le ZeNy', 'a5081546-b6be-4f3c-98a7-0ebb765fd7e2')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**deletePlayerGameVariantItem():**

* Parameters:
	* {string} player
	* {string} id
* Sample call:
```javascript
H5.getUGC().deletePlayerGameVariantItem('X3CXeX v3', 'a5081546-b6be-4f3c-98a7-0ebb765fd7e2')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**deletePlayerForgeGroupItem():**

* Parameters:
	* {string} player
	* {string} id
* Sample call:
```javascript
H5.getUGC().deletePlayerForgeGroupItem('Gamecheat13YT', 'a37e5f52-9faa-456a-a580-32106c7d3824')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**deletePlayerBookmarkItem():**

* Parameters:
	* {string} player
	* {string} id
* Sample call:
```javascript
H5.getUGC().deletePlayerBookmarkItem('X3CXeX v3', 'a63a79d6-7caf-4572-a546-de89588b6b46')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**copyGameVariantItem():**

* Parameters:
	* {string} player
	* {string} id
	* {string} ownerName 
* Sample call (UgcPlayer):
```javascript
H5.getUGC().copyGameVariantItem('ske7ch', 'a63a79d6-7caf-4572-a546-de89588b6b46', 'X3CXeX v3')
.then(result => console.log(result))
.catch(error => console.log(error));
```
* Sample call ([Cms](https://content-hacs.svc.halowaypoint.com/content/guid-0e98003f35ef472db0111367172b6cf0)):
```javascript
H5.getUGC().copyGameVariantItem('ske7ch', '0e98003f35ef472db0111367172b6cf0', null)
.then(result => console.log(result))
.catch(error => console.log(error));
```

**copyMapVariantItem():**

* Parameters:
	* {string} player
	* {string} id
	* {string} ownerName 
* Sample call (UgcPlayer):
```javascript
H5.getUGC().copyMapVariantItem('GrimBrotherOne', 'a5081546-b6be-4f3c-98a7-0ebb765fd7e2', 'Le ZeNy')
.then(result => console.log(result))
.catch(error => console.log(error));
```
* Sample call ([Cms](https://content-hacs.svc.halowaypoint.com/content/guid-46c3b1f1e6fb4893bac232a235bfbeae)):
```javascript
H5.getUGC().copyMapVariantItem('GrimBrotherOne', '46c3b1f1e6fb4893bac232a235bfbeae', null)
.then(result => console.log(result))
.catch(error => console.log(error));
```

**copyForgeGroupItem():**

* Parameters:
	* {string} player
	* {string} id
	* {string} ownerName 
* Sample call:
```javascript
H5.getUGC().copyForgeGroupItem('Unyshek', 'a37e5f52-9faa-456a-a580-32106c7d3824', 'Gamecheat13YT')
.then(result => console.log(result))
.catch(error => console.log(error));
```

### H5.getSpartanStats() methods:

**getPlayerCredits():**

* Parameters:
	* {string} player
* Sample call:
```javascript
H5.getSpartanStats().getPlayerCredits('X3CXeX v3')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerCommendations():**

* Parameters:
	* {string} player
* Sample call:
```javascript
H5.getSpartanStats().getPlayerCommendations('X3CXeX v3')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerServiceRecords():**

* Parameters:
	* {string} player
* Sample call:
```javascript
H5.getSpartanStats().getPlayerServiceRecords('X3CXeX v3')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getPlayerMatches():**

* Parameters:
	* {string} player
* Sample call:
```javascript
H5.getSpartanStats().getPlayerMatches('Le ZeNy')
.then(result => console.log(result))
.catch(error => console.log(error));
```

**getCampaignMatchResult():**

* Parameters:
	* {string} player
* Sample call:
```javascript
H5.getSpartanStats().getCampaignMatchResult('Le ZeNy', '4db5c0fc-b3c9-4753-a76a-217b1957af33')
.then(result => console.log(result))
.catch(error => console.log(error));
```