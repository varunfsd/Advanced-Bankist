/* =====================================================
   NAVIGATION HOVER EFFECT
   =====================================================
   Fades out sibling nav links and the logo when
   hovering over a nav link for a subtle hover effect.
   Uses event delegation and `.bind()` to set opacity.
===================================================== */

// Select the navigation bar
const nav = document.querySelector('.nav');

/**
 * Handles fading of sibling nav links and the logo.
 * @param {MouseEvent} event - The mouseover or mouseout event.
 * `this` is the bound opacity value (0.5 on hover, 1 on reset)
 */
const fadeHandler = function (event) {
  if (!event.target.classList.contains('nav__link')) return; // Only run on nav links

  const link = event.target;
  const siblings = link.closest('.nav').querySelectorAll('.nav__link');
  const logo = link.closest('.nav').querySelector('.nav__logo');

  siblings.forEach(el => {
    if (el !== link) el.style.opacity = this; // `this` = opacity
  });
  logo.style.opacity = this;
};

// Bind 0.5 opacity for mouseover, 1 for mouseout
nav.addEventListener('mouseover', fadeHandler.bind(0.5));
nav.addEventListener('mouseout', fadeHandler.bind(1));


/* =====================================================
   SMOOTH SCROLLING FOR NAV LINKS
   =====================================================
   Smoothly scrolls to sections when clicking nav links.
===================================================== */

const navLinksContainer = document.querySelector('.nav__links');

navLinksContainer.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent default anchor jump

  // Only scroll if a nav link was clicked
  if (!event.target.classList.contains('nav__link')) return;

  const sectionId = event.target.getAttribute('href'); // Get target section ID
  const targetSection = document.querySelector(sectionId);
  targetSection.scrollIntoView({ behavior: 'smooth' });
});


/* =====================================================
   "LEARN MORE" BUTTON SCROLL
   =====================================================
   Smoothly scrolls to Section 1 when the button is clicked.
===================================================== */

const btnScrollTo = document.querySelector('.btn--scroll-to');

btnScrollTo.addEventListener('click', function () {
  const targetSection = document.querySelector('#section--1');
  targetSection.scrollIntoView({ behavior: 'smooth' });
});


/* =====================================================
   OPERATIONS MODAL / TAB SWITCHING
   =====================================================
   Allows switching between tabbed content.
   Clicking a tab activates its content and deactivates others.
===================================================== */

// Select tab container, tabs, and tab contents
const operationsTabContainer = document.querySelector('.operations__tab-container');
const operationsTabs = document.querySelectorAll('.operations__tab');
const operationsContents = document.querySelectorAll('.operations__content');

// Event delegation for tab switching
operationsTabContainer.addEventListener('click', function (event) {
  const clicked = event.target.closest('.operations__tab'); // Get closest tab button
  if (!clicked) return; // Ignore clicks outside tabs

  // Remove active class from all tabs and activate the clicked one
  operationsTabs.forEach(tab => tab.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  // Remove active class from all content and show corresponding content
  operationsContents.forEach(content => content.classList.remove('operations__content--active'));
  const targetContent = document.querySelector(`.operations__content--${clicked.dataset.tab}`);
  targetContent.classList.add('operations__content--active');
});


/* =====================================================
   STICKY NAVIGATION ON SCROLL
   =====================================================
   Adds a sticky class to the nav when the header
   scrolls out of view using IntersectionObserver.
===================================================== */

const header = document.querySelector('.header');

/**
 * IntersectionObserver callback for sticky nav.
 * @param {IntersectionObserverEntry[]} entries - Intersection entries
 */
const stickyNav = function (entries) {
  const [entry] = entries; // Get the first (and only) entry

  if (!entry.isIntersecting) {
    nav.classList.add('sticky'); // Make nav sticky
  } else {
    nav.classList.remove('sticky'); // Remove sticky when header is visible
  }
};

// Create IntersectionObserver with a root margin to trigger early
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,           // Use viewport as root
  threshold: 0,         // Trigger when header leaves viewport even slightly
  rootMargin: '-90px',  // Trigger sticky 90px earlier than viewport top
});

// Observe the header
headerObserver.observe(header);
