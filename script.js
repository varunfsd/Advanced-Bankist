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

  if (!entry.isIntersecting) nav.classList.add('sticky');  // Make sticky
  else nav.classList.remove('sticky');                     // Remove sticky
};

// Create observer with configuration
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,           // Use viewport
  threshold: 0,         // Trigger immediately when header leaves viewport
  rootMargin: '-90px',  // Shrink viewport by 90px to trigger earlier
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

  if (!event.target.classList.contains('nav__link')) return;

  const sectionId = event.target.getAttribute('href');
  document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
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
const operationsTabContainer = document.querySelector('.operations__tab-container');
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
  operationsTabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  // Add active state to clicked tab
  clicked.classList.add('operations__tab--active');

  // Remove active state from all content sections
  operationsContents.forEach(content => content.classList.remove('operations__content--active'));
  // Show content corresponding to clicked tab
  const targetContent = document.querySelector(`.operations__content--${clicked.dataset.tab}`);
  targetContent.classList.add('operations__content--active');
};

// Add click listener using event delegation
operationsTabContainer.addEventListener('click', switchTab);
