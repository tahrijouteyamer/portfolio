const originalTitle = document.title;
const titles = {
  'en': {
    blur: "~ Come Back Anytime ~",
    focus: originalTitle
  },
  'de': {
    blur: "~ Komm jederzeit zurück ~",
    focus: originalTitle
  }
};

function getLanguage() {
  const url = window.location.href;
  if (url.includes('/de/')) {
    return 'de';
  }
  return 'en'; 
}

const language = getLanguage();


const blurTitle = titles[language].blur;
const focusTitle = titles[language].focus;

window.addEventListener('blur', () => {
  document.title = blurTitle;
});
window.addEventListener('focus', () => {
  document.title = focusTitle;
});

/*Custom Cursor*/
const customCursor = document.querySelector('.custom-cursor');
let mouseX = 0, mouseY = 0;
let isMoving = false;

function updateCursor() {
    if (isMoving) {
        customCursor.style.left = `${mouseX}px`;
        customCursor.style.top = `${mouseY}px`;
        isMoving = false;
    }
    requestAnimationFrame(updateCursor);
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMoving = true;
});


document.addEventListener('mouseover', (e) => {
    if (e.target.matches('a, button')) {
        customCursor.classList.add('enlarged');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.matches('a, button')) {
        customCursor.classList.remove('enlarged');
    }
});

updateCursor();

/*Change Background Header*/
function scrollHeader() {
  const header = document.getElementById("header");
  if (this.scrollY >= 50) header.classList.add("scroll-header");
  else header.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*Show Scroll Up*/
document.addEventListener('scroll', function() {
  const descriptionWords = document.querySelectorAll('.about__description span');
  const scrollPosition = window.scrollY + window.innerHeight;
  const descriptionTop = document.querySelector('.about__description').getBoundingClientRect().top + window.scrollY;
  const scrollOffset = scrollPosition - descriptionTop;


  const maxScrollForEffect = 300; 
  descriptionWords.forEach((word, index) => {
    const wordPosition = index * 3;
    const opacity = Math.min((scrollOffset - wordPosition) / maxScrollForEffect, 2);

    word.style.opacity = opacity > 0 ? opacity : 0;
  });
});

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight,
      sectionTop = current.offsetTop - 58,
      sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__menu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollActive);

/*Light Dark Theme*/
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconTheme = "bx-sun";

const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

const getCurrentTheme = () =>
  document.body.classList.contains(lightTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx bx-moon" : "bx bx-sun";

if (selectedTheme) {
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    lightTheme
  );
  themeButton.classList[selectedIcon === "bx bx-moon" ? "add" : "remove"](
    iconTheme
  );
}

themeButton.addEventListener("click", () => {
  // Add or remove the light / icon theme
  document.body.classList.toggle(lightTheme);
  themeButton.classList.toggle(iconTheme);
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});
// Full code might be added later
