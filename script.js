function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function devide(a, b) {
    if (b == 0) return "E";
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case 'x':
            return multiply(a, b);
        case '÷':
            return devide(a, b);
    }
}

function clear() {
    display.textContent = '';
    temp = '';
    firstValue = '';
    secondValue = '';
    operator = '';
}

function clickNumButton(e) {
    if (firstValue && secondValue && temp && operator) {
        clear();
    }
    
    const btnNum = e.target.textContent;
    temp += btnNum;
    display.textContent = temp;
    consoleLogValues();
}

function clickOperatorBtn(e) {
    secondValue = '';
    operator = e.target.textContent;
    if (!firstValue) {
        firstValue = temp;
    }
    temp = '';
    consoleLogValues();
}

function clickEqualBtn() {
    secondValue = temp;
    display.textContent = operate(operator, firstValue*1, secondValue*1);
    firstValue = display.textContent;
    consoleLogValues();
}

function consoleLogValues() {
    console.log(`firstValue: ${firstValue}`);
    console.log(`secondValue: ${secondValue}`);
    console.log(`temp: ${temp}`);
    console.log(`operator: ${operator}`);
}

let temp = '';
let firstValue = '';
let secondValue = '';
let operator = '';

const display = document.querySelector('#display');
const numBtns = document.querySelectorAll('.numBtns');
numBtns.forEach(btn => btn.addEventListener('click', clickNumButton))

const operatorBtns = document.querySelectorAll(".operatorBtns");
operatorBtns.forEach(btn => btn.addEventListener('click', clickOperatorBtn));

const equalBtn = document.querySelector('#equalBtn');
equalBtn.addEventListener('click', clickEqualBtn)