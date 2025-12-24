// Top banner slider for index.html

$(document).ready(function() {

    $('.banner-slider').slick({
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 600,

    })
})

// categories slider for index.html
$(document).ready(function() {
    $('.categories-slider').slick({
        // Desktop: 6 cards visible
        slidesToShow: 6,
        slidesToScroll: 1,
        infinite: true,
        arrows: true,
        dots: false,
        autoplay: false,
        autoplaySpeed: 2500,
        speed: 600,
        cssEase: 'ease-in-out',
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                arrows: false, // Hide arrows on mobile
                dots: true
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                dots: true
            }
        }],
    });
});


// slider for about section ;
$(document).ready(function() {
    $('.team-carousel').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        autoplay: false,
        autoplaySpeed: 3000,
        speed: 600,
        cssEase: 'ease-in-out',
        responsive: [{
                breakpoint: 1400,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 992,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                    centerMode: true,
                    centerPadding: '40px'
                }
            }
        ],
    });
});

/// Price range-slider connected from here;

$(document).ready(function() {
    const minVal = 50;
    const maxVal = 150;
    const $track = $('.slider-track');
    const $fill = $('.slider-fill');
    const $minThumb = $('.min-thumb');
    const $maxThumb = $('.max-thumb');

    let isDragging = null; // 'min', 'max', or null

    function updateSlider() {
        let minPercent = parseFloat($minThumb.css('left')) / $track.width() * 100;
        let maxPercent = parseFloat($maxThumb.css('left')) / $track.width() * 100;

        // Ensure min <= max
        if (minPercent > maxPercent) {
            if (isDragging === 'min') minPercent = maxPercent;
            if (isDragging === 'max') maxPercent = minPercent;
        }

        $minThumb.css('left', minPercent + '%');
        $maxThumb.css('left', maxPercent + '%');
        $fill.css({ left: minPercent + '%', width: (maxPercent - minPercent) + '%' });

        const minValue = Math.round(minVal + (maxVal - minVal) * (minPercent / 100));
        const maxValue = Math.round(minVal + (maxVal - minVal) * (maxPercent / 100));

        $minThumb.attr('data-value', minValue);
        $maxThumb.attr('data-value', maxValue);
    }

    // Initial position: min at 50, max at 1500
    updateSlider();

    // Mouse down on thumbs
    $('.slider-thumb').on('mousedown touchstart', function(e) {
        isDragging = $(this).hasClass('min-thumb') ? 'min' : 'max';
        e.preventDefault();
    });

    // Mouse move
    $(document).on('mousemove touchmove', function(e) {
        if (!isDragging) return;

        let pageX = e.pageX || e.originalEvent.touches[0].pageX;
        const trackOffset = $track.offset().left;
        const trackWidth = $track.width();
        let pos = pageX - trackOffset;

        if (pos < 0) pos = 0;
        if (pos > trackWidth) pos = trackWidth;

        const percent = (pos / trackWidth) * 100;

        if (isDragging === 'min') {
            $minThumb.css('left', percent + '%');
        } else {
            $maxThumb.css('left', percent + '%');
        }

        updateSlider();
    });

    // Mouse up / touch end
    $(document).on('mouseup touchend', function() {
        isDragging = null;
    });

    // Click on track to move nearest thumb
    $track.on('click', function(e) {
        if ($(e.target).hasClass('slider-thumb')) return;

        const trackOffset = $track.offset().left;
        const trackWidth = $track.width();
        let pos = e.pageX - trackOffset;

        if (pos < 0) pos = 0;
        if (pos > trackWidth) pos = trackWidth;

        const percent = (pos / trackWidth) * 100;

        // Determine nearest thumb
        const minPercent = parseFloat($minThumb.css('left')) / trackWidth * 100;
        const maxPercent = parseFloat($maxThumb.css('left')) / trackWidth * 100;

        const distToMin = Math.abs(percent - minPercent);
        const distToMax = Math.abs(percent - maxPercent);

        if (distToMin < distToMax) {
            $minThumb.css('left', percent + '%');
            isDragging = 'min';
        } else {
            $maxThumb.css('left', percent + '%');
            isDragging = 'max';
        }

        updateSlider();
        isDragging = null;
    });
});