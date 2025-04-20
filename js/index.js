////////////////////////////////////////////////
// REVEALING HERO CONTEXT
const allSection = document.querySelectorAll("section");
const revealSection = function (entries, observer) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

/////////////////////////////////////////////////////
// FUNCTIONALITY FOR MENU
const navBar = document.querySelector(".navbar");
const menu = document.querySelector(".menu");
const closeMenu = document.querySelector(".close");
const openMenu = document.querySelector(".open");
menu.addEventListener("click", function () {
  openMenu.classList.toggle("hidden");
  closeMenu.classList.toggle("hidden");
  if (navBar.classList.toggle("active")) {
    document.querySelector("body").style.overflow = "hidden";
  } else {
    document.querySelector("body").style.overflow = "visible";
  }

  // document
  //   .querySelectorAll(".section")
  //   .forEach((sect) => sect.classList.toggle("filter"));

  // document.querySelector(".menu-header").classList.toggle("active");
});

/////////////////////////////////////////////////////
// FUNCTIONALITY FOR DROPDWOM
const dropDown = document.querySelector(".dropdown");
const leftCaret = document.querySelector(".left-caret");
const downCaret = document.querySelector(".down-caret");
const dropdownContent = document.querySelector(".dropdown-content");
dropDown.addEventListener("click", function () {
  leftCaret.classList.toggle("hidden");
  downCaret.classList.toggle("hidden");
  dropdownContent.classList.toggle("active");
});

/////////////////////////////////////////////////
// FUNCTIONALITY FOR BLOG
import { state, fetchArticles, updateSearchQuery } from "./blogArticle.js";

document.getElementById("search-btn").addEventListener("click", () => {
  let queryInput = document.getElementById("search-input").value.trim();

  if (queryInput) {
    updateSearchQuery(queryInput);
  } else {
    alert("Please enter search item.");
  }
  document.getElementById("search-input").value = "";
});

document.getElementById("next-btn").addEventListener("click", () => {
  if (state.currentPage * state.pageSize < state.totalArticle) {
    state.currentPage++;
    fetchArticles(state.searchQuery, state.currentPage);
  }
});

document.getElementById("prev-btn").addEventListener("click", () => {
  if (state.currentPage > 1) {
    state.currentPage--;
    fetchArticles(state.searchQuery, state.currentPage);
  }
});

// Fetch default news on load
fetchArticles();

///////////////////////////////////////
// CURRENT YEAR
const footerDate = document.querySelector(".footer-date");
const getYear = function () {
  const now = new Date();
  const year = now.getFullYear();
  footerDate.innerHTML = year;
};
getYear();

///////////////////////////////////////////////
// FUNCTIONALITY FOR SLIDES
let index = 0;
const slides = document.querySelectorAll(".hero-slide");

function showNextSlide() {
  slides[index].classList.remove("current");
  index = (index + 1) % slides.length;
  slides[index].classList.add("current");
}

setInterval(showNextSlide, 3000);

//////////////////////////////////////
// SLIDES
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      curSlide = Number(e.target.dataset.slide);
      goToSlide(curSlide);
      activateDot(curSlide);
    }
  });
};

slider();

//////////////////////////////////////////////
const windowWidth = window.innerWidth;
const scrollH = window.scrollY;
console.log(windowWidth, scrollH);
const addStickyHeader = function () {
  const windowWidth = window.innerWidth;
  const scrollY = window.scrollY;
  if (windowWidth >= 1200 && scrollY > 200) {
    document.querySelector(".sticky-header").classList.add("sticky");
  } else {
    document.querySelector(".sticky-header").classList.remove("sticky");
  }
};
addStickyHeader();
window.addEventListener("scroll", addStickyHeader);
window.addEventListener("resize", addStickyHeader);
