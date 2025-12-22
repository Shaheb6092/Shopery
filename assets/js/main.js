const carousel = document.getElementById('carousel');
const nextBtn = document.querySelector('.next-testimonial');
const prevBtn = document.querySelector('.prev-testimonial');
let currentIndex = 0;
const visibleItems = 3;
const gapSize = 24; // 24px gap between items
let autoSlide;

function getItemCount() {
    return document.querySelectorAll('.testimonial-container .col-xl-4').length;
}

function updateCarousel() {
    const containerWidth = carousel.offsetWidth;
    const itemWidth = (containerWidth / visibleItems);
    const offset = currentIndex * itemWidth;
    carousel.style.transform = `translateX(-${offset}px)`;
}

function nextSlide() {
    const totalItems = getItemCount();
    if (currentIndex < totalItems - visibleItems) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }
    updateCarousel();
}

function prevSlide() {
    const totalItems = getItemCount();
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalItems - visibleItems;
    }
    updateCarousel();
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
    });
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
    });
}

function startAutoSlide() {
    autoSlide = setInterval(nextSlide, 4000);
}

function resetAutoSlide() {
    clearInterval(autoSlide);
    startAutoSlide();
}

// Initialize carousel
window.addEventListener('load', () => {
    updateCarousel();
    startAutoSlide();
});

// Recalculate on window resize
window.addEventListener('resize', () => {
    updateCarousel();
});

// =================================================================
//      NAV SELECT REDIRECTION
// =================================================================
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.navs-select').forEach(selectElement => {
        selectElement.addEventListener('change', function() {
            const selectedValue = this.value;
            if (selectedValue) {
                let url = '';
                if (selectedValue === 'blog2') {
                    url = 'blog_list.html';
                } else if (selectedValue === 'blog1') {
                    url = 'blog_list.html';
                } else {
                    url = selectedValue + '.html';
                }
                window.location.href = url;
            }
        });
    });

    const path = window.location.pathname.split("/").pop();
    let activePage = null;

    if (path === 'index.html' || path === '') {
        activePage = 'Home';
    } else if (path === 'shop1.html' || path === 'shop2.html') {
        activePage = 'Shop';
    } else if (path === 'blog_list.html') {
        activePage = 'Blog';
    } else if (['About_us.html', 'contact_us.html', 'checkout.html', 'sign_in.html', 'wishlist.html', 'page1.html', 'page2.html'].includes(path)) {
        activePage = 'Pages';
    }

    if (activePage) {
        const activeSelect = document.querySelector(`.navs-select[data-page="${activePage}"]`);
        if (activeSelect) {
            activeSelect.classList.add('bg-dark', 'text-white');
        }
    }
});

// =================================================================
//      NAV ITEM HOVER EFFECT
// =================================================================
$(document).ready(function() {
    $("#shop-nav-item").hover(
        function() {
            $(this).find(".nav-select").css("background-color", "blue");
        },
        function() {
            $(this).find(".nav-select").css("background-color", "");
        }
    );

    $('.slide').slick();
});

// =================================================================
//      CUSTOM SELECT OPTION HOVER EFFECT
// =================================================================

// get all option elements
const options = document.querySelectorAll("#mySelect option");

// add hover behavior
options.forEach(op => {
    op.addEventListener("mouseover", () => {
        op.style.backgroundColor = "black";
        op.style.color = "green";
    });

    op.addEventListener("mouseout", () => {
        op.style.backgroundColor = "";
        op.style.color = "";
    });
})