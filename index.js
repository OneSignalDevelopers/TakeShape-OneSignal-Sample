const messageInput = document.querySelector('#message');
const pushForm = document.querySelector('#pushForm');

const sendPush = async (API_URL, data) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

const getUserId = async () => {
    const userId = await OneSignal.getUserId();
    console.log("OneSignal User ID:", userId);
    return userId;
}

const onSubmit = async (e) => {
    e.preventDefault();
    console.log(e)
    const API_URL = 'https://onesignal.com/api/v1/notifications';
    const userId = await getUserId();

    const notificationOptions = {
        "app_id": "bfb2ccef-6f9a-4a47-901d-de2e39012e2e",
        "contents": { "en": "Sample Push Message" },
        "headings": {"en": messageInput.value},
        "include_player_ids": [userId],
        "chrome_web_icon": "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    };

    const data = await sendPush(API_URL, notificationOptions)
    console.log(data);
    pushForm.reset();
};

pushForm.addEventListener('submit', onSubmit);