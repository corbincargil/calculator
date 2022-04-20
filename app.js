//                          ~~Variable Declarations~~
let result;
let operator;
let currentDisplayString;
let currentDisplayContent;
let newDisplayContent;
let lastElement;

const mainContainer = document.getElementById('main-container');
const displayContainer = document.getElementById('display-container');
const allButtons = mainContainer.querySelectorAll('button');
const decimalButton = document.getElementById("decimal-button");

//                          ~~To-Do~~  
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
    num2 = num2.join().trim().replace(/[,]/g,"");
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
    result = '0';
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
//checkDisplay function
const checkDisplay = function() {
    currentDisplayContent = Array.from(displayContainer.textContent);
    if (currentDisplayContent.length > 11) {
        currentDisplayContent.pop()
        currentDisplayContent = currentDisplayContent.join().trim().replace(/[,]/g,"");
        displayContainer.textContent = currentDisplayContent;
    }
}
//updateDisplay function
const updateDisplay = function(input){
    switch (input) {
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
            displayContainer.textContent += input;
            break;
        case ".":
            displayContainer.textContent += input;
            decimalEval();
            break;
        case "Backspace":
            backspace();
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            operatorEval(input);
            break;
        case "Enter":
            currentDisplayContent = Array.from(displayContainer.textContent);
            getNumTwo(currentDisplayContent);
            calculate(operator,num1,num2);
            displayContainer.textContent = result;
            eraseMem();
            getNumOne();
            break;
        case "Delete":
            displayContainer.textContent = '';
            eraseMem();
            break;
        case "Shift":
            break;
        default:
            displayContainer.textContent = 'ERROR';
            break;
    }
    checkDisplay();
}
//convertKeyboardInput function
const convertKeyboardInput = function(event) {
    const keyPressed = event.key;
    updateDisplay(keyPressed);
}

//                          ~~DOM Manipulation~~

//Event listeners for keyboard and buttons
allButtons.forEach((button) => {
    button.addEventListener("click",(buttonValue) => {
        buttonValue = button.value;
        updateDisplay(buttonValue);
    });
})
document.addEventListener("keydown",convertKeyboardInput);