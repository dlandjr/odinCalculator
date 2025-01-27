function add(a, b) {
    return Number((parseFloat(a) + parseFloat(b)).toFixed(5));
}
function subtract(a, b) {
    return Number((parseFloat(a) - parseFloat(b)).toFixed(5));
}
function multiply(a, b) {
    return Number((parseFloat(a) * parseFloat(b)).toFixed(5));
}
function divide(a, b) {
    return b === "0" || b === 0
      ? "NOPE"
      : Number((parseFloat(a) / parseFloat(b)).toFixed(5));
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
  
  console.log(elements.operatorButtons);
  
  const updateDisplay = (content) => {
    elements.display.textContent = content;
  };
  
  const updateCalculationDisplay = (content) => {
    elements.calculationDisplay.textContent = content;
  };

const keyboardMap = {
    Enter: () => elements.equalsButton.click(),
    Backspace: () => elements.backspaceButton.click(),
    Escape: () => elements.clearAllButton.click(),
    "+": () => elements.operatorButtons[3].click(),
    "-": () => elements.operatorButtons[2].click(),
    "*": () => elements.operatorButtons[1].click(),
    "/": () => elements.operatorButtons[0].click(),
    ".": () => elements.commaButton.click(),
};

for (let i = 0; i <= 9; i++) {
  keyboardMap[i.toString()] = () => {
    const numberButton = Array.from(elements.numberButtons).find(
      (button) => button.textContent === i.toString()
    );
    if (numberButton) numberButton.click();
  };
}

