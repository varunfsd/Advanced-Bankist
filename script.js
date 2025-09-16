/* =====================================================
   NAVIGATION HOVER EFFECT
   =====================================================
   Description:
     Fades out sibling navigation links and the logo 
     when hovering over a nav link for a subtle hover effect.

   Implementation:
     - Uses event delegation on the nav container.
     - `.bind()` sets the opacity value (0.5 on hover, 1 on mouseout).
===================================================== */

/** @type {HTMLElement} Navigation bar element */
const nav = document.querySelector('.nav');

/**
 * Handles fading of sibling nav links and the logo.
 * @param {MouseEvent} event - Mouseover or mouseout event.
 * `this` refers to the bound opacity value.
 */
const fadeHandler = function (event) {
  if (!event.target.classList.contains('nav__link')) return;

  const link = event.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('.nav__logo');

  // Fade out sibling links
  siblings.forEach(el => {
    if (el !== link) el.style.opacity = this;
  });
  // Fade out logo
  logo.style.opacity = this;
};

// Event listeners for hover in/out
nav.addEventListener('mouseover', fadeHandler.bind(0.5));
nav.addEventListener('mouseout', fadeHandler.bind(1));

/* =====================================================
   STICKY NAVIGATION ON SCROLL
   =====================================================
   Description:
     Adds a "sticky" class to the nav when the header
     scrolls out of view using IntersectionObserver.

   Implementation:
     - root: viewport
     - threshold: 0 (trigger as soon as header leaves viewport)
     - rootMargin: '-90px' (trigger 90px earlier)
===================================================== */

/** @type {HTMLElement} Header section to observe */
const header = document.querySelector('.header');

/**
 * Callback for IntersectionObserver to toggle sticky nav.
 * @param {IntersectionObserverEntry[]} entries - Intersection entries
 */
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky'); // Make sticky
  else nav.classList.remove('sticky'); // Remove sticky
};

// Create observer with configuration
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null, // Use viewport
  threshold: 0, // Trigger immediately when header leaves viewport
  rootMargin: '-90px', // Shrink viewport by 90px to trigger earlier
});

// Observe the header element
headerObserver.observe(header);

/* =====================================================
   SMOOTH SCROLLING FOR NAV LINKS
   =====================================================
   Description:
     Smoothly scrolls to the target section when a 
     navigation link is clicked.

   Implementation:
     - Event delegation on nav links container
     - Prevents default anchor jump
     - Uses scrollIntoView with smooth behavior
===================================================== */

/** @type {HTMLElement} Container of all nav links */
const navLinksContainer = document.querySelector('.nav__links');

navLinksContainer.addEventListener('click', function (event) {
  event.preventDefault();
  if (
    event.target.classList.contains('nav__link') &&
    !event.target.classList.contains('nav__link--btn')
  ) {
    const sectionId = event.target.getAttribute('href');
    document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
  }
});

/* =====================================================
   "LEARN MORE" BUTTON SCROLL
   =====================================================
   Description:
     Smoothly scrolls to Section 1 when the 
     "Learn More" button is clicked.

   Implementation:
     - Directly selects the target section
     - Uses scrollIntoView with smooth behavior
===================================================== */

/** @type {HTMLElement} "Learn More" button */
const btnScrollTo = document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click', function () {
  document.querySelector('#section--1').scrollIntoView({ behavior: 'smooth' });
});

/* =====================================================
   OPERATIONS MODAL / TAB SWITCHING
   =====================================================
   Description:
     Allows switching between tabbed content sections
     in the operations section.

   Implementation:
     - Event delegation on the tab container
     - Activates clicked tab and its corresponding content
     - Deactivates all other tabs and contents
===================================================== */

/** @type {HTMLElement} Container for all tabs */
const operationsTabContainer = document.querySelector(
  '.operations__tab-container'
);
/** @type {NodeListOf<HTMLElement>} All tab buttons */
const operationsTabs = document.querySelectorAll('.operations__tab');
/** @type {NodeListOf<HTMLElement>} All tab content sections */
const operationsContents = document.querySelectorAll('.operations__content');

/**
 * Handles tab switching in the operations section.
 * @param {MouseEvent} event - Click event on the tab container.
 */
