document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.quantity-controls').forEach(control => {
        const minus = control.querySelector('.minus');
        const plus = control.querySelector('.plus');
        const input = control.querySelector('.quantity-input');

        plus.addEventListener('click', () => {
            let currentValue = parseInt(input.value);
            input.value = currentValue + 1;
        });

        minus.addEventListener('click', () => {
            let currentValue = parseInt(input.value);
            if (currentValue > 1) {
                input.value = currentValue - 1;
            }
        });
    });
});
