function add(a, b) {
    return Number((Number(a) + Number(b)).toFixed(5));
}
function subtract(a, b) {
    return Number((Number(a) - Number(b)).toFixed(5));
}
function multiply(a, b) {
    return Number((Number(a) * Number(b)).toFixed(5));
}
function divide(a, b) {
    return b === "0" || b === 0
      ? "NOPE"
      : Number((Number(a) / Number(b)).toFixed(5));
}
  
const operators = {
    "+": add,
    "-": subtract,
    "*": multiply,
    "/": divide,
};
  
let a = undefined;
let b = undefined;
let operator = undefined;
let result = undefined;
  
const operate = (a, b, operator) => operator(a, b);

const elements = {
    numberButtons: document.querySelectorAll(".number"),
    equalsButton: document.querySelector("#equals"),
    clearEntryButton: document.querySelector(".clear-entry"),
    plusMinusButton: document.querySelector(".plus-minus"),
    decimalButton: document.querySelector(".decimal"),
    display: document.querySelector(".result-display"),
    currentDisplay: document.querySelector(".current-display"),
    operatorButtons: document.querySelectorAll(".operator"),
    backspaceButton: document.querySelector(".backspace"),
};