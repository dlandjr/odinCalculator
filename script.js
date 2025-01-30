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


// Loop through numbers 0 to 9 and add them to the keyboard map
for (let i = 0; i <= 9; i++) {
  keyboardMap[i.toString()] = () => {
    // Convert the list of number buttons into an array
    const numberButtonsArray = Array.from(elements.numberButtons);

    // Find the button that matches the pressed number key
    const numberButton = numberButtonsArray.find(
      (button) => button.textContent === number.toString()
    );

    // If a matching button is found, simulate a button click
    if (numberButton) {
      numberButton.click();
    }
  };
}

// Listen for when a key is pressed on the keyboard
document.addEventListener("keydown", (event) => {
  const handler = keyboardMap[event.key];
  if (handler) {
    handler();  
  }
});
