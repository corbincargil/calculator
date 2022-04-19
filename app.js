//                          ~~Variable Declarations~~
let result;
let operator;
let currentDisplayString;
let currentDisplayContent;
let newDisplayContent;
let lastElement;

//                          ~~To-Do~~  
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
//updateOperator function
const updateOperator = function(operatorSelected) {
    displayContainer.textContent += ` ${operatorSelected} `;
    operator = operatorSelected;
}
//operatorEvaluation function
const operatorEval = function(operatorID) {
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
                updateOperator(operatorID);
                break;
            default:
                currentDisplayContent = Array.from(displayContainer.textContent);
                getNumTwo(currentDisplayContent);
                calculate(operator,num1,num2);
                displayContainer.textContent = result;
                getNumOne();
                updateOperator(operatorID);
                break;
        }
    } else {
        getNumOne();
        updateOperator(operatorID);
    }
}
//eraseMemory function
const eraseMem = function() {
    num1 = '';
    operator = '';
    num2 = '';
}
//backspace function
const backspace = function() {
    currentDisplayString = displayContainer.textContent.toString();
    currentDisplayContent = Array.from(displayContainer.textContent);
    if (!result) {displayContainer.textContent = ''
    } else if (currentDisplayString == result.toString()) {
        eraseMem();
        displayContainer.textContent = '';
    } else {
        currentDisplayContent.pop()
        newDisplayContent = currentDisplayContent.toString();
        displayContainer.textContent = newDisplayContent.replace(/[,]/g,"");
    }
}
//decimalEvaluation function
const decimalEval = function () {
    const decimalContent = displayContainer.textContent;
    const decimalContentString = decimalContent.toString();
    const arrayDecimalContent = Array.from(decimalContentString);
    if (operator) {
        let i = 0;
        let decimalOperatorIndex = arrayDecimalContent.indexOf(operator);
        const numTwo = arrayDecimalContent.slice(decimalOperatorIndex);
        numTwo.forEach(element => {
            if (element =='.') { i+=1}
            if (i > 1) {
                displayContainer.textContent = 'ERROR';
                alert("You can only have one decimal in each value");
            }
        });
    } else if (arrayDecimalContent.includes('.')) {
        const indexOfFirstDecimal = arrayDecimalContent.indexOf('.');
        if (arrayDecimalContent.includes('.',indexOfFirstDecimal+1)) {
            displayContainer.textContent = 'ERROR';
            alert("You can only have one decimal in each value");
        }
    }
}
//updateDisplay function
const updateDisplay = function(button){
    const buttonValue = button.target.value;
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
        case ".":
            displayContainer.textContent += buttonValue;
            break;
        case "backspace":
            backspace();
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            operatorEval(buttonValue);
            break;
        case "ENTER":
            currentDisplayContent = Array.from(displayContainer.textContent);
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

const decimalButton = document.getElementById("decimal-button");
decimalButton.addEventListener("click", decimalEval)