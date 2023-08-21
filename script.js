// Le Grand Calculator App
// By Soren Jorgensen, August 2023
// -- Calculatur app task for AdBlock
//--------------------------------------------

window.onload = () => {
  // Listen for button clicks
  const buttons = document.querySelectorAll('[type="button"]');
  let result = document.getElementById("result");
  let preResult = document.getElementById("preResult");
  const allowedKeys = [
    "0",
    "00",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "+",
    "-",
    "*",
    "**",
    "/",
    "ce",
    "c",
    "eval",
    "Enter",
    "Backspace",
    "Delete",
  ];

  // Listen for clicks on the buttons
  if (buttons) {
    buttons.forEach((e) => {
      e.addEventListener("click", (event) => {
        const buttonValue = event.target.value;
        if (allowedKeys.includes(buttonValue)) {
          addToCalculation(buttonValue);
        }
      });
    });
  }

  // Listen for keyboard clicks
  document.addEventListener("keydown", function (e) {
    e.preventDefault();

    // We only care about numbers and +-*/ and enter and dot
    if (allowedKeys.includes(e.key)) {
      let keyPressed = e.key;
      if (keyPressed === "Enter") {
        keyPressed = "eval";
      }
      if (keyPressed === "Backspace") {
        keyPressed = "c";
      }
      if (keyPressed === "Delete") {
        keyPressed = "ce";
      }
      addToCalculation(keyPressed);
    }
  });

  // Take in values and do math
  function addToCalculation(buttonValue) {
    if (parseInt(buttonValue) || parseInt(buttonValue) === 0) {
      if (result.value == 0) {
        result.value = "";
      }
      //toLocaleString()
      result.value += buttonValue;
      try {
        preResult.innerHTML = Function(
          "return " + result.value.toLocaleString()
        )();
      } catch (error) {}
    } else {
      switch (buttonValue) {
        case "c": // clear one
          if (preResult.innerHTML) {
            try {
              preResult.innerHTML = Function("return " + result.value)();
            } catch (error) {}
          }
          if (result.value.length > 1) {
            result.value = result.value.slice(0, -1);
          } else {
            result.value = 0;
            preResult.innerHTML = "";
          }

          break;
        case "ce": // clear everything
          result.value = 0;
          preResult.innerHTML = "";
          break;
        case "+":
        case "-":
        case "/":
        case "*":
        case ".":
          // Check if the previous character was an operator, as it cannot be.
          result.value = preResult.innerHTML;
          if (
            parseInt(result.value.substring(result.value.length - 1)) ||
            result.value.substring(result.value.length - 1) === "0"
          ) {
            result.value = result.value + buttonValue;
          } else {
            // If it was, replace with newly selected operator
            result.value = result.value.slice(0, -1) + buttonValue;
          }

          break;
        case "**": // Exponentiation
          try {
            result.value = result.value ** 2;
            preResult.innerHTML = Function("return " + result.value)();
          } catch (error) {}

          break;
        case "eval":
          try {
            result.value = Function("return " + result.value)();
          } catch (error) {}

          break;
      }
    }
  }
};
