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
        case '×':
            return multiply(a, b);
        case '÷':
            return devide(a, b);
    }
}

function clear() {
    display.textContent = '0';
    display.style.fontSize = '60px';
    temp = '';
    firstValue = '';
    secondValue = '';
    operator = '';
    decimalBtnPressed = false;
}

function deleteKey() {
    if(firstValue && secondValue 
        && temp && operator) {
            
        }
    temp = temp.slice(0, -1);
    display.textContent = temp;
}

function checkLength() {
    if (display.textContent.length < 8) {
        display.style.fontSize = '60px';
    } else if (display.textContent.length == 8) {
        display.style.fontSize = '52px';
    } else if (display.textContent.length > 8) {
        display.style.fontSize = '48px';
    }
}

function clickNumButton(e) {
    if (temp.length == 9) return;
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
    checkLength();
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
    let result = operate(operator, Number(firstValue), Number(secondValue));
    if (result % 1 !== 0) {
        result = parseFloat(result.toFixed(7));
    } else if (Number(result).toString().length > 7) {
        result = Number(result).toExponential(3);
    } 
    display.textContent = result;
    checkLength();
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

const clearBtn = document.querySelector("#clearBtn");
clearBtn.addEventListener('click', clear);

// const delBtn = document.querySelector("#delBtn");
// delBtn.addEventListener('click', deleteKey);
