function add(a , b) {
	return a + b;
};

function subtract(a, b) {
	return a - b;
};

function multiply(a, b) {
    return a * b;
};

function divide(a, b) {
    return a / b;
};

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
        return divide(num1, num2);
    }
    // else if (operator === "!") {
    //     return divide(num1, num2);
    // }
    else {
        return null;
    }
}

let numOne = 0;
let numTwo = 0;
console.log("numOne INIT:", numOne);
console.log("numTwo INIT:", numTwo);
let operator;
let operatorPressed = false;
let currentAnswer = "0";
const displayNumber = document.querySelector(".display")

/*
    Need to make sure each number pressed on the calculator corresponds
    to an event listener so that each number input can be captured and displayed.
*/
const numberButtons = document.querySelectorAll(".numberBtn");
numberButtons.forEach(button => {
    button.addEventListener("click", function() {
        let number = this.getAttribute("data-value");
        if (displayNumber.textContent === currentAnswer.toString() || displayNumber.textContent === "0") {
            displayNumber.textContent = "";
        }
        else if (displayNumber.textContent === numOne.toString() && operatorPressed) {
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
        operator = this.getAttribute("data-op");
        operatorPressed = true;
    });
});

const evaluateExp = document.querySelector(".equalsBtn");
evaluateExp.addEventListener("click", () => {
    currentAnswer = operate(numOne, operator, numTwo);
    console.log("numOne: ",numOne);
    console.log("numTwo: ",numTwo);
    displayNumber.textContent = currentAnswer;
    numOne = currentAnswer;
    operatorPressed = false;
})