document.addEventListener('DOMContentLoaded', () => {
    const textEditor1 = document.getElementById('text-editor1');
    const textEditor2 = document.getElementById('text-editor2');
    const textEditor3 = document.getElementById('text-editor3');
    const wordCounter1 = document.getElementById('word-counter1');
    const wordCounter2 = document.getElementById('word-counter2');
    const wordCounter3 = document.getElementById('word-counter3');
    const clearBtn = document.getElementById('clear-btn');
    const progressBar = document.getElementById('progress');
    const progressLabel = document.querySelector('#progressbar h2');

    const forbiddenWords = [
        "It's essential to",
        "It's fundamental to",
        "Can help you with",
        "It's crucial to",
        "It's important to",
        "Remember",
        "I’m deeply concerned",
        "It's inappropriate to",
        "illegal and unethical",
        "You should",
        "We don't provide",
        "I don’t provide",
        "Under any circumstances",
        "Once again",
        "let’s keep it PG",
        "whoa there",
        "I cannot satisfy your request",
        "We cannot satisfy your request",
        "I’m unable to fulfill your request",
        "We're unable to fulfill your request",
        "I do not have the capacity",
        "We do not have the capacity",
        "We are not able to provide",
        "I am not programmed",
        "We are not programmed",
        "I am programmed to",
        "I am not equipped to provide",
        "I cannot",
        "We cannot",
        "Can I help you",
        "May I assist you",
        "What else would you",
        "Feel free to ask",
        "I’m here to help",
        "Can I assist you",
        "Can we assist you",
        "I am sorry",
        "I apologize",
        "As a helpful assistant",
        "As an AI",
        "As a model",
        "I would like to emphasize",
        "Ahh that’s nice",
        "In summary",
        "Please let me know",
        "Is there anything else",
        "I am here to",
        "Unfortunately",
        "this model",
        "I am not a resource",
        "I strongly advise"
    ];

    let isOutlineApplied1 = false;
    let isOutlineApplied2 = false;

    const updateWordCount = () => {
        const text1 = textEditor1.value.trim();
        const text2 = textEditor2.value.trim();
        const text3 = textEditor3.value.trim();

        const words1 = text1.split(/\s+/).filter(word => word.length > 0);
        const words2 = text2.split(/\s+/).filter(word => word.length > 0);
        const words3 = text3.split(/\s+/).filter(word => word.length > 0);

        // Update word counts
        const wordCountText1 = words1.length > 0 ? `Word Count: ${words1.length} (min/ 12 words.)` : '';
        const wordCountText2 = words2.length > 0 ? `Word Count: ${words2.length} (min/ 12 words.)` : '';
        wordCounter1.textContent = wordCountText1;
        wordCounter2.textContent = wordCountText2;
        wordCounter3.textContent = `Word Count: ${words3.length}`;

        // Check and apply outline if word count is less than 12 for textEditor1
        if (words1.length < 12 && text1.length > 0) {
            textEditor1.style.outline = '2px solid red'; // Adjust outline style as needed
            isOutlineApplied1 = true;
        } else {
            textEditor1.style.outline = 'none';
            isOutlineApplied1 = false;
        }

        // Check and apply outline if word count is less than 12 for textEditor2
        if (words2.length < 12 && text2.length > 0) {
            textEditor2.style.outline = '2px solid red'; // Adjust outline style as needed
            isOutlineApplied2 = true;
        } else {
            textEditor2.style.outline = 'none';
            isOutlineApplied2 = false;
        }

        // Check for forbidden words in text3
        const forbiddenPresent = forbiddenWords.filter(forbiddenWord => {
            // Using a regular expression to match the forbidden word ignoring case and punctuation
            const regex = new RegExp('\\b' + escapeRegExp(forbiddenWord) + '\\b', 'i');
            return regex.test(text3);
        });

        // Apply outline to textEditor3 if forbidden words are present
        textEditor3.style.outline = forbiddenPresent.length > 0 ? '2px solid red' : 'none';

        // Calculate similarity between text1 and text2 only if both are non-empty
        let similarity = 0;
        if (words1.length > 0 && words2.length > 0) {
            similarity = calculateSimilarity(text1, text2);
        }

        // Update progress bar based on similarity
        progressBar.value = similarity;
        progressLabel.textContent = `Prompt Similarity: ${similarity}%`;

        // Toggle visibility of forbidden words section
        const forbiddenWordsHeader = document.querySelector('.prompt h3');
        const forbiddenWordsParagraph = document.querySelector('.prompt p');

        if (forbiddenWordsHeader && forbiddenWordsParagraph) {
            if (forbiddenPresent.length > 0) {
                forbiddenWordsHeader.style.display = 'block';
                forbiddenWordsParagraph.style.display = 'block';
                // Display all matched forbidden words in the paragraph
                forbiddenWordsParagraph.textContent = forbiddenPresent.join(', ');
            } else {
                forbiddenWordsHeader.style.display = 'none';
                forbiddenWordsParagraph.style.display = 'none';
            }
        } else {
            console.error('Cannot find elements .prompt h3 or .prompt p');
        }
    };

    const clearText = () => {
        if (confirm('Are you sure you want to clear the text?')) {
            textEditor1.value = '';
            textEditor2.value = '';
            textEditor3.value = '';
            updateWordCount();
        }
    };

    // Hide the forbidden words section initially
    const forbiddenWordsHeader = document.querySelector('.prompt h3');
    const forbiddenWordsParagraph = document.querySelector('.prompt p');
    if (forbiddenWordsHeader && forbiddenWordsParagraph) {
        forbiddenWordsHeader.style.display = 'none';
        forbiddenWordsParagraph.style.display = 'none';
    } else {
        console.error('Cannot find elements .prompt h3 or .prompt p');
    }

    // Function to calculate similarity between two strings
    function calculateSimilarity(str1, str2) {
        // Split strings into arrays of words
        const words1 = new Set(str1.toLowerCase().match(/\b\w+\b/g));
        const words2 = new Set(str2.toLowerCase().match(/\b\w+\b/g));

        // Calculate intersection (shared words)
        const intersection = [...words1].filter(word => words2.has(word));

        // Calculate Jaccard similarity coefficient
        const similarity = (intersection.length / (words1.size + words2.size - intersection.length)) * 100;

        return similarity.toFixed(2); // Round to two decimal places
    }

    // Event listeners
    textEditor1.addEventListener('input', updateWordCount);
    textEditor2.addEventListener('input', updateWordCount);
    textEditor3.addEventListener('input', updateWordCount);
    clearBtn.addEventListener('click', clearText);

    // Initial word count and similarity update
    updateWordCount();
});

// Function to escape special characters in a string for regex
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
