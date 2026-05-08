// Game variables
let correctColor;
let lives;
let score;
let round;

// Start the game
function startGame() {
    lives = 3;
    score = 0;
    round = 1;
    
    updateGameStats();
    hideGameOverModal();
    generateRound();
}

// Generate a new round
function generateRound() {
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    
    // Generate 3 random colors
    let colors = [];
    for (let i = 0; i < 3; i++) {
        colors.push(randomColor());
    }
    
    // Select correct answer randomly
    correctColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Display RGB value to guess
    document.getElementById("rgbValue").textContent = correctColor;
    
    // Create color option boxes
    colors.forEach((color, index) => {
        const box = createColorBox(color, index);
        optionsDiv.appendChild(box);
    });
    
    // Update round counter
    document.getElementById("round").textContent = round;
}

// Create a color box
function createColorBox(color, index) {
    const box = document.createElement("div");
    box.className = "color-box";
    box.style.backgroundColor = color;
    
    // Add click event
    box.addEventListener("click", function() {
        checkAnswer(color, this);
    });
    
    return box;
}

//  COLOR GENERATION 
/**
 * @returns {string} RGB color string in format "rgb(r, g, b)"
 */
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

//  ANSWER VALIDATION 
/**
 * Check if the selected color is correct
 */
function checkAnswer(selected, selectedBox) {
    // Add visual feedback
    if (selected === correctColor) {
        selectedBox.classList.add("correct");
        score++;
        updateMessage("Correct! Well done!", "correct");
    } else {
        selectedBox.classList.add("wrong");
        lives--;
        updateMessage("Wrong! Try again!", "wrong");
    }
    
    // Update game statistics
    updateGameStats();
    
    // Check game state
    setTimeout(() => {
        if (lives === 0) {
            endGame();
        } else {
            round++;
            generateRound();
        }
    }, 1500);
}

// Update game statistics display
function updateGameStats() {
    document.getElementById("lives").textContent = lives;
    document.getElementById("score").textContent = score;
    document.getElementById("round").textContent = round;
}

// Update message display
function updateMessage(text, type) {
    const messageBox = document.getElementById("message");
    const messageText = messageBox.querySelector(".message-text");
    
    // Update message text
    messageText.textContent = text;
    
    // Update message styling
    messageBox.className = "message-box";
    if (type === "correct") {
        messageBox.classList.add("correct");
    } else if (type === "wrong") {
        messageBox.classList.add("wrong");
    }
}

// End the game and show game over modal
function endGame() {
    const modal = document.getElementById("gameOverModal");
    const finalScore = document.getElementById("finalScore");
    const performanceText = document.getElementById("performanceText");
    
    // Update final score
    finalScore.textContent = score;
    
    // Set performance message based on score
    let performance = "";
    if (score >= 10) {
        performance = "Outstanding! Color Master!";
    } else if (score >= 7) {
        performance = "Excellent! Great job!";
    } else if (score >= 5) {
        performance = "Good effort! Keep practicing!";
    } else if (score >= 3) {
        performance = "Nice try! You'll do better next time!";
    } else {
        performance = "Keep practicing! You'll improve!";
    }
    
    performanceText.textContent = performance;
    
    // Show modal
    modal.classList.add("show");
}

// Hide the game over modal
function hideGameOverModal() {
    const modal = document.getElementById("gameOverModal");
    modal.classList.remove("show");
}

// Show hint
function showHint() {
    if (lives <= 1) {
        updateMessage("Not enough lives for hint!", "wrong");
        return;
    }
    
    lives--;
    updateGameStats();
    updateMessage("Hint shown! -1 life", "neutral");
    
    // Highlight correct answer
    const boxes = document.querySelectorAll(".color-box");
    boxes.forEach(box => {
        if (box.style.backgroundColor === correctColor) {
            box.classList.add("correct");
        }
    });
}

// Start game when page loads
document.addEventListener("DOMContentLoaded", function() {
    startGame();
});
