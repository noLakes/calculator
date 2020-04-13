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
    
    while (ls.equationBuild.includes('*') || ls.equationBuild.includes('/')) {
        ls.equationBuild.forEach(function (item, pos) {
            if (item == '*') {
                ls.equationBuild.splice(pos-1, 3, mathOp['*'](ls.equationBuild[pos-1], ls.equationBuild[pos+1]));
                console.log(ls.equationBuild);
            }
            else if (item == '/') {
            ls.equationBuild.splice(pos-1, 3, mathOp['/'](ls.equationBuild[pos-1], ls.equationBuild[pos+1]));
            console.log(ls.equationBuild);
            }
        });
    }
    while (ls.equationBuild.includes('+') || ls.equationBuild.includes('-')) {
        ls.equationBuild.forEach(function (item, pos) {
            if (item == '+') {
                ls.equationBuild.splice(pos-1, 3, mathOp['+'](ls.equationBuild[pos-1], ls.equationBuild[pos+1]));
                console.log(ls.equationBuild);
            }
            else if (item == '-') {
            ls.equationBuild.splice(pos-1, 3, mathOp['-'](ls.equationBuild[pos-1], ls.equationBuild[pos+1]));
            console.log(ls.equationBuild);
            }
        });
    }
    if (ls.equationBuild.includes(Infinity)) {
        clearDisplay();
        equationTextContent.push('err: div by 0');
        updateDisplay();
    } else {
        equationTextContent.length = 0;
        equationTextContent.push(ls.equationBuild.join(''));
        updateDisplay();
    }
    
}

function addNum(num) {
    ls.newNumbers.push(num);
    equationTextContent.push(num);
    buttonEnable();
    updateDisplay();
}

function addOp(op) {
    if (ls.newNumbers.length > 0) {
        ls.equationBuild.push(Number(ls.newNumbers.join('')));
    } 
    else if (ls.newNumbers.length == 0 && op == '-') { 
        ls.newNumbers.push(op);
        equationTextContent.push(op);
        updateDisplay();
        if (divButton.disabled == true || addButton.disabled == true || multiButton.disabled == true) {
            subButton.disabled = true;
        }
        return;
    }
    buttonDisable();
    ls.newNumbers.length = 0;
    ls.equationBuild.push(op);
    equationTextContent.push(op);
    updateDisplay();
}

function equals() {
    if (ls.newNumbers.length > 0) {
        ls.equationBuild.push(Number(ls.newNumbers.join('')));
    }  
    ls.newNumbers.length = 0;
    buttonEnable();
    operate();
}

function clearDisplay() {
    equationTextContent.length = 0;
    ls.result.length = 0;
    ls.equationBuild.length = 0;
    ls.newNumbers.length = 0;
    buttonEnable();
    updateDisplay();
}

function updateDisplay() {
    equationText.textContent = equationTextContent.join('');
}

function buttonDisable() {
    divButton.disabled = true;
    multiButton.disabled = true;
    addButton.disabled = true;    
}
function buttonEnable() {
    divButton.disabled = false;
    multiButton.disabled = false;
    addButton.disabled = false;    
    subButton.disabled = false;
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
        equals();
    });
} 
eventListeners();

