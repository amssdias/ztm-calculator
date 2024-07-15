const calculatorDisplay = document.querySelector("h1");
const inputBtns = document.querySelectorAll("button");
const clearBtn = document.getElementById("clear-btn");

// Calculate first and second values
const calculate = {
    "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
    "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
    "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
    "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
    "=": (firstNumber, secondNumber) => secondNumber
};

let firstValue = 0;
let operatorValue = "";
let awaitingNextValue = false;

function sendNumberValue(number) {

    if (awaitingNextValue) {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    } else {
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === "0" ? number : displayValue + number;
    }
}

function addDecimal() {
    if (awaitingNextValue) return;

    const displayValue = calculatorDisplay.textContent;
    if (!displayValue.includes(".")) {
        calculatorDisplay.textContent = `${displayValue}.`;
    }
}

function useOperator(operator) {
    const currentValue = Number(calculatorDisplay.textContent);

    // Prevent multiple operators
    if (operatorValue && awaitingNextValue) {
        operatorValue = operator;
        return
    }
    
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        // Do calculation
        const calculation = calculate[operator](firstValue, currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }
    awaitingNextValue = true;
    operatorValue = operator;
    
}

function resetAll() {
    calculatorDisplay.textContent = "0";
    
    firstValue = 0;
    operatorValue = "";
    awaitingNextValue = false;
}

inputBtns.forEach((inputBtn) => {

    if (inputBtn.classList.length === 0) {
        inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains("operator")) {
        inputBtn.addEventListener("click", () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains("decimal")) {
        inputBtn.addEventListener("click", addDecimal);
    }

});
clearBtn.addEventListener("click", resetAll);