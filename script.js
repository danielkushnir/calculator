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
    operatorBtns.forEach(btn => btn.classList.remove('pressedOperatorBtn'));
    if (firstValue && !secondValue && temp && operator) {
        display.textContent = '0';
        temp = '0';
        clearBtn.textContent = 'AC';
        operatorBtns.forEach(btn => {
            if (btn.textContent == operator) {
                btn.classList.add('pressedOperatorBtn');
            }
        });
        return;
    }
    display.textContent = '0';
    clearBtn.textContent = 'AC';
    display.style.fontSize = '65px';
    temp = '0';
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

function checkLength(str) {
    strNew = str.replace(/[.,\s]/g, '');
    if (strNew.length < 7) {
        display.style.fontSize = '65px';
    } else if (strNew.length == 7) {
        display.style.fontSize = '58px';
    } else if (strNew.length == 8) {
        display.style.fontSize = '50px';
    } else if (strNew.length > 8) {
        display.style.fontSize = '45px';
    }
}

function clickNumButton(e) {
    operatorBtns.forEach(btn => btn.classList.remove('pressedOperatorBtn'));
    if (temp.length == 9) return;
    const btnNum = e.target.textContent;
    if (firstValue && secondValue 
        && temp && operator 
        && (!temp.includes('.'))) {
        clear();
    }
    if (display.textContent == 0 && btnNum == 0 && !decimalBtnPressed) {
        display.textContent = '0';
        return;
    }
    temp += btnNum;
    if (temp != 0 && temp[0] == 0 && temp[1] != '.') {
        temp = temp.slice(1);
    }
    display.textContent = Number(temp).toLocaleString("en-US");
    clearBtn.textContent = 'C';
    checkLength(temp);
}

function clickOperatorBtn(e) {
    if (firstValue == 'E') {
        clear();
        return
    }
    operatorBtns.forEach(btn => btn.classList.remove('pressedOperatorBtn'));
    if (firstValue && temp && operator && !secondValue) {
        clickEqualBtn();
    }
    e.target.classList.add('pressedOperatorBtn');
    operator = e.target.textContent;
    if (!firstValue || (Math.abs(temp - firstValue) < 1)) {
        firstValue = temp;
    }
    temp = '';
    secondValue = '';
    decimalBtnPressed = false;
}

function clickEqualBtn() {
    operatorBtns.forEach(btn => btn.classList.remove('pressedOperatorBtn'));
    decimalBtnPressed = false;
    secondValue = temp;
    let result = operate(operator, Number(firstValue), Number(secondValue));
    if (result == 'E') {
        display.textContent = result;
    } else if (result % 1 !== 0) {
        result = parseFloat(result.toFixed(8));
        display.textContent = result;
    } else if (Number(result).toString().length > 7) {
        result = Number(result).toExponential(3);
        display.textContent = result;
    } else {
        display.textContent = Number(result).toLocaleString("en-US");
    }
    
    firstValue = result.toString();
    checkLength(display.textContent);
    if (display.textContent.includes('.')) {
        decimalBtnPressed = true;
    }
}

function clickDecimalBtn() {
    if (!decimalBtnPressed) {
        if (firstValue && secondValue && temp && operator) {
            temp = firstValue;
        }
        display.textContent += '.';
        temp += '.';
        decimalBtnPressed = true;
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

let temp = '0';
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