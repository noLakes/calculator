const calcMain = document.getElementById("#calcMain");
const calcDisplay = document.querySelector("#calcDisplay");
const displayText = document.querySelector("#calcText");
const textContent = [];
const calcButtons = document.querySelector("#calcButtons");
const numButton = document.querySelectorAll(".numButton");
const clearButton = document.querySelector("#clear");

function populateDisplay(numbers) {
    textContent.push(numbers);
    updateCalcText(textContent);
}

function clearDisplay() {
    textContent.length = 0;
    updateCalcText(textContent);
}

function updateCalcText(text) {
    displayText.textContent = text.join('');
}

function add() {
    let num = [...arguments];
    return num.reduce((total, num) => total + num);
}
function subtract() {
    let num = [...arguments];
    return num.reduce((total, num) => total - num);
}
function multiply() {
    let num = [...arguments];
    return num.reduce((total, num) => total * num);
}
function divide() {
    let num = [...arguments];
    return num.reduce((total, num) => total / num);
}
function operate(operator, num1, num2) {
    return operator(num1, num2);
}
function eventListeners() {
    
    for  (i = 0; i < numButton.length; i++) {
        numButton[i].addEventListener('click', function() {
            populateDisplay(this.textContent);
        });
    };
    
    clearButton.addEventListener('click', function () {
        clearDisplay();
    });
} 
eventListeners();