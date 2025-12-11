// 2. REMOVE BUTTON – FULLY FUNCTIONAL
document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
        const row = this.closest('.items');

        // Smooth fade + slide out animation
        row.classList.add('removing');
        setTimeout(() => {
            row.remove(); // actually delete from DOM
            updateCartTotal(); // recalculate total
        }, 400);
    });
});

// When any nav link or select option is chosen → show banner + update page name
document.querySelectorAll('.nav-link, .nav-select').forEach(element => {
    element.addEventListener('change', function(e) {
        if (this.tagName === 'SELECT') {
            const selectedOption = this.options[this.selectedIndex];
            const pageName = selectedOption.textContent.trim() || this.dataset.page;
            updateBanner(pageName);
        }
    });

    element.addEventListener('click', function(e) {
        if (this.tagName === 'A') {
            e.preventDefault();
            const pageName = this.dataset.page || this.textContent.trim();
            updateBanner(pageName);
        }
    });
});

function updateBanner(pageName) {
    document.querySelector('.banner').style.display = 'block';
    document.querySelector('.breadcrumb-item.active').textContent = pageName;
}