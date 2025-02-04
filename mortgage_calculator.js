function calculateMortgage(principal, annualInterestRate, years) {
    let monthlyInterestRate = annualInterestRate / 100 / 12;
    let numberOfPayments = years * 12;
    
    let monthlyPayment = 
        (principal * monthlyInterestRate) / 
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
    
    return monthlyPayment.toFixed(2);
}

function calculateDTI(income, debt) {
    let dti = (debt / (income / 12)) * 100;
    return dti.toFixed(2);
}

function updateAffordabilityIndicator(dti) {
    let indicator = document.getElementById("affordabilityIndicator");
    if (dti <= 35) {
        indicator.innerText = "Affordability: Comfortable";
        indicator.className = "result green";
    } else if (dti > 35 && dti <= 43) {
        indicator.innerText = "Affordability: Stretch";
        indicator.className = "result yellow";
    } else {
        indicator.innerText = "Affordability: Difficult";
        indicator.className = "result red";
    }
}

function updateCalculations() {
    let income = parseFloat(document.getElementById("income").value) || 0;
    let debt = parseFloat(document.getElementById("debt").value) || 0;
    let dti = calculateDTI(income, debt);
    document.getElementById("dtiDisplay").innerText = `DTI: ${dti}%`;
    updateAffordabilityIndicator(dti);
}

function updateHousePrice() {
    let housePrice = document.getElementById("housePriceRange").value;
    document.getElementById("housePriceDisplay").innerText = `$${parseInt(housePrice).toLocaleString()}`;
    let income = parseFloat(document.getElementById("income").value) || 0;
    let debt = parseFloat(document.getElementById("debt").value) || 0;
    let estimatedMortgage = calculateMortgage(housePrice - (parseFloat(document.getElementById("downPayment").value) || 0), parseFloat(document.getElementById("interestRate").value) || 0, parseFloat(document.getElementById("loanTerm").value) || 0);
    let newDebt = debt + parseFloat(estimatedMortgage);
    let dti = calculateDTI(income, newDebt);
    document.getElementById("dtiDisplay").innerText = `DTI: ${dti}%`;
    updateAffordabilityIndicator(dti);
}

document.addEventListener("DOMContentLoaded", function() {
    let inputs = ["income", "debt", "downPayment", "loanTerm", "interestRate", "housePriceRange"];
    inputs.forEach(id => document.getElementById(id).addEventListener("input", updateCalculations));
    document.getElementById("housePriceRange").addEventListener("input", updateHousePrice);

    // Pre-fill default values
    document.getElementById("income").value = "75000";
    document.getElementById("debt").value = "250";
    document.getElementById("downPayment").value = "50000";
    document.getElementById("loanTerm").value = "30";
    document.getElementById("interestRate").value = "5.000";
    document.getElementById("housePriceRange").min = "50000";
    document.getElementById("housePriceRange").max = "1000000";
    document.getElementById("housePriceRange").value = "250000";
    document.getElementById("housePriceDisplay").innerText = "$250,000";
    updateCalculations();
    updateHousePrice();
});
