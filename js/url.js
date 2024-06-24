document.addEventListener('DOMContentLoaded', function() {
    var runCheckBtn = document.getElementById('runCheckBtn');
    var urlInput = document.getElementById('url');
    var resultMessage = document.getElementById('resultMessage');

    runCheckBtn.addEventListener('click', function() {
        var url = urlInput.value.trim();
        if (url === '') {
            resultMessage.textContent = 'Please enter a URL.';
            return;
        }

        // Fetch the data from the API
        fetch("https://sheetdb.io/api/v1/c396qf041a97o")
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Failed to fetch blacklist data');
                }
            })
            .then(data => {
                // Log the data received from the API
                console.log('API Response Data:', data);

                // Check if the data is in the expected format
                if (Array.isArray(data)) {
                    // Flatten the array of objects into a single array of URLs
                    var blacklistedUrls = data.flatMap(obj => Object.values(obj));

                    // Check if the entered URL is in the list of blacklisted URLs
                    var isBlacklisted = blacklistedUrls.some(function(blacklistedUrl) {
                        // Adjust comparison as needed (e.g., exact match, substring match)
                        return url.includes(blacklistedUrl);
                    });

                    if (isBlacklisted) {
                        resultMessage.textContent = 'URL is blacklisted.';
                    } else {
                        resultMessage.textContent = 'URL is not blacklisted.';
                    }
                } else {
                    throw new Error('Invalid blacklist data format');
                }
            })
            .catch(error => {
                console.error('Error checking blacklist:', error);
                resultMessage.textContent = 'Error checking blacklist. Please try again later.';
            });
    });
});
