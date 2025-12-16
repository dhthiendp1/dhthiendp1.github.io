// Toggle Mobile Menu
const btn = document.getElementById('mobile-menu-btn');
const menu = document.getElementById('mobile-menu');

if (btn && menu) {
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
}

// Navbar blur effect on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('shadow-md');
    } else {
        navbar.classList.remove('shadow-md');
    }
});

// Carousel Logic
function setupCarousel(id, interval = 2000) {
    const container = document.getElementById(id);
    if (!container) return;

    const slides = container.querySelectorAll('.carousel-slide');
    let currentIndex = 0;
    let slideInterval;
    let startX = 0; // for swipe

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.opacity = i === index ? '1' : '0';
            slide.style.zIndex = i === index ? '10' : '0';
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        showSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        showSlide(currentIndex);
    }

    // Public functions for buttons (gắn vào window để gọi từ HTML)
    window.nextSlide = function(carouselId) {
        if(carouselId === id) {
            nextSlide();
            resetTimer();
        }
    };

    window.prevSlide = function(carouselId) {
        if(carouselId === id) {
            prevSlide();
            resetTimer();
        }
    };

    function startTimer() {
        slideInterval = setInterval(nextSlide, interval);
    }

    function resetTimer() {
        clearInterval(slideInterval);
        startTimer();
    }

    // Swipe logic (Touch events for mobile)
    container.addEventListener('touchstart', e => {
        startX = e.changedTouches[0].screenX;
    });

    container.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].screenX;
        if (startX - endX > 50) {
            nextSlide(); // Swipe Left -> Next
            resetTimer();
        } else if (endX - startX > 50) {
            prevSlide(); // Swipe Right -> Prev
            resetTimer();
        }
    });

    // Init
    showSlide(0);
    startTimer();
}

// Initialize Carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupCarousel('carousel-mta', 2000);
});