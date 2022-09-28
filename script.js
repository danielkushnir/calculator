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
    decimalBtnPressed = false;
}

function clickNumButton(e) {
    const btnNum = e.target.textContent;
    if (firstValue && secondValue 
        && temp && operator 
        && (!temp.includes('.'))) {
        clear();
    }
    if (display.textContent == 0 && btnNum == 0) {
        display.textContent = '0';
        return;
    }
    temp += btnNum;
    display.textContent = temp;
    consoleLogValues();
}

function clickOperatorBtn(e) {
    if (firstValue && temp && operator && !secondValue) {
        clickEqualBtn();
    }
    operator = e.target.textContent;
    if (!firstValue || (Math.abs(temp - firstValue) < 1)) {
        firstValue = temp;
    }
    temp = '';
    secondValue = '';
    decimalBtnPressed = false;
    consoleLogValues();
}

function clickEqualBtn() {
    decimalBtnPressed = false;
    secondValue = temp;
    let result = operate(operator, firstValue*1, secondValue*1);
    if ((result % 1).toString().length > 7) {
        result = result.toFixed(7);
    }
    display.textContent = result;
    firstValue = display.textContent;
    if (firstValue.includes('.')) {
        decimalBtnPressed = true;
    }
    consoleLogValues();
}

function clickDecimalBtn() {
    if (!decimalBtnPressed) {
        if (firstValue && secondValue && temp && operator) {
            temp = firstValue;
        }
        display.textContent += '.';
        temp += '.';
        decimalBtnPressed = true;
        consoleLogValues();
    }
}

function consoleLogValues() {
    console.log(`firstValue: ${firstValue}`);
    console.log(`secondValue: ${secondValue}`);
    console.log(`temp: ${temp}`);
    console.log(`operator: ${operator}`);
    console.log(`decimalBtnPressed: ${decimalBtnPressed}`);
    console.log('');
}

let temp = '';
let firstValue = '';
let secondValue = '';
let operator = '';
let decimalBtnPressed = false;


const display = document.querySelector('#display');
const numBtns = document.querySelectorAll('.numBtns');
numBtns.forEach(btn => btn.addEventListener('click', clickNumButton))

const decimalBtn = document.querySelector('#decimalBtn');
decimalBtn.addEventListener('click', clickDecimalBtn);

const operatorBtns = document.querySelectorAll(".operatorBtns");
operatorBtns.forEach(btn => btn.addEventListener('click', clickOperatorBtn));

const equalBtn = document.querySelector('#equalBtn');
equalBtn.addEventListener('click', clickEqualBtn);
