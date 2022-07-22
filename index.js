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

//function to add two numbers
const add = (num1, num2) => {
  equation.operator = "waiting";
  equation.b = "";
  let sum = num1 + num2;
  equation.a = sum;
  return sum;
};
//function to subtract
const subtract = (num1, num2) => {
  equation.operator = "waiting";
  equation.b = "";
  let difference = num1 - num2;
  equation.a = difference;
  return difference;
};
//function to multiply
const multiply = (num1, num2) => {
  equation.operator = "waiting";
  equation.b = "";
  let product = num1 * num2;
  equation.a = product;
  return product;
};

//function to divide
const divide = (num1, num2) => {
  equation.operator = "waiting";
  equation.b = "";
  if (num2 != 0) {
    let quotient = num1 / num2;
    equation.a = quotient;
    return quotient;
  } else if (num2 === 0) {
    return "Cannot Divide by Zero";
  }
};

//function that operates on two numbers;
const operate = (num1, num2, operator) => {
  num1 = parseInt(num1);
  num2 = parseInt(num2);
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

display.textContent = "Good Luck";

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
    if (!Number.isFinite(parseFloat(value)) && value != "equals") {
      //checking if value is an opperator
      equation.operator = value;
      console.log(value);
    } else if (value === "equals") {
      //checking if value is the equals button
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
      console.log(value);
    } else if (Number.isFinite(parseFloat(value))) {
      //checking if the button was a number
      if (equation.operator === null) {
        equation.a = equation.a + value;
      } else {
        equation.b = equation.b + value;
      }
      display.textContent = equation.a + " " + equation.b;
    }
  });
});
