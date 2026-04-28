// Calculate total petrol cost
function calculateTotal() {
    const priceInput = document.getElementById("pricePerLiter");
    const litersInput = document.getElementById("liters");
    const resultElement = document.getElementById("result");
    const priceDisplay = document.getElementById("priceDisplay");
    const litersDisplay = document.getElementById("litersDisplay");
    
    let price = parseFloat(priceInput.value) || 0;
    let liters = parseFloat(litersInput.value) || 0;

    // Validation
    if (price < 0) {
        price = 0;
        priceInput.value = 0;
    }
    if (liters < 0) {
        liters = 0;
        litersInput.value = 0;
    }

    let total = price * liters;

    // Update result with animation
    resultElement.style.transform = "scale(1.1)";
    resultElement.textContent = total.toFixed(2);
    
    // Update display values
    priceDisplay.textContent = `SR ${price.toFixed(2)}`;
    litersDisplay.textContent = `${liters.toFixed(1)} L`;

    // Add visual feedback for large amounts
    if (total > 100) {
        resultElement.style.color = "#ef4444";
    } else if (total > 50) {
        resultElement.style.color = "#f59e0b";
    } else {
        resultElement.style.color = "#667eea";
    }

    // Reset animation
    setTimeout(() => {
        resultElement.style.transform = "scale(1)";
    }, 200);
}

// Reset calculator
function resetCalculator() {
    const priceInput = document.getElementById("pricePerLiter");
    const litersInput = document.getElementById("liters");
    const resultElement = document.getElementById("result");
    const priceDisplay = document.getElementById("priceDisplay");
    const litersDisplay = document.getElementById("litersDisplay");
    
    // Reset values with animation
    resultElement.style.transform = "scale(0.8)";
    
    setTimeout(() => {
        priceInput.value = 1.72;
        litersInput.value = 0;
        resultElement.textContent = "0.00";
        priceDisplay.textContent = "SR 1.72";
        litersDisplay.textContent = "0.0 L";
        resultElement.style.color = "#667eea";
        resultElement.style.transform = "scale(1)";
    }, 200);
}

// Real-time calculation on input
document.addEventListener('DOMContentLoaded', function() {
    const priceInput = document.getElementById("pricePerLiter");
    const litersInput = document.getElementById("liters");
    
    priceInput.addEventListener('input', calculateTotal);
    litersInput.addEventListener('input', calculateTotal);
    
    // Initial calculation
    calculateTotal();
});

// Keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        calculateTotal();
    } else if (event.key === 'Escape') {
        resetCalculator();
    }
});

// Add input formatting
document.getElementById('pricePerLiter').addEventListener('blur', function() {
    const value = parseFloat(this.value);
    if (!isNaN(value)) {
        this.value = value.toFixed(2);
    }
});

document.getElementById('liters').addEventListener('blur', function() {
    const value = parseFloat(this.value);
    if (!isNaN(value)) {
        this.value = value.toFixed(1);
    }
});