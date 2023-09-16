

// Global Variables

let shortUrlForm = document.querySelector("#url-shorten-form");
let submitButton = shortUrlForm.querySelector("button");
let input = shortUrlForm.querySelector(".url-input");


// Generate Random IDs
function reandomIds() {
    let currentTime = Date.now();
    let currentTimeString = currentTime.toString(32).slice(0, 8);
    let reandomNumber = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
        .toString()
        .slice(0, 4);
    let reabdomId = `${currentTimeString}-${reandomNumber}`;
    return reabdomId;
}

// shrtcode API
const makeShortURL = async (userUrl) => {
    let apiBaseURL = "https://api.shrtco.de/v2/";
    let shortenQuery = `shorten?url=`;
    let fetchLink = `${apiBaseURL}${shortenQuery}${userUrl}`;

    try {
        let response = await fetch(fetchLink);
        let data = await response.json();
        let status = data.ok;

        // Response With Data
        if (status) {
            let shortUrl = data.result.full_short_link;
            document.getElementById("short_url").href = shortUrl;
            document.getElementById("short_url").innerHTML = shortUrl;
        }

    } catch (error) {
        alerts("Sorry, unknown error happened please try again later.");
    }
};

shortUrlForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let inputValue = input.value.trim().replace(" ", "");
    makeShortURL(inputValue);
    shortUrlForm.reset();
});