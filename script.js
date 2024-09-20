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
    let resultString = result.toString();
    
    // If the result exceeds 15 characters (overflow), round it to 10 significant digits
    if (resultString.length >= 15) {
        result = +result.toPrecision(10);  // Round to 10 significant digits
        resultString = result.toString();  // Recalculate result string after rounding
        if (resultString.length >= 15) {
            resultString = result.toExponential(10);  // Use scientific notation with 5 decimal places
        }
        result = Number(resultString)
    }
    return resultString;  // Return the string result for display
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
let currentAnswer = -Infinity;
let lastPressedWasOperator = false;
const displayNumber = document.querySelector(".display")
const decimalButton = document.querySelector(".decimal");
const backspaceButton = document.querySelector("#backspace");
const plusMinusButton = document.querySelector("#plus-minus");
let disableDecimal = false;
const MAX_DISPLAY_LENGTH = 15;

/*
    Need to make sure each number pressed on the calculator corresponds
    to an event listener so that each number input can be captured and displayed.
*/
const numberButtons = document.querySelectorAll(".numberBtn");
numberButtons.forEach(button => {
    button.addEventListener("click", function() {
        let number = this.getAttribute("data-value");
        answerString = currentAnswer.toExponential(10);
        if (displayNumber.textContent.length >= MAX_DISPLAY_LENGTH &&!lastPressedWasOperator) {
            return;  // Stop further input if the display is full
        }
        if (displayNumber.textContent === currentAnswer.toString() || errorMessages.includes(displayNumber.textContent)) {
            displayNumber.textContent = "";
        }
        if ((operatorPressed && lastPressedWasOperator) || displayNumber.textContent === answerString) {
            displayNumber.textContent = "";
        }
        lastPressedWasOperator = false;
        displayNumber.textContent += number;
        operatorPressed ? 
            numTwo = Number(displayNumber.textContent) : 
            numOne = Number(displayNumber.textContent);
    });
});

const operationButtons = document.querySelectorAll(".operations");
operationButtons.forEach(button => {
    button.addEventListener("click", function() {
        // if operator button is already pressed, we want it to evaluate anyway
        if (operatorPressed && !lastPressedWasOperator) {
            currentAnswer = operate(numOne, operator, numTwo);
            displayNumber.textContent = currentAnswer;
            currentAnswer = Number(currentAnswer);
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
        displayNumber.textContent = currentAnswer;
        currentAnswer = Number(currentAnswer);
        numOne = currentAnswer;
        operatorPressed = false;
        disableDecimal = false;
    }
})

const clearAll = document.querySelector("#reset-btn");
clearAll.addEventListener("click", () => {
    numOne = null;
    numTwo = null;
    operator = null;
    operatorPressed = false;
    lastPressedWasOperator = false;
    currentAnswer = -Infinity;
    displayNumber.textContent = "";
    disableDecimal = false;
});

decimalButton.addEventListener("click", () => {
    console.log(currentAnswer.toString());
    
    if (displayNumber.textContent.includes(".") || lastPressedWasOperator || displayNumber.textContent === currentAnswer.toString()) {
        disableDecimal = true;
    }
    else {
        disableDecimal = false;
    }

    if (!disableDecimal) {
        if (displayNumber.textContent.length === 0) {
            displayNumber.textContent += "0.";
        }
        else {
            displayNumber.textContent += ".";    
        }
    }
});

backspaceButton.addEventListener("click", function() {
    console.log("button pressed");
    console.log(displayNumber.textContent.length);
    
    if (displayNumber.textContent.length > 0) {
        displayNumber.textContent = displayNumber.textContent.slice(0, -1);
        operatorPressed ? 
            numTwo = Number(displayNumber.textContent) : 
            numOne = Number(displayNumber.textContent);
    }
});

plusMinusButton.addEventListener("click", function() {
    if (displayNumber.textContent.length > 0) {
        let currentValue = Number(displayNumber.textContent);
        currentValue = currentValue * -1;
        displayNumber.textContent = currentValue.toString();
        operatorPressed ? 
            numTwo = Number(displayNumber.textContent) : 
            numOne = Number(displayNumber.textContent);
    }
})