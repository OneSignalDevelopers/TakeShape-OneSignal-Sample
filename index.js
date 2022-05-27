const projectID = "YOUR-TAKESHAPE-PROJECT-ID";
const apiKey = "YOUR-COUNTRIES-API-KEY";
const takeShapeURL = `https://api.takeshape.io/project/${projectID}/v3/graphql`;
const select = document.getElementById("country-list");

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

loadCountries();