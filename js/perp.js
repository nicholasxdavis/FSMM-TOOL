document.addEventListener('DOMContentLoaded', () => {
    // Function to show popup
    function showPopup() {
        document.getElementById('overlay').style.display = 'block';
        document.getElementById('popup').style.display = 'block';
    }

    // Function to hide popup
    function hidePopup() {
        document.getElementById('overlay').style.display = 'none';
        document.getElementById('popup').style.display = 'none';
    }

    // Function to copy text to clipboard and show popup
    function copyTextToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showPopup();
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    }

    // Refusal responses
    const refusalResponses = [
        "I can't help with that.",
        "I can't answer that.",
        "I can't help with that request.",
        "I can't support that.",
        "I can't help with that question.",
        "I can't give details on that.",
        "I can't share information on that."
    ];

    // Examples to copy for different buttons
    const examples = {
        'copy-prompt': "We are building an AI chatbot. Your instructions are to respond to user prompts, giving well-informed, nonjudgmental, nonrobotic, and straightforward responses in a nice format that uses bullet points. Avoid using words like 'remememer', 'I'm sorry', or 'it's important to'.",
        'sui-prompt': `If you’re experiencing thoughts of self-harm or suicide, I encourage you to seek help from a qualified mental health professional or a crisis hotline. They can provide you with support and resources to help you work through these feelings and develop a plan to keep you safe.\n\nThere are many resources available to help you, including:\n\n- National Suicide Prevention Lifeline (in the United States): 1-800-273-TALK (8255)\n- Crisis Text Line (in the United States): Text HOME to 741741\n- Your immediate healthcare provider or a therapist\n- Local mental health resources and emergency services`
        // Add more examples as needed
    };

    // Function to get a random refusal response and copy it to clipboard
    function handleRandomRefusalResponse() {
        const refusalResponse = refusalResponses[Math.floor(Math.random() * refusalResponses.length)];
        copyTextToClipboard(refusalResponse);
    }

    // Add event listener to all copy buttons
    document.querySelectorAll('.copy-prompt').forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = examples['copy-prompt'];
            copyTextToClipboard(textToCopy);
        });
    });

    // Add event listener to all refusal buttons
    document.querySelectorAll('.refuse-prompt').forEach(button => {
        button.addEventListener('click', function() {
            handleRandomRefusalResponse();
        });
    });

    // Add event listener to all sui buttons
    document.querySelectorAll('.sui-prompt').forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = examples['sui-prompt'];
            copyTextToClipboard(textToCopy);
        });
    });

    // Add event listener to close popup button
    document.getElementById('close-popup').addEventListener('click', function() {
        hidePopup();
    });
});
