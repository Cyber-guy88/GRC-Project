let responses = {};

function selectButton(button, itemId, value) {
    // Remove selected class from all buttons in this row
    const buttons = button.parentElement.getElementsByClassName('btn');
    for (let btn of buttons) {
        btn.classList.remove('selected');
    }
    
    // Add selected class to clicked button
    button.classList.add('selected');
    
    // Store the response
    responses[itemId] = value;
    
    // Enable submit button if all items have responses
    const submitBtn = document.getElementById('submitBtn');
    const totalItems = document.querySelectorAll('tbody tr').length;
    submitBtn.disabled = Object.keys(responses).length !== totalItems;
}

function calculateScore() {
    try {
        // Verify all questions are answered
        const totalItems = document.querySelectorAll('tbody tr').length;
        if (Object.keys(responses).length !== totalItems) {
            throw new Error('Please answer all questions before submitting');
        }

        // Calculate score using the same logic as the Python server
        const responseMapping = {
            "Yes": 1,
            "No": 0,
            "Partial": 0.5
        };

        const totalScore = Object.values(responses).reduce((sum, value) => {
            return sum + responseMapping[value];
        }, 0);

        const finalScore = (totalScore / totalItems) * 100;
        
        // Display the score
        const scoreDisplay = document.getElementById('scoreDisplay');
        scoreDisplay.textContent = `Your Security Score : ${finalScore.toFixed(2)}%`;
        
        // Add color coding based on score
        if (finalScore >= 80) {
            scoreDisplay.style.color = '#000000'; // Green
        } else if (finalScore >= 60) {
            scoreDisplay.style.color = '#000000'; // Yellow
        } else {
            scoreDisplay.style.color = '#000000'; // Red
        }

    } catch (error) {
        console.error('Error:', error);
        alert('Error: ' + error.message);
    }
}

// Update the submit button to use the new calculation function
document.getElementById('submitBtn').onclick = calculateScore;