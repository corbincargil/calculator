//                          ~~Variable Declarations~~
let result;



//                          ~~Functions~~

//Addition
const getSum = function(num1,num2){return num1 + num2;}
//Subtraction
const getDifference = function(num1,num2){return num1 - num2;}
//Multiply
const getProduct = function(num1,num2){return num1 * num2;}
//Divide
const getQuotient = function(num1,num2){return num1 / num2;}
//Operate function
const operate = function(operator,num1,num2){
    switch (operator) {
        case '+':
            result = getSum(num1,num2);
            break;
        case '-':
            result = getDifference(num1,num2);
            break;
        case '*':
            result = getProduct(num1,num2);
            break;
        case '/':
            result = getQuotient(num1,num2);
            break;
        default:
            console.log('An error occurred.');
        
    }
}

const updateDisplay = function(button){
    const buttonValue = button.target.textContent;
    switch (buttonValue) {
        case "1":
            displayContainer.textContent += '1';
            break;
        case "2":
            displayContainer.textContent += '2';
            break;
        case "3":
            displayContainer.textContent += '3';
            break;
        case "4":
            displayContainer.textContent += '4';
            break;
        case "5":
            displayContainer.textContent += '5';
            break;
        case "6":
            displayContainer.textContent += '6';
            break;
        case "7":
            displayContainer.textContent += '7';
            break;
        case "8":
            displayContainer.textContent += '8';
            break;
        case "9":
            displayContainer.textContent += '9';
            break;
        case "0":
            displayContainer.textContent += '0';
            break;
        case "+":
            displayContainer.textContent += ' + ';
            operator = '+';
            break;
        case "-":
            displayContainer.textContent += ' - ';
            break;
        case "*":
            displayContainer.textContent += ' * ';
            break;
        case "/":
            displayContainer.textContent += ' / ';
            break;
        case "ENTER":
            displayContainer.textContent = 'You pressed enter';
            break;
        case "CLEAR":
            displayContainer.textContent = '';
            break;
        default:
            console.log('An error occurred.');
            break;
    }
}

const testFunction = () => {
    console.log('this is a test');
}

//                          ~~DOM Manipulation~~

//Numbers & Controls Buttons
const mainContainer = document.getElementById('main-container');
const displayContainer = document.getElementById('display-container');
const allButtons = mainContainer.querySelectorAll('button');
allButtons.forEach((button) => {
    button.addEventListener("click",updateDisplay);
})