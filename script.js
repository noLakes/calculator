const calcMain = document.getElementById("#calcMain");
const calcDisplay = document.querySelector("#calcDisplay");
const equationText = document.querySelector("#calcEquationText");
const shadowText = document.querySelector("#calcShadowText");

const calcButtons = document.querySelector("#calcButtons");
    const numButton = document.querySelectorAll(".numButton");
    const clearButton = document.querySelector("#clear");
    const decimalButton = document.querySelector("#decimal");
    const addButton = document.querySelector('#add');
    const subButton = document.querySelector('#subtract');
    const multiButton = document.querySelector("#multiply");
    const divButton = document.querySelector("#div");
    const equalsButton = document.querySelector("#equals");
    const deleteButton = document.querySelector("#delete");

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

function del() {
    if (ls.newNumbers.length > 0) {
        ls.newNumbers.pop();
    } else if (ls.equationBuild.length > 0 && isNaN(ls.equationBuild[ls.equationBuild.length -1])) {   
        ls.equationBuild.pop();
    } else if (ls.equationBuild.length > 0 && !isNaN(ls.equationBuild[ls.equationBuild.length -1])) {
        ls.equationBuild[ls.equationBuild.length-1] = Array.from(String(ls.equationBuild[ls.equationBuild.length -1]));
        ls.equationBuild[ls.equationBuild.length-1].length = ls.equationBuild[ls.equationBuild.length-1].length - 1;
        if (ls.equationBuild[ls.equationBuild.length-1].length == 0) {
            ls.equationBuild.length = ls.equationBuild.length -1;
        } else {
            ls.equationBuild[ls.equationBuild.length-1] = Number(ls.equationBuild[ls.equationBuild.length-1].join(''));
        }
    }
    equationTextContent.pop();
    if (equationTextContent[equationTextContent.length -1] == '.') {
        equationTextContent.pop();
    }
    updateDisplay();
    console.log(ls.equationBuild);
    console.log(equationTextContent);
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
    if (!(ls.newNumbers.includes('.'))) {
        decimalButton.disabled = false;
    }
}

function roundToTwo(num) {    
    return +(Math.round(num + "e+2")  + "e-2");
}

const mathOp = {
    '+': function() {
        return roundToTwo([...arguments].reduce((total, num) => total + num));
    },

    '-': function() {
        return roundToTwo([...arguments].reduce((total, num) => total - num));
    },

    '*': function() {
        return roundToTwo([...arguments].reduce((total, num) => total * num));
    },

    '/': function() {
        return roundToTwo([...arguments].reduce((total, num) => total / num));
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

    decimalButton.addEventListener('click', function() {
        addNum(this.textContent);
        this.disabled = true;
    });

    deleteButton.addEventListener('click', function() {
        del();
    });
    
    equalsButton.addEventListener('click', function() {
        equals();
    });
} 
eventListeners();

