function calculateTotal() {

    // getting petrol price input value
    let price = document.getElementById("pricePerLiter").value;

    // getting liters input value
    let liters = document.getElementById("liters").value;

    // converting string values into numbers
    price = parseFloat(price);
    liters = parseFloat(liters);

    // checking if user entered valid numbers
    if (isNaN(price) || isNaN(liters)) {

        alert("Please enter valid numbers.");

        return;
    }

    // calculating total cost
    let total = price * liters;

    // displaying result on screen
    document.getElementById("result").innerHTML =
        "SR " + total.toFixed(2);
}
