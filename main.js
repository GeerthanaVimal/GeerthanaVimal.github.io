/* =========================================================
   BOOK PAGE NAVIGATION + CONTENT SCROLL
   ========================================================= */

const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".navbar a");

const pageNames = [
    "HOME",
    "ABOUT",
    "RESEARCH",
    "PROJECTS",
    "SKILLS",
    "CONTACT"
];

let currentPage = 0;

const pageCounter = document.getElementById("pageCounter");


/* =========================================================
   FIND CURRENT PAGE SCROLL AREA
   ========================================================= */

function getCurrentScrollArea() {

    const currentPageElement = pages[currentPage];

    if (!currentPageElement) {
        return null;
    }

    return currentPageElement.querySelector(".page-inner");

}


/* =========================================================
   RESET SCROLL TO TOP
   ========================================================= */

function resetPageScroll(page) {

    if (!page) {
        return;
    }

    const scrollArea = page.querySelector(".page-inner");

    if (scrollArea) {

        scrollArea.scrollTop = 0;

    }

}


/* =========================================================
   SCROLL CURRENT PAGE
   ========================================================= */

function scrollCurrentPage(direction) {

    const scrollArea = getCurrentScrollArea();

    if (!scrollArea) {
        return;
    }

    const scrollAmount = 450;


    /* Scroll toward bottom */

    if (direction === "down") {

        scrollArea.scrollBy({

            top: scrollAmount,

            left: 0,

            behavior: "smooth"

        });

    }


    /* Scroll toward top */

    if (direction === "up") {

        scrollArea.scrollBy({

            top: -scrollAmount,

            left: 0,

            behavior: "smooth"

        });

    }

}


/* =========================================================
   INITIALIZE BOOK
   ========================================================= */

function initializeBook() {

    pages.forEach(function(page, index) {

        page.style.zIndex = pages.length - index;

        resetPageScroll(page);

    });

    updateNavigation();

    updateCounter();

}


/* =========================================================
   UPDATE NAVIGATION
   ========================================================= */

function updateNavigation() {

    navLinks.forEach(function(link, index) {

        link.classList.remove("active");

        if (index === currentPage) {

            link.classList.add("active");

        }

    });

}


/* =========================================================
   NEXT BOOK PAGE
   ========================================================= */

function nextPage() {

    if (currentPage >= pages.length - 1) {

        return;

    }

    pages[currentPage].classList.add("flipped");

    currentPage++;

    resetPageScroll(pages[currentPage]);

    updateNavigation();

    updateCounter();

}


/* =========================================================
   PREVIOUS BOOK PAGE
   ========================================================= */

function previousPage() {

    if (currentPage <= 0) {

        return;

    }

    currentPage--;

    pages[currentPage].classList.remove("flipped");

    resetPageScroll(pages[currentPage]);

    updateNavigation();

    updateCounter();

}


/* =========================================================
   GO DIRECTLY TO PAGE
   ========================================================= */

function goToPage(pageNumber) {

    if (
        pageNumber < 0 ||
        pageNumber >= pages.length
    ) {

        return;

    }


    pages.forEach(function(page, index) {

        if (index < pageNumber) {

            page.classList.add("flipped");

        }

        else {

            page.classList.remove("flipped");

        }

    });


    currentPage = pageNumber;

    resetPageScroll(pages[currentPage]);

    updateNavigation();

    updateCounter();

}


/* =========================================================
   UPDATE PAGE COUNTER
   ========================================================= */

function updateCounter() {

    if (!pageCounter) {

        return;

    }

    pageCounter.textContent =
        pageNames[currentPage];

}


/* =========================================================
   NAVIGATION CLICK
   ========================================================= */

navLinks.forEach(function(link, index) {

    link.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            goToPage(index);

        }
    );

});


/* =========================================================
   KEYBOARD BOOK NAVIGATION
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "ArrowRight") {

            nextPage();

        }

        if (event.key === "ArrowLeft") {

            previousPage();

        }

    }
);


/* =========================================================
   TOUCH / SWIPE BOOK NAVIGATION
   ========================================================= */

let touchStartX = 0;
let touchStartY = 0;


document.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[0].screenX;

        touchStartY =
            event.changedTouches[0].screenY;

    },
    { passive: true }
);


document.addEventListener(
    "touchend",
    function(event) {

        const touchEndX =
            event.changedTouches[0].screenX;

        const touchEndY =
            event.changedTouches[0].screenY;


        const differenceX =
            touchStartX - touchEndX;

        const differenceY =
            touchStartY - touchEndY;


        /*
         * Vertical movement should scroll content.
         * Only a stronger horizontal movement turns pages.
         */

        if (
            Math.abs(differenceX) <=
            Math.abs(differenceY)
        ) {

            return;

        }


        /* Swipe left → next page */

        if (differenceX > 50) {

            nextPage();

        }


        /* Swipe right → previous page */

        if (differenceX < -50) {

            previousPage();

        }

    },
    { passive: true }
);


/* =========================================================
   START BOOK
   ========================================================= */

initializeBook();