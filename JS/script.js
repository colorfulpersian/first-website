const nav = document.querySelector('.header__nav');
const accountBtn = document.querySelector('.nav-btn');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const header = document.querySelector('.header');

// Cookie Message
setTimeout(() => {
    const cookieDiv = document.createElement('div');
    cookieDiv.classList.add('cookie-message');
    cookieDiv.innerHTML = `We use cookies to improve functionality & analytics.<button class="cookie-btn">Okay</button>`
    document.body.prepend(cookieDiv);
    cookieDiv.style.height = parseInt(getComputedStyle(cookieDiv).height, 10) + 30 + 'px';
    document.querySelector('.cookie-btn').addEventListener('click', function () {
        cookieDiv.remove();
    })
}, 4000);

// Open Accout
const open = () => {
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    document.body.classList.add('scroll');
    setTimeout(() => {
        alert('You can also use "ESC" to close.')
    }, 1000);
};
accountBtn.addEventListener('click', open);

// Close Account
const close = () => {
    overlay.classList.add('hidden');
    modal.classList.add('hidden');
    document.body.classList.remove('scroll');
}
document.querySelector('.fa-times').addEventListener('click', close)
overlay.addEventListener('click', close);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        close();
    }
})

// Menu Fade Navigation
function fadeNav(e) {
    if (e.target.classList.contains('nav__link')) {
        const siblings = e.target.closest('.header__nav').querySelectorAll('.nav__link');
        siblings.forEach(el => {
            if (el !== e.target) {
                el.style.transition = 'all .8s ease'
                el.style.opacity = this;
            }
        })
    }
};
nav.addEventListener('mouseover', fadeNav.bind(0.5));
nav.addEventListener('mouseout', fadeNav.bind(1));


// Navigation To Section
nav.addEventListener('click', function (e) {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
});

// Sticky Navigation
const navObs = new IntersectionObserver(function (entries) {
    const [entry] = entries;
    if (entry.target.getBoundingClientRect().width >= 950) {
        if (!entry.isIntersecting) {
            nav.classList.add('sticky-nav');
        } else nav.classList.remove('sticky-nav');
    }
}, {
    root: null,
    threshold: 0,
})
navObs.observe(header);

// Revealing Sections
const allSections = document.querySelectorAll('.sections');
allSections.forEach(sec => sec.classList.remove('section-hidden'))
// const sectionObs = new IntersectionObserver(function (entries, observer) {
//     const [entry] = entries;
//     if (!entry.isIntersecting) return;
//     entry.target.classList.remove('section-hidden')
//     observer.unobserve(entry.target);
// }, {
//     root: null,
//     threshold: 0.20,
// })
// allSections.forEach(sec => sectionObs.observe(sec));

// Lazy Loading Image
const images = document.querySelectorAll('img[data-src]');
const imageObs = new IntersectionObserver(function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.src = entry.target.dataset.src;
    entry.target.addEventListener('load', function () {
        entry.target.classList.remove('lazy-img')
    })
    observer.unobserve(entry.target)
}, {
    root: null,
    threshold: 0,
})

images.forEach(img => imageObs.observe(img))


// Slider
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slider__photo');
const rightBtn = document.querySelector('.slider__btn--right');
const leftBtn = document.querySelector('.slider__btn--left');
const dotsContainer = document.querySelector('.slider__dots');
const dots = document.querySelectorAll('.slider__dots--dot');


let currSlide = 0;
const maxSlide = slides.length - 1;

function goToSlide(S) {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - S)}%)`
    })
}
goToSlide(0);

function nextSlide() {
    if (currSlide === maxSlide) {
        currSlide = 0;
    } else {
        currSlide++;
    }
    goToSlide(currSlide);
    activeDot(currSlide);
}
function prevSlide() {
    if (currSlide === 0) {
        currSlide = maxSlide;
    } else {
        currSlide--;
    }
    goToSlide(currSlide);
    activeDot(currSlide)
}
rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', prevSlide);
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        nextSlide();
    }
    if (e.key === 'ArrowLeft') {
        prevSlide();
    }
});
dotsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('slider__dots--dot')) {
        const dot = e.target.dataset.slide;
        goToSlide(dot);
        activeDot(dot)
    }
})
function activeDot(D) {
    dots.forEach(dot => dot.classList.remove('active_dot'))
    document.querySelector(`.slider__dots--dot[data-slide="${D}"]`).classList.add('active_dot');
}
activeDot(0)
// Tabbed Component
const operationsContainer = document.querySelector('.operations');
const operations = document.querySelectorAll('.operations__tab');
const contents = document.querySelectorAll('.operations__content');

operationsContainer.addEventListener('click', function (e) {
    const clicked = e.target.closest('.operations__tab');
    if (!clicked) return;
    // Deactive Current Tab
    operations.forEach(el => el.classList.remove('operations__tab--active'))
    // Active Clicked Tab
    clicked.classList.add('operations__tab--active');
    // Deactivate Current Content
    contents.forEach(el => el.classList.remove('operations__content--active'));
    // Activate Clicked Content
    document.querySelector(`.operations__content--${clicked.dataset.tab} `).classList.add('operations__content--active');
})



