const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clearButton = document.getElementById("clear");
const equalButton = document.getElementById("equal");

let currentInput = "";
let currentOperator = null;
let firstOperand = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (!isNaN(value) || value === ".") {
            currentInput += value;
            updateDisplay(currentInput);
        } else if (["+", "-", "*", "/"].includes(value)) {
            if (currentInput !== "") {
                if (firstOperand === null) {
                    firstOperand = parseFloat(currentInput);
                } else {
                    firstOperand = calculate(firstOperand, parseFloat(currentInput), currentOperator);
                }
                currentOperator = value;
                currentInput = "";
                updateDisplay(firstOperand);
            }
        }
    });
});

clearButton.addEventListener("click", () => {
    currentInput = "";
    currentOperator = null;
    firstOperand = null;
    updateDisplay("0");
});

equalButton.addEventListener("click", () => {
    if (currentInput !== "" && currentOperator !== null && firstOperand !== null) {
        const result = calculate(firstOperand, parseFloat(currentInput), currentOperator);
        updateDisplay(result);
        currentInput = "";
        currentOperator = null;
        firstOperand = null;
    }
});

function updateDisplay(value) {
    display.textContent = value;
}

function calculate(a, b, operator) {
    switch (operator) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "*":
            return a * b;
        case "/":
            return b !== 0 ? a / b : "Error";
        default:
            return b;
    }
}
