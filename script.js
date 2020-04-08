const calcMain = document.getElementById("#calcMain");
const calcDisplay = document.querySelector("#calcDisplay");
const equationText = document.querySelector("#calcEquationText");
const shadowText = document.querySelector("#calcShadowText");

const calcButtons = document.querySelector("#calcButtons");
    const numButton = document.querySelectorAll(".numButton");
    const clearButton = document.querySelector("#clear");
    const addButton = document.querySelector('#add');
    const subButton = document.querySelector('#subtract');
    const multiButton = document.querySelector("#multiply");
    const divButton = document.querySelector("#div");
    const equalsButton = document.querySelector("#equals");

const equationTextContent = [];
const shadowTextContent = [];

const logicStack = {
    result: [],
    equation: [],

};

function populateDisplay(text) {
    equationTextContent.push(text);
    logicStack.equation.push(text);
    updateDisplay();
}

function clearDisplay() {
    equationTextContent.length = 0;
    logicStack.equation.length = 0;
    updateDisplay();
}

function updateDisplay() {
    equationText.textContent = equationTextContent.join('');
    shadowText.textContent = shadowTextContent.join('');
}

function add() {
    return [...arguments].reduce((total, num) => total + num);
}
function sub() {
    return [...arguments].reduce((total, num) => total - num);
}
function mult() {
    return [...arguments].reduce((total, num) => total * num);
}
function div() {
    return [...arguments].reduce((total, num) => total / num);
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

    addButton.addEventListener('click', function() {

    });

    subButton.addEventListener('click', function() {

    });

    multiButton.addEventListener('click', function() {

    });

    divButton.addEventListener('click', function() {

    });
    
    equalsButton.addEventListener('click', function() {

    });
} 
eventListeners();

