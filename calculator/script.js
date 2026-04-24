let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let previousValue = null;

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && op !== '.') return;
    
    if (op === '.') {
        if (!currentInput.includes('.')) {
            currentInput += op;
            updateDisplay();
        }
        return;
    }

    if (previousValue !== null && operator !== null && currentInput !== '') {
        calculateResult();
    }

    previousValue = parseFloat(currentInput);
    operator = op;
    currentInput = '';
}

function calculateResult() {
    if (currentInput === '' || previousValue === null || operator === null) return;

    const current = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = previousValue + current;
            break;
        case '-':
            result = previousValue - current;
            break;
        case '*':
            result = previousValue * current;
            break;
        case '/':
            if (current === 0) {
                display.value = 'Error: Div by 0';
                clearVariables();
                return;
            }
            result = previousValue / current;
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousValue = null;
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    previousValue = null;
    updateDisplay();
}

function deleteLastChar() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput || '0';
}

function clearVariables() {
    currentInput = '';
    operator = null;
    previousValue = null;
}

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
    if (e.key === '.') appendOperator('.');
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') appendOperator(e.key);
    if (e.key === 'Enter' || e.key === '=') calculateResult();
    if (e.key === 'Backspace') deleteLastChar();
    if (e.key === 'Escape') clearDisplay();
});

// Initialize display
updateDisplay();