const switchTab = function (event) {
  const clicked = event.target.closest('.operations__tab');
  if (!clicked) return; // Exit if click is outside a tab

  // Remove active state from all tabs
  operationsTabs.forEach(tab =>
    tab.classList.remove('operations__tab--active')
  );
  // Add active state to clicked tab
  clicked.classList.add('operations__tab--active');

  // Remove active state from all content sections
  operationsContents.forEach(content =>
    content.classList.remove('operations__content--active')
  );
  // Show content corresponding to clicked tab
  const targetContent = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );
  targetContent.classList.add('operations__content--active');
};

// Add click listener using event delegation
operationsTabContainer.addEventListener('click', switchTab);

/* =====================================================
   SECTION REVEAL ON SCROLL
   =====================================================
   Description:
     Reveals each hidden section as it enters the viewport 
     while scrolling.

   Implementation:
     - Adds 'section--hidden' class to all sections initially
     - Uses Intersection Observer API to detect visibility
     - When 15% of a section is visible, the hidden class is removed
     - Each section is unobserved after being revealed (performance optimization)
===================================================== */

// Select all section elements
const allSections = document.querySelectorAll('.section');

/**
 * Intersection Observer callback:
 * Reveals section once it intersects with the viewport.
 *
 * @param {IntersectionObserverEntry[]} entries - Observed entries
 * @param {IntersectionObserver} observer - The observer instance
 */
const revealSection = function (entries, observer) {
  /**
   * Loop through all observed entries and reveal the section
   * once it enters the viewport.
   *
   * @param {IntersectionObserverEntry[]} entries - Array of observed entries
   */
  entries.forEach(entry => {
    if (!entry.isIntersecting) return; // Skip if section not visible
    entry.target.classList.remove('section--hidden'); // Show section
    observer.unobserve(entry.target); // Stop observing revealed section
  });
};

/**
 * Intersection Observer settings:
 * - root: null → viewport is the container
 * - threshold: 0.15 → callback triggers when 15% is visible
 */
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

// Hide all sections initially and start observing them
allSections.forEach(function (section) {
  section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

/* =====================================================
   SLIDER INITIALIZATION & NAVIGATION
   =====================================================
   Description:
     Handles image slider movement (left, right, dots, 
     and keyboard controls). Keeps track of the current 
     slide and updates UI accordingly.

   Implementation:
     - `slideMove()` positions slides using translateX
     - `nextSlide()` moves slider forward (wraps around)
     - `previousSlide()` moves slider backward (wraps around)
     - Navigation buttons: left/right
     - Keyboard: ArrowLeft / ArrowRight
     - Dots: clickable navigation with active highlight
===================================================== */

/** @type {number} Keeps track of current active slide */
let currentSlide = 0;

/** @type {HTMLElement} Right navigation button */
const rightBtn = document.querySelector('.slider__btn--right');

/** @type {HTMLElement} Left navigation button */
const leftBtn = document.querySelector('.slider__btn--left');

/** @type {NodeListOf<Element>} All slide elements */
const allSlides = document.querySelectorAll('.slide');

/** @type {HTMLElement} Slider container */
const slider = document.querySelector('.slider');

/**
 * Moves slides to show the given currentSlide.
 * @param {number} currentSlide - Index of the slide to show
 */
const slideMove = function (currentSlide) {
  allSlides.forEach((slide, index) => {
    slide.style.transform = `translateX(${100 * (index - currentSlide)}%)`;
  });
};

// Initialize slider to its first slide (index = 0)
slideMove(currentSlide);

/** Go to next slide */
const nextSlide = function () {
  currentSlide = currentSlide === allSlides.length - 1 ? 0 : currentSlide + 1;
  slideMove(currentSlide);
  activateDot(currentSlide);
};

/** Go to previous slide */
const previousSlide = function () {
  currentSlide = currentSlide === 0 ? allSlides.length - 1 : currentSlide - 1;
  slideMove(currentSlide);
  activateDot(currentSlide);
};

// Button navigation
rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click', previousSlide);

/* =====================================================
   KEYBOARD SLIDER NAVIGATION
   =====================================================
   Description:
     Enables slider navigation with left and right 
     arrow keys, only when the slider is in view.

   Implementation:
     - Intersection Observer detects when slider is visible
     - Adds/removes keyboard event listener accordingly
===================================================== */

/**
 * Handles keyboard navigation for slider
 * @param {KeyboardEvent} event
 */
const handleKey = function (event) {
  if (event.key === 'ArrowRight') nextSlide();
  if (event.key === 'ArrowLeft') previousSlide();
};

/**
 * Observer callback for slider visibility
 * @param {IntersectionObserverEntry[]} entries
 * @param {IntersectionObserver} observe
 */
const sliderView = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    document.addEventListener('keydown', handleKey);
  } else {
    document.removeEventListener('keydown', handleKey);
  }
};

