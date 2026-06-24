'use strict';

// ============================================================
//  SECTION 1 — SIDEBAR (Show / Hide Contact Info)
// ============================================================
const sidebar = document.querySelector('[data-sidebar]');
// Same idea — finds the <button> that has the attribute "data-sidebar-btn".
const sidebarBtn = document.querySelector('[data-sidebar-btn]');

// addEventListener() watches an element for a specific event.
sidebarBtn.addEventListener('click', function () {

  sidebar.classList.toggle('active');

});


// ============================================================
//  SECTION 2 — NAVIGATION (Switch Between Pages)
// ============================================================

const navLinks = document.querySelectorAll('[data-nav-link]');

const pages = document.querySelectorAll('[data-page]');

navLinks.forEach(function (link) {

  link.addEventListener('click', function () {

    // .textContent reads the visible text inside an element.
    // So "About" becomes "about", "Resume" becomes "resume", etc.
    // We need this because the data-page values are all lowercase:
    //   data-page="about", data-page="resume", etc.
    const clickedPage = link.textContent.toLowerCase();

    // --- Update which NAV BUTTON looks active ---

    // First, remove 'active' from ALL nav buttons
    navLinks.forEach(function (navLink) {
      navLink.classList.remove('active');
    });

    // Then add 'active' only to the one that was just clicked.
    // 'link' here refers to the button that triggered the click event.
    link.classList.add('active');

    // --- Update which PAGE SECTION is visible ---

    pages.forEach(function (page) {

      if (page.dataset.page === clickedPage) {
        // This is the page the user wants to see — show it.
        page.classList.add('active');
      } else {
        // All other pages — hide them.
        page.classList.remove('active');
      }

    });

  });

});


// ============================================================
//  SECTION 3 — PORTFOLIO FILTER
// ============================================================

// Get all the category filter buttons (All, Web Design, etc.)
const filterBtns = document.querySelectorAll('[data-filter-btn]');

// Get all the individual project cards in the portfolio grid.
// Each <li> has a data-category="..." attribute, e.g. data-category="web design"
const filterItems = document.querySelectorAll('[data-filter-item]');

// This variable keeps track of which filter is currently chosen.
// Starts with 'all' so every project is visible when the page loads.
let selectedFilter = 'all';

filterBtns.forEach(function (btn) {

  btn.addEventListener('click', function () {

    // Read the text of the clicked filter button and lowercase it.
    selectedFilter = btn.textContent.toLowerCase();

    // --- Update which FILTER BUTTON looks selected ---
    filterBtns.forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    // --- Show or hide each PROJECT CARD ---
    filterItems.forEach(function (item) {

      // Read the data-category="..." attribute from the project card.
      const itemCategory = item.dataset.category.toLowerCase();

      // Show the card if:
      //   1. The user chose "All" (selectedFilter === 'all'), OR
      //   2. The card's category matches the selected filter.
      // The || operator means OR — the condition is true if EITHER side is true.
      if (selectedFilter === 'all' || itemCategory === selectedFilter) {
        item.classList.add('active');    // visible
      } else {
        item.classList.remove('active'); // hidden
      }

    });

  });

});


// ============================================================
//  SECTION 4 — CONTACT FORM VALIDATION
// ============================================================

// Get the <form> element.
const form = document.querySelector('[data-form]');

// Get all three input fields: Full name, Email, and Message textarea.
const formInputs = document.querySelectorAll('[data-form-input]');

// Get the Send Message button.
// It starts with the HTML attribute disabled, so it can't be clicked yet.
const formBtn = document.querySelector('[data-form-btn]');

// We want to enable the button only when the user has filled in all fields.
// We listen to the 'input' event on each field — this fires every single time
// the user types a character, pastes text, or clears a field.
formInputs.forEach(function (input) {

  input.addEventListener('input', function () {

    // Checks ALL fields with the "required" attribute inside the form
    // and returns true if they are all valid, or false if any are empty/invalid.
    if (form.checkValidity()) {

      // All fields are filled in — activate the button.
      // removeAttribute('disabled') removes the HTML attribute that was blocking clicks.
      formBtn.removeAttribute('disabled');

    } else {

      // Something is still missing or invalid — keep the button disabled.
      // setAttribute(name, value) adds or updates an HTML attribute.
      // The empty string '' is the conventional value for boolean HTML attributes like disabled.
      formBtn.setAttribute('disabled', '');

    }

  });

});
