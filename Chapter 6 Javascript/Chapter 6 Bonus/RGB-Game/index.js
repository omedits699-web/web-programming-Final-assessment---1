// ================= RGB COLOR GUESSING GAME =================
// Global game variables
let correctColor;
let lives;
let score;
let round;
let isProcessing = false;

// ================= GAME INITIALIZATION =================
/**
 * Initialize and start a new game
 * Resets all game variables and generates the first round
 */
function startGame() {
    // Reset game state
    lives = 3;
    score = 0;
    round = 1;
    isProcessing = false;
    
    // Update UI elements
    updateGameStats();
    updateMessage("🎯 Choose the correct color!", "neutral");
    
    // Hide game over modal if visible
    hideGameOverModal();
    
    // Generate first round
    generateRound();
}

// ================= ROUND GENERATION =================
/**
 * Generate a new round with random color options
 * Creates 3 color options including the correct answer
 */
function generateRound() {
    if (isProcessing) return;
    
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";
    
    // Generate array of random colors
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

/**
 * Create a color box element with hover effects and animations
 * @param {string} color - The RGB color value
 * @param {number} index - The box index for staggered animation
 * @returns {HTMLElement} The created color box element
 */
function createColorBox(color, index) {
    const box = document.createElement("div");
    box.classList.add("color-box");
    box.style.backgroundColor = color;
    box.style.animationDelay = `${index * 0.1}s`;
    
    // Add click event listener
    box.addEventListener("click", function() {
        if (!isProcessing) {
            checkAnswer(color, this);
        }
    });
    
    return box;
}

// ================= COLOR GENERATION =================
/**
 * Generate a random RGB color value
 * @returns {string} RGB color string in format "rgb(r, g, b)"
 */
function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

// ================= ANSWER VALIDATION =================
/**
 * Check if the selected color is correct
 * @param {string} selected - The selected RGB color
 * @param {HTMLElement} selectedBox - The clicked color box element
 */
function checkAnswer(selected, selectedBox) {
    if (isProcessing) return;
    
    isProcessing = true;
    
    // Disable all color boxes temporarily
    disableAllBoxes();
    
    // Add visual feedback to selected box
    if (selected === correctColor) {
        // Correct answer
        selectedBox.classList.add("correct");
        score++;
        updateMessage("🎉 Correct! Well done!", "correct");
        playSuccessAnimation();
    } else {
        // Wrong answer
        selectedBox.classList.add("wrong");
        lives--;
        updateMessage("❌ Wrong! Try again!", "wrong");
        playWrongAnimation();
        
        // Show the correct answer after a delay
        setTimeout(() => {
            highlightCorrectBox();
        }, 500);
    }
    
    // Update game statistics
    updateGameStats();
    
    // Check game state and proceed
    setTimeout(() => {
        if (lives === 0) {
            endGame();
        } else {
            round++;
            generateRound();
        }
        isProcessing = false;
    }, 1500);
}

// ================= UI UPDATES =================
/**
 * Update game statistics display
 */
function updateGameStats() {
    document.getElementById("lives").textContent = lives;
    document.getElementById("score").textContent = score;
    document.getElementById("round").textContent = round;
}

/**
 * Update message display with icon and styling
 * @param {string} text - The message text
 * @param {string} type - Message type: "correct", "wrong", "neutral"
 */
function updateMessage(text, type) {
    const messageBox = document.getElementById("message");
    const messageText = messageBox.querySelector(".message-text");
    const messageIcon = messageBox.querySelector(".message-icon");
    
    // Update message text
    messageText.textContent = text;
    
    // Update message styling based on type
    messageBox.className = "message-box";
    if (type === "correct") {
        messageBox.classList.add("correct");
        messageIcon.textContent = "🎉";
    } else if (type === "wrong") {
        messageBox.classList.add("wrong");
        messageIcon.textContent = "❌";
    } else {
        messageIcon.textContent = "🎯";
    }
    
    // Add slide animation
    messageBox.style.animation = "none";
    setTimeout(() => {
        messageBox.style.animation = "messageSlide 0.5s ease-out";
    }, 10);
}

// ================= GAME END =================
/**
 * End the game and show game over modal
 */
function endGame() {
    const modal = document.getElementById("gameOverModal");
    const finalScore = document.getElementById("finalScore");
    const performanceText = document.getElementById("performanceText");
    
    // Update final score
    finalScore.textContent = score;
    
    // Set performance message based on score
    let performance = "";
    if (score >= 10) {
        performance = "🏆 Outstanding! Color Master!";
    } else if (score >= 7) {
        performance = "⭐ Excellent! Great job!";
    } else if (score >= 5) {
        performance = "👍 Good effort! Keep practicing!";
    } else if (score >= 3) {
        performance = "📚 Nice try! You'll do better next time!";
    } else {
        performance = "💪 Keep practicing! You'll improve!";
    }
    
    performanceText.textContent = performance;
    
    // Show modal with animation
    modal.classList.add("show");
}

/**
 * Hide the game over modal
 */
function hideGameOverModal() {
    const modal = document.getElementById("gameOverModal");
    modal.classList.remove("show");
}

// ================= HELPER FUNCTIONS =================
/**
 * Disable all color boxes to prevent multiple clicks
 */
function disableAllBoxes() {
    const boxes = document.querySelectorAll(".color-box");
    boxes.forEach(box => {
        box.style.pointerEvents = "none";
    });
}

/**
 * Highlight the correct answer box
 */
function highlightCorrectBox() {
    const boxes = document.querySelectorAll(".color-box");
    boxes.forEach(box => {
        if (box.style.backgroundColor === correctColor) {
            box.classList.add("correct");
        }
    });
}

/**
 * Play success animation
 */
function playSuccessAnimation() {
    // Add confetti effect or celebration animation
    const gameContainer = document.querySelector(".game-container");
    gameContainer.style.animation = "pulse 0.5s ease";
    setTimeout(() => {
        gameContainer.style.animation = "";
    }, 500);
}

/**
 * Play wrong animation
 */
function playWrongAnimation() {
    // Add shake effect
    const gameContainer = document.querySelector(".game-container");
    gameContainer.style.animation = "shake 0.5s ease";
    setTimeout(() => {
        gameContainer.style.animation = "";
    }, 500);
}

// ================= BONUS FEATURES =================
/**
 * Show hint to help player (costs a life)
 */
function showHint() {
    if (lives <= 1 || isProcessing) {
        updateMessage("❌ Not enough lives for hint!", "wrong");
        return;
    }
    
    isProcessing = true;
    lives--;
    updateGameStats();
    
    // Show the correct answer briefly
    highlightCorrectBox();
    updateMessage("💡 Hint shown! -1 life", "neutral");
    
    setTimeout(() => {
        // Remove highlight and continue
        const boxes = document.querySelectorAll(".color-box");
        boxes.forEach(box => {
            box.classList.remove("correct", "wrong");
            box.style.pointerEvents = "auto";
        });
        isProcessing = false;
    }, 1000);
}

// ================= KEYBOARD CONTROLS =================
/**
 * Handle keyboard shortcuts
 * - Number keys (1-3): Select color option
 * - Enter: Restart game
 * - Escape: Show hint
 */
document.addEventListener("keydown", function(event) {
    if (isProcessing) return;
    
    const boxes = document.querySelectorAll(".color-box");
    
    // Number keys for color selection
    if (event.key >= "1" && event.key <= "3") {
        const index = parseInt(event.key) - 1;
        if (boxes[index]) {
            boxes[index].click();
        }
    }
    
    // Enter key to restart
    if (event.key === "Enter") {
        startGame();
    }
    
    // Escape key for hint
    if (event.key === "Escape") {
        showHint();
    }
});

// ================= ANIMATION HELPERS =================
/**
 * Add CSS animations dynamically
 */
const style = document.createElement("style");
style.textContent = `
    @keyframes pulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// ================= GAME INITIALIZATION =================
// Start the game when page loads
document.addEventListener("DOMContentLoaded", function() {
    startGame();
    
    // Add initial entrance animation
    const gameContainer = document.querySelector(".game-container");
    gameContainer.style.opacity = "0";
    gameContainer.style.transform = "translateY(20px)";
    
    setTimeout(() => {
        gameContainer.style.transition = "all 0.5s ease";
        gameContainer.style.opacity = "1";
        gameContainer.style.transform = "translateY(0)";
    }, 100);
});