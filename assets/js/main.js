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
    document.querySelectorAll('.nav-select').forEach(selectElement => {
        selectElement.addEventListener('change', function() {
            const selectedValue = this.value;
            if (selectedValue) {
                window.location.href = selectedValue + '.html';
            }
        });
    });
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
});