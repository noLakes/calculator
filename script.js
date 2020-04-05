const calculatorMain = document.querySelector("#calculatorMain");
const calculatorDisplay = document.querySelector("#calculatorDisplay");
const calculatorButtons = document.querySelector("#calculatorButtons");



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
