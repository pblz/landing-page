/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

var sections = []; // List to keep all sections
var navList; // List to keep dynamically filled navigation menu
var scrollTimer; // Timer to delay actions after scroll stops


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

function fillVars(){
    sections = document.querySelectorAll("[data-nav]");
    navList = document.getElementById("navbar__list");
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the nav
function populateNav() {
    // Iterate over html to get all sections: a section always has the attribute data-nav
    for (const section of sections) {
        // Create list element and link with href
        const newLi = document.createElement("li");
        var linkElement = document.createElement("a");
        // Fill in attributes and content of section
        linkElement.href = "#"+ section.id;
        linkElement.innerHTML=section.dataset.nav;
        linkElement.setAttribute("data-id", section.id);
        newLi.appendChild(linkElement);
        navList.appendChild(newLi);

        if (section.classList.contains("your-active-class")){
            newLi.classList.add("active");
        };
    }
}

// Add class 'active' to section when near top of viewport
function updateActiveSection() {
    for (const section of sections) {
        var rect = section.getBoundingClientRect();
        if (rect.top > -500) { // makes sure the active section does not begin when top barely visible
            var liList = navList.getElementsByTagName("li");
            var oldActiveElement = navList.getElementsByClassName("active")[0];
            if (oldActiveElement){
                oldActiveElement.classList.remove("active");
            }
            for (liEl of liList){
                    var s1 = liEl.textContent.toString();
                    var s2 = section.dataset.nav.toString();
                    if(s1 === s2){
                        liEl.classList.add("active");
                    }
            }
            break;
        }
    }
}

// Scroll to anchor ID using scrollTo event
function respondToNavClick(event){
    event.preventDefault();
    const targetElement = document.getElementById(event.target.dataset.id);
    if (targetElement) targetElement.scrollIntoView();
}

// Hide menu when user stops scrolling
function toggleMenu(){

    // User is scrolling, set Menu visible if not already
    const navMenu = document.getElementsByClassName("navbar__menu")[0];
    navMenu.removeAttribute("style");

    // clear if still running from previous scroll
    clearTimeout(scrollTimer);
    //Set new timer
    scrollTimer = window.setTimeout(changeVisibility, 40);
    console.log(scrollTimer);

}

function changeVisibility(){
    const navMenu = document.getElementsByClassName("navbar__menu")[0];
    navMenu.style.display = 'none';
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Populate global variables
document.addEventListener("DOMContentLoaded", fillVars);

// Build menu 
document.addEventListener("DOMContentLoaded", populateNav);

// Scroll to section on link click
document.getElementById("navbar__list").addEventListener("click", respondToNavClick);

// Set sections as active
document.addEventListener("scroll", updateActiveSection);

// Hide menu when user stops scrolling
document.addEventListener("scroll", toggleMenu);




