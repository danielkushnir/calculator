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
    const btnNum = e.target.textContent;
    if (firstValue && operator && !temp) {
        secondValue = '';
        display.textContent = '';
        temp = '';
    }
    display.textContent += btnNum;
    temp += btnNum;
    /*if (!firstValue) {
        enterFirstValue(e);
    } else {
        enterSecondValue(e);
    }*/
}

function enterFirstValue(e) {
    const btnNum = e.target.textContent;
    display.textContent += btnNum;
    firstValue += btnNum;
}

function enterSecondValue(e) {
    const btnNum = e.target.textContent;
    display.textContent += btnNum;
    secondValue += btnNum;
}

function clickOperatorBtn(e) {
//    if () {
    firstValue = temp;
    temp = '';
//    }
    operator = e.target.textContent;

    console.log(`firstValue: ${firstValue}`);
    console.log(`secondValue: ${secondValue}`);
    console.log(`temp: ${temp}`);
    console.log(`operator: ${operator}`);
}

function clickEqualBtn() {
    if (firstValue && operator) {
        if (!secondValue) {
            secondValue = display.textContent;
            display.textContent = operate(operator, firstValue*1, secondValue*1);
        } else {
            firstValue = display.textContent;
            display.textContent = operate(operator, firstValue*1, secondValue*1);
        }   
        temp = '';
    }
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