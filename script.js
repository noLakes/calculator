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
    equationFull: [],
    equationBuild: [],
    newNumbers: [],
};
const ls = logicStack;

function operate() {

    }
    
function addNum(num) {
    //addnum code
    updateDisplay();
}

function addOp(op) {
//addOp code
    updateDisplay();
}

function clearDisplay() {
//clearDisplay code
    updateDisplay();
}

function updateDisplay() {
    equationText.textContent = equationTextContent.join('');
}

const mathOp = {
    '+': function() {
        return [...arguments].reduce((total, num) => total + num);
    },

    '-': function() {
        return [...arguments].reduce((total, num) => total - num);
    },

    '*': function() {
        return [...arguments].reduce((total, num) => total * num);
    },

    '/': function() {
        return [...arguments].reduce((total, num) => total / num);
    },
}

function eventListeners() {
    
    for  (i = 0; i < numButton.length; i++) {
        numButton[i].addEventListener('click', function() {
            addNum(this.textContent);
        });
    };
    
    clearButton.addEventListener('click', function () {
        clearDisplay();
    });

    addButton.addEventListener('click', function() {
        addOp(this.textContent);
    });

    subButton.addEventListener('click', function() {
        addOp(this.textContent);
    });

    multiButton.addEventListener('click', function() {
        addOp(this.textContent);
    });

    divButton.addEventListener('click', function() {
        addOp(this.textContent);
    });
    
    equalsButton.addEventListener('click', function() {

    });
} 
eventListeners();

