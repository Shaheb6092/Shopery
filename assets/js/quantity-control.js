
// 1. Quantity +/− (already working)
document.querySelectorAll('.quantity-controls').forEach(control => {
    const minus = control.querySelector('.minus');
    const plus = control.querySelector('.plus');
    const input = control.querySelector('.quantity-input');
    const price = parseFloat(control.dataset.price.replace('$', ''));
    const subtotalEl = control.closest('.product-row').querySelector('.subtotal-price');

    const updateSubtotal = () => {
        const qty = parseInt(input.value) || 1;
        subtotalEl.textContent = `$${(qty * price).toFixed(2)}`;
        updateCartTotal();
    };

    plus.addEventListener('click', () => {
        input.value = parseInt(input.value) + 1;
        updateSubtotal();
    });
    minus.addEventListener('click', () => {
        if (input.value > 1) input.value--;
        updateSubtotal();
    });
    input.addEventListener('change', () => {
        if (input.value < 1) input.value = 1;
        updateSubtotal();
    });
});

// 2. REMOVE BUTTON – FULLY FUNCTIONAL
document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
        const row = this.closest('.product-row');

        // Smooth fade + slide out animation
        row.classList.add('removing');
        setTimeout(() => {
            row.remove(); // actually delete from DOM
            updateCartTotal(); // recalculate total
        }, 400);
    });
});

// 3. Update Cart Total (used by both quantity & remove)
function updateCartTotal() {
    let total = 0;
    document.querySelectorAll('.subtotal-price').forEach(el => {
        total += parseFloat(el.textContent.replace('$', '')) || 0;
    });
    const formatted = total.toFixed(2);
    document.getElementById('cart-subtotal').textContent = `$${formatted}`;
    document.getElementById('cart-total').textContent = `$${formatted}`;
}

// Initial calculation
updateCartTotal();
