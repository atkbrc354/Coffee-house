
document.addEventListener("DOMContentLoaded", function() {
    const burgerMenu = document.querySelector('.burger__menu');
    const headerNav = document.querySelector('.header__nav');
    const headerLink = document.querySelectorAll('.header__item');
    const body = document.querySelector('body');
    burgerMenu.addEventListener('click', () => {
        headerNav.classList.toggle('open');
        burgerMenu.classList.toggle('burger__active');
        body.classList.toggle('hidden');
    });

    headerLink.forEach((item) => {
        item.addEventListener('click', () => {
            headerNav.classList.remove('open');
            body.classList.remove('hidden');
            burgerMenu.classList.remove('burger__active');
        });
    });

    
    const slideBtnRigth = document.querySelector('.slide__btn-rigth');
    const slideBtnLeft = document.querySelector('.slide__btn-left');
    const slideImg = document.querySelector('.slide__img');
    const slideWidth = 480;
    let slideIndex = 0;
    const sliderLines = document.querySelectorAll('.slider__line');
    
    function updateActiveSpan() {
        sliderLines.forEach((span, index) => {
            if (index === Math.abs(slideIndex / slideWidth)) {
                span.classList.add('active-slide');
            } else {
                span.classList.remove('active-slide');
            }
        });
    }

    function changeLeft(offset) {
        slideIndex += offset;
        const numSlides = sliderLines.length;
        if (slideIndex < -(slideWidth * (numSlides - 1))) {
            slideIndex = 0;
        } else if (slideIndex > 0) {
            slideIndex = -(slideWidth * (numSlides - 1));
        }
    
        slideImg.style.left = slideIndex + 'px';
        updateActiveSpan();
    }

    slideBtnLeft.addEventListener('click', () => {
        changeLeft(slideWidth);
    });
    
    slideBtnRigth.addEventListener('click', () => {
        changeLeft(-slideWidth); 
    });

});
