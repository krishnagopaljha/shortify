document.getElementById("shortenButton").addEventListener("click", function() {
    var url = document.getElementById("urlInput").value;
    
    if (url) {
        var encodedURL = encodeURIComponent(url);
        var requestURL = `https://tinyurl.com/api-create.php?url=${encodedURL}`;
        
        fetch(requestURL)
            .then(response => response.text())
            .then(shortenedURL => {
                if (shortenedURL) {
                    document.getElementById("result").innerHTML = `Shortened URL: <a href="${shortenedURL}" target="_blank">${shortenedURL}</a>`;
                    document.getElementById("copyButton").style.display = 'inline-block'; // Show copy button
                    document.getElementById("copyButton").dataset.url = shortenedURL; // Store shortened URL in the button's data attribute
                } else {
                    document.getElementById("result").innerHTML = "Failed to shorten URL.";
                    document.getElementById("copyButton").style.display = 'none'; // Hide copy button if there was an error
                }
            })
            .catch(error => {
                document.getElementById("result").innerHTML = "Error: " + error.message;
                document.getElementById("copyButton").style.display = 'none'; // Hide copy button if there's an error
            });
    } else {
        document.getElementById("result").innerHTML = "Please enter a URL.";
        document.getElementById("copyButton").style.display = 'none'; // Hide copy button if URL is empty
    }
});

document.getElementById("copyButton").addEventListener("click", function() {
    var shortenedURL = this.dataset.url; // Get the shortened URL stored in the button's data attribute

    // Create a temporary input element to copy the URL to clipboard
    var tempInput = document.createElement("input");
    tempInput.value = shortenedURL;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    // Show custom confirmation message
    showCustomAlert("Shortened URL copied to clipboard!");
});

function showCustomAlert(message) {
    // Create and show custom alert
    var alertBox = document.createElement("div");
    alertBox.classList.add("custom-alert");

    var alertContent = `
        <div class="alert-box">
            ${message}
            <button class="close-btn" onclick="closeCustomAlert()">Close</button>
        </div>
    `;

    alertBox.innerHTML = alertContent;
    document.body.appendChild(alertBox);

    alertBox.style.display = "flex"; // Show the alert box
}

function closeCustomAlert() {
    // Close custom alert
    var alertBox = document.querySelector(".custom-alert");
    if (alertBox) {
        alertBox.style.display = "none";
        document.body.removeChild(alertBox);
    }
}
