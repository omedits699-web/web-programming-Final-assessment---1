// Calculate total petrol cost
function calculateTotal() {
    const priceInput = document.getElementById("pricePerLiter");
    const litersInput = document.getElementById("liters");
    const resultElement = document.getElementById("result");
    
    let price = parseFloat(priceInput.value) || 0;
    let liters = parseFloat(litersInput.value) || 0;

    let total = price * liters;

    resultElement.textContent = total.toFixed(2);
}

// Reset calculator
function resetCalculator() {
    const priceInput = document.getElementById("pricePerLiter");
    const litersInput = document.getElementById("liters");
    const resultElement = document.getElementById("result");
    
    priceInput.value = 1.72;
    litersInput.value = 0;
    resultElement.textContent = "0.00";
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set default values
    document.getElementById("pricePerLiter").value = 1.72;
    document.getElementById("liters").value = 0;
    document.getElementById("result").textContent = "0.00";
});
