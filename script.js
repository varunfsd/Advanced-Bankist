/* =====================================================
   HEADER HOVER EFFECT
   =====================================================
   Fades out sibling navigation links and logo when
   hovering over a link, creating a subtle hover effect.
   Uses `mouseover` and `mouseout` with `.bind(opacity)`.
===================================================== */

// Select the navigation bar
const nav = document.querySelector('.nav');

/**
 * Handles fading of sibling nav links and logo.
 * @param {Event} event - The mouseover/mouseout event.
 * `this` is the bound opacity (0.5 for hover, 1 for reset)
 */
const fadeHandler = function (event) {
  // Only run if hovering over a nav link
  if (event.target.classList.contains('nav__link')) {
    const link = event.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('.nav__logo');

    // Reduce opacity of siblings and logo
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this; // `this` = opacity
    });
    logo.style.opacity = this;
  }
};

// Bind 0.5 opacity for mouseover, 1 for mouseout
nav.addEventListener('mouseover', fadeHandler.bind(0.5));
nav.addEventListener('mouseout', fadeHandler.bind(1));


/* =====================================================
   HEADER SMOOTH SCROLLING
   =====================================================
   Smooth scroll to sections when navigation links
   are clicked.
===================================================== */

// Select the container with nav links
const navLinks = document.querySelector('.nav__links');

navLinks.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent default anchor jump

  // Only scroll if a nav link is clicked, ignore container clicks
  if (event.target !== event.currentTarget) {
    const scrollElementId = event.target.getAttribute('href'); // Get target section
    const scrollElement = document.querySelector(scrollElementId);

    // Smoothly scroll to the section
    scrollElement.scrollIntoView({ behavior: 'smooth' });
  }
});


/* =====================================================
   LEARN MORE BUTTON SCROLL
   =====================================================
   Smooth scroll to section 1 when "Learn More" button
   is clicked.
===================================================== */

// Select the "Learn More" button
const btnScrollTo = document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click', function () {
  const targetSection = document.querySelector('#section--1');
  targetSection.scrollIntoView({ behavior: 'smooth' });
});


/* =====================================================
   OPERATIONS MODAL / TAB SWITCHING
   =====================================================
   Allows tabbed content switching. Clicking a tab
   activates its content while deactivating others.
===================================================== */

// Select tab container and all tabs & contents
const operationsTabContainer = document.querySelector('.operations__tab-container');
const operationsTabs = document.querySelectorAll('.operations__tab');
const operationsContents = document.querySelectorAll('.operations__content');

// Event delegation: listen for clicks on tab container
operationsTabContainer.addEventListener('click', function (event) {
  const clicked = event.target.closest('.btn'); // Get closest tab button

  // Ignore clicks outside of a tab button
  if (clicked && clicked !== event.currentTarget) {
    // Remove active class from all tabs
    operationsTabs.forEach(tab => tab.classList.remove('operations__tab--active'));
    // Activate clicked tab
    clicked.classList.add('operations__tab--active');

    // Remove active class from all content
    operationsContents.forEach(content => content.classList.remove('operations__content--active'));

    // Show the corresponding content
    const tab = clicked.dataset.tab;
    const operationsContent = document.querySelector(`.operations__content--${tab}`);
    operationsContent.classList.add('operations__content--active');
  }
});
