document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.getAttribute('href') && this.getAttribute('href') !== '#') {
            return;
        }
        e.preventDefault();
        const pageName = this.textContent.trim();
        document.querySelector('.banner').style.display = 'block';
        document.querySelector('.breadcrumb-item.active').textContent = pageName;
    });
});