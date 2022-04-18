//                          ~~Variable Declarations~~
let result;
let operator;



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
    return result;
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
            num1 = displayContainer.textContent;
            num1 = parseFloat(num1);
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
            const operatorIndex = currentDisplayContent.indexOf(operator);
            let sliceStart = operatorIndex+2;
            let sliceEnd = currentDisplayContent.length;
            num2 = currentDisplayContent.slice(sliceStart,sliceEnd);
            num2 = num2.join().trim().replace(/[^0-9]/g,"");
            num2 = parseFloat(num2);
            //if no operator, keep numbers in display somehow

            operate(operator,num1,num2);
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