const icon = document.getElementById("icon"); //moon and sun icon on bottom right
const content = document.querySelector(".content"); //the div that contains the entire calculator
const buttons = document.querySelectorAll(".calButton"); //a NodeList for all the buttons
const display = document.querySelector(".display"); //the output screen
//initiallizing an object to hold the numbers and operator
const equation = {
  a: "",
  b: "",
  operator: null,
};

const displayOut = () => {
  if (equation.operator === null) {
    display.textContent = equation.a;
  } else {
    if (equation.operator === "multiply") {
      symbol = "X";
    } else if (equation.operator === "divide") {
      symbol = "\u00f7";
    } else if (equation.operator === "add") {
      symbol = "+";
    } else if (equation.operator === "subtract") {
      symbol = "-";
    }
    display.textContent = equation.a + " " + symbol + " " + equation.b;
  }
};

//function to add two numbers
const add = (num1, num2) => {
  equation.b = "";
  let sum = num1 + num2;
  sum = sum.toFixed(4);
  sum = parseFloat(sum);
  equation.a = sum;
  return sum;
};

//function to subtract
const subtract = (num1, num2) => {
  equation.b = "";
  let difference = num1 - num2;
  difference = difference.toFixed(4);
  difference = parseFloat(difference);
  equation.a = difference;
  return difference;
};
//function to multiply
const multiply = (num1, num2) => {
  equation.b = "";
  let product = num1 * num2;
  product = product.toFixed(4);
  product = parseFloat(product);
  equation.a = product;
  return product;
};

//function to divide
const divide = (num1, num2) => {
  equation.b = "";
  if (num2 != 0) {
    let quotient = num1 / num2;
    quotient = quotient.toFixed(4);
    quotient = parseFloat(quotient);
    equation.a = quotient;
    return quotient;
  } else if (num2 === 0) {
    return "Cannot Divide by Zero";
  }
};

//adds a function to turn a number into a percentage of 100
const percentage = () => {
  if (equation.b === "") {
    equation.a = parseFloat((parseFloat(equation.a) / 100).toFixed(4));
  } else {
    equation.b = parseFloat((parseFloat(equation.b) / 100).toFixed(4));
  }
  displayOut();
};

//adds a negative to the number its on
const toggleNegative = () => {
  if (equation.a != "") {
    if (equation.b === "") {
      equation.a = parseFloat(equation.a) * -1;
    } else {
      equation.b = parseFloat(equation.b) * -1;
    }
  }
  displayOut();
};

//fucntion to clear
const clear = () => {
  equation.a = "";
  equation.b = "";
  equation.operator = null;
  display.textContent = "clear";
};

//function that operates on two numbers;
const operate = (num1, num2, operator) => {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  switch (operator) {
    case "add":
      return add(num1, num2);
    case "subtract":
      return subtract(num1, num2);
    case "divide":
      return divide(num1, num2);
    case "multiply":
      return multiply(num1, num2);
    default:
      console.log("not yet");
      break;
  }
};

icon.addEventListener("click", () => {
  //This is the toggle between light and dark themes
  content.classList.toggle("darkTheme");
  //This switches the icon of sun to moon and visa versa
  if (content.classList.contains("darkTheme")) {
    icon.src = "./images/moon-icon.png";
  } else {
    icon.src = "./images/sun-icon.png";
  }
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    let value = button.getAttribute("value");
    switch (value) {
      //for the values who are operators
      case "multiply":
      case "divide":
      case "add":
      case "subtract":
        if (equation.b === "") {
          equation.operator = value;
        } else {
          operate(equation.a, equation.b, equation.operator);
          equation.operator = value;
        }
        displayOut();
        break;
      case "decimal":
        if (equation.operator === null) {
          if (parseFloat(equation.a) % 1 === 0 && !equation.a.includes(".")) {
            equation.a = equation.a + ".";
          } else if (equation.a === "") {
            equation.a = "0.";
          }
        } else {
          if (parseFloat(equation.b) % 1 === 0 && !equation.b.includes(".")) {
            equation.b = equation.b + ".";
          } else if (equation.b === "") {
            equation.b = "0.";
          }
        }
        displayOut();
        break;
      case "ac":
        clear();
        break;
      case "toggleNegative":
        toggleNegative();
        break;
      case "equals":
        if (equation.operator === null) {
          display.textContent = "Need a sign";
        } else if (equation.b === "" || equation.a === "") {
          display.textContent = "Need a number";
        } else {
          display.textContent = operate(
            equation.a,
            equation.b,
            equation.operator
          );
        }
        break;
      case "percent":
        percentage();
        break;
      default:
        if (equation.operator === null) {
          equation.a = equation.a + value;
        } else {
          equation.b = equation.b + value;
        }
        displayOut();
    }
  });
});
