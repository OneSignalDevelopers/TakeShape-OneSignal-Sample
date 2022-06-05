# TakeShape-OneSignal-Sample

<p>
  <a href="https://github.com/OneSignal/onesignal-expo-plugin/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://twitter.com/onesignaldevs" target="_blank">
    <img alt="Twitter: onesignaldevelopers" src="https://img.shields.io/twitter/follow/onesignaldevs?style=social" />
  </a>
</p>

This is a sample project that experiments with the combination of [OneSignal](https://onesignal.com/webpush)'s push notifications with [TakeShape](https://www.takeshape.io/)'s powerful API mesh.

 Visit the [how-to guide](https://onesignal.com/blog/onesignal-takeshape-collab-project/) for a more in-depth explanation of the project.

## Requirements

To run the project you will need a few things:

### OneSignal App
- OneSignal's API Key, which you can find in your OneSignal Dashboard(`OneSignal Dashboard->App Settings->API Key` ).
- OneSignal's App ID, which you can find in your OneSignal Dashboard(`OneSignal Dashboard->App Settings->App ID`).

### TakeShape Project
- TakeShape's API Key, which you can find in your TakeShape dashboard.

### Countries API
- Countries API Key, which you can find in the Countries Website.

### Running the project

To run the project just open the `index.html` file in your browser.

### index.html

#### Initialization:
OneSignal initialization. The code connects to OneSignal's API and registers the device.

To learn more about this, visit [OneSignal's documentation](https://documentation.onesignal.com/docs/web-push-sdk-setup-in-your-website).

```html
<script>
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
        OneSignal.init({
            appId: "YOUR-ONESIGNAL-APP-ID",
        });
    });
</script>
```
### index.js

#### loadCountries():
The `loadCountries()` function is responsible for the communication between the app and TakeShape's API. This code pulls the data from TakeShape's API that contains the information from the Countries API. Another thing to remember is that TakeShape's API is a GraphQL API, so you need to use `POST` request in the `fetch` function to make the request.


```javascript
const loadCountries = async () => {
    const resp = await fetch(
        takeShapeURL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                query: `
                    query {
                        Countries_countries {
                            code
                        }
                    }
                `
            })
        }
    );

    const results = await resp.json();
    
    results.data.Countries_countries.forEach(country => {
        const option = new Option(country.code, country.code)
        select.add(option);
    });
};
```
#### sendPush():
The `sendPush()` function is responsible for the calling the TakeShape's API which will trigger a call to the OneSignal API which is responsible for sending the push notification to the user. In this case, the `sendPush()` function is called when the user clicks the `Send Push` button.

**Note:** The push notification would be sent to your device only if the user is subscribed to the OneSignal app thanks to the [OneSignal.getUserId()](https://documentation.onesignal.com/docs/web-push-sdk#user-ids).

```javascript
const sendPush = async () => {
    await fetch(
        takeShapeURL,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                query: `
                    mutation {
                        sendPushNotification (
                            user: "${await OneSignal.getUserId()}",
                            countryCode: "${select.value}"
                        ) {
                            id
                        }
                    }
                `
            })
        }
    );
};
```

### OneSignal Community

## Show your support

Give a ⭐️ if this project helped you!

## OneSignal Developers

* Website: https://onesignal.com/onesignal-developers
* Twitter: [@OneSignalDevs](https://twitter.com/onesignal)
* Github: [@OneSignalDevelopers](https://github.com/OneSignal)
* Discord: [@onesignal](https://linkedin.com/company/onesignal)
