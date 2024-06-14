document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.querySelectorAll('.btn'));
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            const value = button.textContent;
            if (action === 'number') {
                if (currentInput === '0' && value === '0') return;
                if (currentInput.includes('.') && value === '.') return;
                currentInput = currentInput === '0' ? value : currentInput + value;
                display.textContent = currentInput;
            } else if (action === 'operator') {
                if (currentInput === '' && operator !== '') {
                    operator = value;
                } else {
                    if (previousInput !== '' && currentInput !== '') {
                        currentInput = operate(previousInput, currentInput, operator);
                    }
                    operator = value;
                    previousInput = currentInput;
                    currentInput = '';
                }
                display.textContent = operator;
            } else if (action === 'equals') {
                if (currentInput !== '' && previousInput !== '' && operator !== '') {
                    currentInput = operate(previousInput, currentInput, operator);
                    display.textContent = currentInput;
                    operator = '';
                    previousInput = '';
                }
            } else if (action === 'clear') {
                currentInput = '';
                operator = '';
                previousInput = '';
                display.textContent = '0';
            } else if (action === 'delete') {
                currentInput = currentInput.slice(0, -1) || '0';
                display.textContent = currentInput;
            }
        });
    });
    function operate(a, b, operator) {
        a = parseFloat(a);
        b = parseFloat(b);
        if (isNaN(a) || isNaN(b)) return '';
        switch (operator) {
            case '+':
                return (a + b).toString();
            case '-':
                return (a - b).toString();
            case '*':
                return (a * b).toString();
            case '/':
                return (a / b).toString();
            default:
                return '';
        }
    }
});
