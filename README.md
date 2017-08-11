# Cryptum: HaloDotAPI
[![N|Solid](https://i.imgur.com/vfYkceM.png)](https://www.twitter.com/_SuckMyLuck)

### What is this?
**HaloDotAPI** is an advanced **Halo 5 API wrapper** which is **NOT** based on the [official one](https://). But what does it mean? No rate limit, new endpoints, POST / PATCH / POST / PUT methods support, and last but not least, **It can be extended to other Halo games**.

Note: This API requires your **SpartanToken** Authorization (v2 and v3 are supported). See "[How-to retrieve my SpartanToken?](#how--to-retrieve-my-spartantoken-)" section for further information.

### What about new endpoints?
Looking for variants or Forge groups? There is a **search endpoint** for that. Wondering which weapon skin or service tag is used by an another player? There is an **appearance endpoint** for that. Want to update your controller settings, know how many REQ points you got or change your matchmaking preferences? There are also **endpoints** for that!

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

* `API.getGames()`:
— Return supported games.

* `API.getPlatforms()`:
— Return supported platforms.

* `API.initializeGame(string:game)`:
— Initialize a GameClass. 

**Authorities methods (H5):**

* `getUGC()`:
— Provides Metadata about User-Generated Content.

* `getSpartanStats()`:
— Provides Metadata about User-Generated Content.

* `getHaloPlayer()`:
— Provides Profile information about Players.

* `getHACS()`:
— Provides Metadata information.

* `getPacks()`:
— Provides data about REQ Packs and Cards.

* `getSearch()`:
— Provides Search endpoints.

* `getBanProcessor()`:
— Provides ban informations about Players.

### REDACTING....