const sliderContainer = document.querySelector('.slider');

const sliderObserver = new IntersectionObserver(sliderView, {
  root: null,
  threshold: 0.75,
});
sliderObserver.observe(sliderContainer);

/* =====================================================
   DOT NAVIGATION
   =====================================================
   Description:
     Creates clickable dots for each slide and highlights 
     the active one.

   Implementation:
     - `createDots()` generates buttons dynamically
     - `activateDot()` highlights the current active dot
     - Click listener moves to clicked dot’s slide
===================================================== */

const dotContainer = document.querySelector('.dots');

/** Creates navigation dots for each slide */
const createDots = function () {
  allSlides.forEach((_, index) => {
    const html = `<button class="dots__dot" data-slide="${index}"></button>`;
    dotContainer.insertAdjacentHTML('beforeend', html);
  });
};
createDots();

/** @type {NodeListOf<Element>} All dot elements */
const allDots = document.querySelectorAll('.dots__dot');

/**
 * Activates the dot corresponding to the current slide
 * @param {number} curslide
 */
const activateDot = function (curslide) {
  allDots.forEach(dot => dot.classList.remove('dots__dot--active'));
  const toActivateDot = document.querySelector(
    `.dots__dot[data-slide="${curslide}"]`
  );
  toActivateDot.classList.add('dots__dot--active');
};

// Dot click navigation
dotContainer.addEventListener('click', function (event) {
  if (event.target.classList.contains('dots__dot')) {
    currentSlide = Number(event.target.dataset.slide);
    slideMove(currentSlide);
    activateDot(currentSlide);
  }
});
activateDot(0);

/* =====================================================
   LAZY IMAGE LOADING
   =====================================================
   Description:
     Improves performance by loading high-resolution 
     images only when they come near the viewport.

   Implementation:
     - Uses data-src for high-res image
     - Intersection Observer triggers load
     - Removes blur class once loaded
===================================================== */

/**
 * Observer callback for lazy-loading images
 * @param {IntersectionObserverEntry[]} entries
 * @param {IntersectionObserver} observer
 */
const imageObserver = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      entry.target.addEventListener(
        'load',
        () => {
          entry.target.classList.remove('lazy-img');
        },
        { once: true }
      );
      observer.unobserve(entry.target);
    }
  });
};

const imgObserver = new IntersectionObserver(imageObserver, {
  root: null,
  threshold: 0.5,
});

const allImages = document.querySelectorAll('.features__img');
allImages.forEach(img => imgObserver.observe(img));

/* =====================================================
   MODAL HANDLING
   =====================================================
   Description:
     Opens and closes modal with overlay, prevents 
     background scrolling.

   Implementation:
     - Open: remove hidden class, disable body scroll
     - Close: add hidden class, enable body scroll
===================================================== */

const openAccount = document.querySelectorAll('.btn--show-modal');
const showModal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.btn--close-modal');
let previousOverflow;

/**
 * Opens the modal window and disables background scrolling.
 *
 * Steps performed:
 * 1. Saves the current body overflow style to restore later.
 * 2. Removes the 'hidden' class from the modal to make it visible.
 * 3. Removes the 'hidden' class from the overlay to show the dimmed background.
 * 4. Sets `document.body.style.overflow` to 'hidden' to prevent scrolling behind the modal.
 *
 * Usage:
 *   openModal(); // Call when a button or event should open the modal
 */
const openModal = function () {
  previousOverflow = document.body.style.overflow;
  showModal.classList.remove('hidden');
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

// Open modal
openAccount.forEach(element => {
  element.addEventListener('click', openModal);
});

/**
 * Closes the modal window and restores page state.
 *
 * Implementation details:
 * - Adds `hidden` class to modal and overlay to hide them.
 * - Resets `document.body.style.overflow` to allow background scrolling again.
 */
const closeModal = function () {
  showModal.classList.add('hidden');
  overlay.classList.add('hidden');
  document.body.style.overflow = previousOverflow;
};

// Close modal
btnClose.addEventListener('click', closeModal);

/**
 * Handles modal closing interactions.
 *
 * - Closes the modal when the overlay is clicked.
 * - Closes the modal when the Escape key is pressed,
 *   if the modal is currently visible.
 */
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !showModal.classList.contains('hidden')) {
    e.preventDefault();
    closeModal();
  }
});