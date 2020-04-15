const calcMain = document.getElementById("#calcMain");
const calcDisplay = document.querySelector("#calcDisplay");
const equationText = document.querySelector("#calcEquationText");
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
    const percentButton = document.querySelector("#percent");

const equationTextContent = [];
const logicStack = {
    equationBuild: [],
    newNumbers: [],
    lastIndex: function() {
        return ls.equationBuild[ls.equationBuild.length-1];
    },
};
const ls = logicStack;

function operate() {
    
    while (ls.equationBuild.includes('*') || ls.equationBuild.includes('/') || ls.equationBuild.includes('%')) {
        ls.equationBuild.forEach(function (item, pos) {
            if (item == '*') {
                ls.equationBuild.splice(pos-1, 3, mathOp['*'](ls.equationBuild[pos-1], ls.equationBuild[pos+1]));
                console.log(ls.equationBuild);
            }
            else if (item == '/') {
            ls.equationBuild.splice(pos-1, 3, mathOp['/'](ls.equationBuild[pos-1], ls.equationBuild[pos+1]));
            console.log(ls.equationBuild);
            }
            else if (item == '%') {
                ls.equationBuild.splice(pos-1, 3, mathOp['%'](ls.equationBuild[pos-1], ls.equationBuild[pos+1]));
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
    if (ls.equationBuild.includes("Infinity") || ls.equationBuild.includes("NaN")) {
        clearDisplay();
        equationTextContent.push('infinity!');
        updateDisplay();
    } else {
        equationTextContent.length = 0;
        equationTextContent.push(...ls.equationBuild.join(''));
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
    if (ls.equationBuild.length > 0 && typeof(ls.lastIndex()) == 'object') {
        ls.newNumbers.unshift(...ls.lastIndex());
        ls.equationBuild.length = ls.equationBuild.length -1;
    }
    if (ls.newNumbers.length > 0) {
        ls.equationBuild.push(ls.newNumbers.join(''));
    } 
    else if (ls.newNumbers.length == 0 && isOperator(ls.lastIndex())) { 
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
    if (ls.equationBuild.length > 0 && typeof(ls.lastIndex()) == 'object') {
        ls.newNumbers.unshift(...ls.lastIndex());
        ls.equationBuild.length = ls.equationBuild.length -1;
    }
    if (ls.newNumbers.length > 0) {
        ls.equationBuild.push((ls.newNumbers.join('')));
    }  
    ls.newNumbers.length = 0;
    buttonEnable();
    operate();
}

function del() {
    if (ls.newNumbers.length > 0) {
        ls.newNumbers.pop();
    } else if (ls.equationBuild.length > 0) {
        let x = ls.equationBuild.length -1;
        
        if (typeof(ls.equationBuild[x]) == 'object') {
            ls.equationBuild[x].pop();
        }
        else if (isNaN(ls.equationBuild[x])) {
            ls.equationBuild.pop();
        } else {
             ls.equationBuild[x] = Array.from(String(ls.equationBuild[x]));
             ls.equationBuild[x].pop();
             if (ls.equationBuild[x].length == 0) {
                 ls.equationBuild.length = ls.equationBuild.length -1;
             } else {
                ls.equationBuild[x].join('');
             }
        }
    }
    equationTextContent.pop();
    updateDisplay();
    buttonEnable();
    
    console.log(ls.equationBuild);
    console.log(equationTextContent);
}

function clearDisplay() {
    equationTextContent.length = 0;
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

function isOperator(test) {
    return (test == '+' || test == '-' || test == '/' || test == '*' || test == '%');
}

const mathOp = {
    '+': function() {
        return String(roundToTwo(this.stringHandler(...arguments).reduce((total, num) => total + num)));
    },

    '-': function() {
        return String(roundToTwo(this.stringHandler(...arguments).reduce((total, num) => total - num)));
    },

    '*': function() {
        return String(roundToTwo(this.stringHandler(...arguments).reduce((total, num) => total * num)));
    },

    '/': function() {
        return String(roundToTwo(this.stringHandler(...arguments).reduce((total, num) => total / num)));
    },

    '%': function(x, y) {
        let nums = this.stringHandler(x,y);
        return String(roundToTwo((x/100) * y));
    },

    stringHandler: function() {
        let x = [...arguments];
        return x.map(function(num) {
            if (typeof(num) == 'string') {
                return Number(num);
            } else {return num};
        })
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

    percentButton.addEventListener('click', function() {
        addOp(this.textContent);
    });
} 
eventListeners();

