const calcMain = document.getElementById("#calcMain");
const calcDisplay = document.querySelector("#calcDisplay");
const displayText = document.querySelector("#calcText");

const calcButtons = document.querySelector("#calcButtons");
    const numButton = document.querySelectorAll(".numButton");
    const clearButton = document.querySelector("#clear");
    const addButton = document.querySelector('#add');
    const subButton = document.querySelector('#subtract');
    const multiButton = document.querySelector("#multiply");
    const divButton = document.querySelector("#div");
    const equalsButton = document.querySelector("#equals");

const textContent = [];

function populateDisplay(numbers) {
    textContent.push(numbers);
    updateDisplay();
}

function clearDisplay() {
    textContent.length = 0;
    updateDisplay();
}

function updateDisplay() {
    displayText.textContent = textContent.join('');
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

}
function eventListeners() {
    
    for  (i = 0; i < numButton.length; i++) {
        numButton[i].addEventListener('click', function() {
            
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

