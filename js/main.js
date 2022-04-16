// Setting dimensions for body and main container
// Used height of browser window 
function getWindow() {

    // Declaring variables 
    const bodyHeight = document.querySelector('body');
    const headerHeight = document.querySelector('.header-container');
    const mainHeight = document.querySelector('.main');

    // Assigning style min-height for body
    bodyHeight.style.minHeight = window.innerHeight + 'px';

    // Assigning style min-height for main container 
    // Counting browser window minus header height
    mainHeight.style.minHeight = (window.innerHeight - headerHeight.offsetHeight) + 'px';

    if (window.innerWidth > 992) {
        getMargin()
    }
}

// Function to calculate margin of site header
// Required to calculate width of main nav
function getMargin() {
    const siteHeader = document.querySelector('.site-header');
    const mainNav = document.querySelector('.main-nav');
    const siteHeaderMargin = parseInt(getComputedStyle(siteHeader).marginLeft);
    const mainNavWidth = (window.innerWidth - siteHeaderMargin - 450) + 'px';
    mainNav.style.width = mainNavWidth;
}


// Mobile menu open | Add or remove classes
function openMenu() {
    const mainNav = document.querySelector('.main-nav');
    const menuButton = document.querySelector('.nav-open');
    if (mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        menuButton.classList.remove('hidden');
    } else {
        mainNav.classList.add('active');
        menuButton.classList.add('hidden');
    }
}