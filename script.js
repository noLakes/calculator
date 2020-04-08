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

const args = [];

let currentOperator = undefined;

function addArgs(num) {
    if (args.length == 1) {
        args[1] = num;
        operate(currentOperator);
        
    } else {
        args[0] = num;
    }
}

function clearArgs() {
    args.length = 0;
}

function populateDisplay(numbers) {
    textContent.push(numbers);
    updateDisplay();
}

function clearDisplay() {
    textContent.length = 0;
    updateDisplay();
    if (args.length > 0){
        clearArgs();
    }
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
function operate(operator) {
    let result = operator(Number(args[0]), Number(args[1]));
    clearArgs();
    clearDisplay();
    addArgs(result);
    populateDisplay(result);

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
        currentOperator = add;
        addArgs(textContent.join(''));
        textContent.length = 0;
    });

    subButton.addEventListener('click', function() {
        currentOperator = sub;
        addArgs(textContent.join(''));
        textContent.length = 0;
    });

    multiButton.addEventListener('click', function() {
        currentOperator = mult;
        addArgs(textContent.join(''));
        textContent.length = 0;
    });

    divButton.addEventListener('click', function() {
        currentOperator = div;
        addArgs(textContent.join(''));
        textContent.length = 0;
    });
    
    equalsButton.addEventListener('click', function() {
        addArgs(textContent.join(''));
        textContent.length = 0;
    })
} 
eventListeners();

