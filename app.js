//                          ~~Variable Declarations~~
let result;
let operator;

//TODO: 
// - Allow users to be able to type in multiple calculations. i.e. 10+2+3 !== 33. 
// - Add decimal button
// - Add backspace button
// - Add keyboard functionality

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
const calculate = function(operator,num1,num2){
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
    return result;
    }
}
// getNumTwo
const getNumTwo = function(currentInputs) {
    const operatorIndex = currentInputs.indexOf(operator);
    let sliceStart = operatorIndex+2;
    let sliceEnd = currentInputs.length;
    num2 = currentInputs.slice(sliceStart,sliceEnd);
    num2 = num2.join().trim().replace(/[^0-9]/g,"");
    num2 = parseFloat(num2);
    return num2;
}

const updateDisplay = function(button){
    const buttonValue = button.target.textContent;
    switch (buttonValue) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            displayContainer.textContent += buttonValue;
            break;
        case "+":
            num1 = displayContainer.textContent;
            num1 = parseFloat(num1);
            if (operator) {

            }
            displayContainer.textContent += ' + ';
            operator = '+';
            break;
        case "-":
            num1 = displayContainer.textContent;
            num1 = parseFloat(num1);
            displayContainer.textContent += ' - ';
            operator = '-';
            break;
        case "*":
            num1 = displayContainer.textContent;
            num1 = parseFloat(num1);
            displayContainer.textContent += ' * ';
            operator = '*';
            break;
        case "/":
            num1 = displayContainer.textContent;
            num1 = parseFloat(num1);
            displayContainer.textContent += ' / ';
            operator = '/';
            break;
        case "ENTER":
            const currentDisplayContent = Array.from(displayContainer.textContent);
            //if no operator, keep numbers in display somehow
            getNumTwo(currentDisplayContent);
            calculate(operator,num1,num2);
            displayContainer.textContent = result;
            break;
        case "CLEAR":
            displayContainer.textContent = '';
            break;
        default:
            console.log('An error occurred.');
            break;
    }
}

//                          ~~DOM Manipulation~~

//Numbers & Controls Buttons
const mainContainer = document.getElementById('main-container');
const displayContainer = document.getElementById('display-container');
const allButtons = mainContainer.querySelectorAll('button');
allButtons.forEach((button) => {
    button.addEventListener("click",updateDisplay);
})