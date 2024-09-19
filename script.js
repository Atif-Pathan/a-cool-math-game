function add(a , b) {
	return roundResult(a + b);
};

function subtract(a, b) {
	return roundResult(a - b);
};

function multiply(a, b) {
    return roundResult(a * b);
};

function divide(a, b) {
    return roundResult(a / b);
};

function roundResult(result) {
    return +result.toPrecision(12);  // Round to 15 significant digits
}

function operate(num1, operator, num2) {
    if (operator === "+") {
        return add(num1, num2);
    }
    else if (operator === "-") {
        return subtract(num1, num2);
    }
    else if (operator === "x") {
        return multiply(num1, num2);
    }
    else if (operator === "/") {
        if (num2 === 0) {
            // Randomly pick one of the messages
            const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
            return randomMessage;
        }
        return divide(num1, num2);
    }
    // else if (operator === "!") {
    //     return divide(num1, num2);
    // }
    else {
        return null;
    }
}
const errorMessages = [
    "0k, genius..",
    "... uh ok nice try",
    "You almost had me..."
];

let numOne = null;
let numTwo = null;
let operator = null;
let operatorPressed = false;
let currentAnswer = "0";
let lastPressedWasOperator = false;
const displayNumber = document.querySelector(".display")

/*
    Need to make sure each number pressed on the calculator corresponds
    to an event listener so that each number input can be captured and displayed.
*/
const numberButtons = document.querySelectorAll(".numberBtn");
numberButtons.forEach(button => {
    button.addEventListener("click", function() {
        lastPressedWasOperator = false;
        let number = this.getAttribute("data-value");
        if (displayNumber.textContent === currentAnswer.toString() || displayNumber.textContent === "0") {
            displayNumber.textContent = "";
        }
        else if (displayNumber.textContent === numOne.toString() && operatorPressed) {
            // FIX BUG WITH 8 * 80
            displayNumber.textContent = "";
        }
        displayNumber.textContent += number;
        operatorPressed ? 
            numTwo = parseInt(displayNumber.textContent) : 
            numOne = parseInt(displayNumber.textContent);
    });
});

const operationButtons = document.querySelectorAll(".operations");
operationButtons.forEach(button => {
    button.addEventListener("click", function() {
        // if operator button is already pressed, we want it to evaluate anyway
        if (operatorPressed && !lastPressedWasOperator) {
            currentAnswer = operate(numOne, operator, numTwo);
            displayNumber.textContent = currentAnswer;
            numOne = currentAnswer;
        }
        operator = this.getAttribute("data-op");
        operatorPressed = true;
        lastPressedWasOperator = true;
    });
});

const evaluateExp = document.querySelector(".equalsBtn");
evaluateExp.addEventListener("click", () => {
    if (numOne !== null && numTwo !== null && operator !== null) {
        currentAnswer = operate(numOne, operator, numTwo);
        console.log(currentAnswer);
        displayNumber.textContent = currentAnswer;
        numOne = currentAnswer;
        operatorPressed = false;
    }
})

const clearAll = document.querySelector("#reset-btn");
clearAll.addEventListener("click", () => {
    numOne = null;
    numTwo = null;
    operator = null;
    operatorPressed = false;
    lastPressedWasOperator = false;
    currentAnswer = "0";
    displayNumber.textContent = currentAnswer;
});