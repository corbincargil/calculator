//                          ~~Variable Declarations~~
let result;
let operator;
let currentDisplayContent;
let lastElement;

//                          ~~To-Do~~  
// - Fix bug where if you input a num & operator, you can't select a diff operator
// - Add decimal button
// - Add backspace button
// - Add keyboard functionality
// - Display what is stored in memory (what the prev calc was)

//                          ~~Functions~~

//Addition
const getSum = function(num1,num2){return num1 + num2;}
//Subtraction
const getDifference = function(num1,num2){return num1 - num2;}
//Multiply
const getProduct = function(num1,num2){return num1 * num2;}
//Divide
const getQuotient = function(num1,num2){return num1 / num2;}
//Calculate function
const calculate = function(operator,num1,num2){
    switch (operator) {
        case '+':
            result = parseFloat(getSum(num1,num2));
            break;
        case '-':
            result = parseFloat(getDifference(num1,num2));
            break;
        case '*':
            result = parseFloat(getProduct(num1,num2));
            break;
        case '/':
            result = parseFloat(getQuotient(num1,num2));
            break;
        default:
            console.log('An error occurred.');
    operator = '';
    return result;
    }
}
//getNumOne function 
const getNumOne = function() {
    num1 = displayContainer.textContent;
    num1 = parseFloat(num1);
    return num1;
}
//updateOperator function
const updateOperator = function(operatorSelected) {
    displayContainer.textContent += ` ${operatorSelected} `;
    operator = operatorSelected;
}
//getNumTwo function
const getNumTwo = function(currentInputs) {
    const operatorIndex = currentInputs.indexOf(operator);
    let sliceStart = operatorIndex+2;
    let sliceEnd = currentInputs.length;
    num2 = currentInputs.slice(sliceStart,sliceEnd);
    num2 = num2.join().trim().replace(/[^0-9]/g,"");
    num2 = parseFloat(num2);
    return num2;
}
//eraseMemory function
const eraseMem = function() {
    num1 = '';
    operator = '';
    num2 = '';
}
//updateDisplay function
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
        case "-":
        case "*":
        case "/":

            if (operator) {
                currentDisplayContent = Array.from(displayContainer.textContent);
                lastElement = currentDisplayContent[currentDisplayContent.length - 2];
                switch (lastElement) {
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                        displayContainer.textContent = num1;
                        eraseMem();
                        getNumOne();
                        updateOperator(buttonValue);
                        break;
                
                    default:
                        currentDisplayContent = Array.from(displayContainer.textContent);
                        getNumTwo(currentDisplayContent);
                        calculate(operator,num1,num2);
                        displayContainer.textContent = result;
                        getNumOne();
                        updateOperator(buttonValue);
                        break;
                }
            } else {
                getNumOne();
                updateOperator(buttonValue);
            }
            break;
        case "ENTER":
            currentDisplayContent = Array.from(displayContainer.textContent);
            //if no operator, keep numbers in display somehow
            getNumTwo(currentDisplayContent);
            calculate(operator,num1,num2);
            displayContainer.textContent = result;
            eraseMem();
            getNumOne();
            break;
        case "CLEAR":
            displayContainer.textContent = '';
            eraseMem();
            break;
        default:
            displayContainer.textContent = 'ERROR';
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