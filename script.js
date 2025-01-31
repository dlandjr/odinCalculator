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
  return Number(b) === 0 ? "Error" : Number((Number(a) / Number(b)).toFixed(5));
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
    resultsDisplay: document.querySelector(".results-display"),
    currentDisplay: document.querySelector(".current-display"),
    operatorButtons: document.querySelectorAll(".operator"),
    backspaceButton: document.querySelector(".backspace"),
};

// Display calculator current entry and results

const updateResultsDisplay = (content) => {
  elements.resultsDisplay.textContent = content;
};

const updateCurrentDisplay = (content) => {
  elements.currentDisplay.textContent = content;
};

const keyboardMap = {
  Enter: () => elements.equalsButton.click(),
  Backspace: () => elements.backspaceButton.click(),
  Escape: () => elements.clearEntryButton.click(),
  "+": () => elements.operatorButtons[3].click(),
  "-": () => elements.operatorButtons[2].click(),
  "*": () => elements.operatorButtons[1].click(),
  "/": () => elements.operatorButtons[0].click(),
  ".": () => elements.decimalButton.click(),
};


// Loop through numbers 0 to 9 and add them to the keyboard map
for (let i = 0; i <= 9; i++) {
  keyboardMap[i.toString()] = () => {
    // Convert the list of number buttons into an array
    const numberButtonsArray = Array.from(elements.numberButtons);

    // Find the button that matches the pressed number key
    const numberButton = numberButtonsArray.find(
      (button) => button.textContent === i.toString()
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

elements.numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const buttonText = button.textContent;

    if (button.classList.contains("decimal") &&
      elements.currentDisplay.textContent.includes(".")) {
      return;
    }

    updateCurrentDisplay(elements.currentDisplay.textContent + buttonText);
  });
});

elements.decimalButton.addEventListener("click", () => {
  if (!elements.currentDisplay.textContent.includes(".")) {
    updateCurrentDisplay(elements.currentDisplay.textContent + ".");
  }
});

elements.operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.id === "equals") return;

    const displayContent = elements.currentDisplay.textContent;

    // Scenario 1: First number input - store first number and operator
    // Example: User enters "5" then clicks "+"
    if (a === undefined || (operator === undefined && displayContent !== "")) {
      a = displayContent || a;
      operator = operators[button.textContent];
      updateResultsDisplay(`${a} ${button.textContent}`);
      updateCurrentDisplay("");
      return;
    }

    // Scenario 2: Change operator without second number
    // Example: User enters "5" then "+" then changes to "-"
    if (displayContent === "") {
      operator = operators[button.textContent];
      updateResultsDisplay(`${a} ${button.textContent}`);
      return;
    }

    // Scenario 3: Chain calculation - calculate result and prepare for next operation
    // Example: User enters "5" "+" "3" then clicks "-" -> shows "8 -"
    if (b === undefined && displayContent !== "") {
      b = displayContent;
      result = operate(a, b, operator);
      updateResultsDisplay(
        `${elements.resultsDisplay.textContent} ${b} ${button.textContent}`
      );
      updateCurrentDisplay("");
      a = result;
      b = undefined;
      operator = operators[button.textContent];
      return;
    }

    // Scenario 4: Change operator after chained calculation
    // Updates display to show new operator
    operator = operators[button.textContent];
    updateResultsDisplay(
      `${elements.resultsDisplay.textContent} ${button.textContent}`
    );
    updateCurrentDisplay("");
  });
});

elements.equalsButton.addEventListener("click", () => {
  const displayContent = elements.currentDisplay.textContent;

  // Add check for missing operator or first number
  if (!operator || a === undefined) return;

  if (b === undefined && displayContent !== "") {
    b = displayContent;
    result = operate(a, b, operator);
    updateResultsDisplay(`${elements.resultsDisplay.textContent} ${b}`);
  }

  updateCurrentDisplay(result);
  a = result;
  b = undefined;
  operator = undefined;
  result = undefined;
});

elements.backspaceButton.addEventListener("click", () => {
  updateCurrentDisplay(elements.currentDisplay.textContent.slice(0, -1));
});

elements.clearEntryButton.addEventListener("click", () => {
  updateCurrentDisplay("");
  updateResultsDisplay("");
  a = undefined;
  b = undefined;
  operator = undefined;
  result = undefined;
});

elements.plusMinusButton.addEventListener("click", () => {
  const currentValue = elements.currentDisplay.textContent;
  if (currentValue === "") return;
  updateCurrentDisplay(Number(currentValue) * -1);
});
