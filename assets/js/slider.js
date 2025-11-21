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