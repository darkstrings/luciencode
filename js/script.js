const aboutLink = document.getElementById("about");
const worksLink = document.getElementById("works");
const gitHubLink = document.getElementById("github");
const contactLink = document.getElementById("contact");
const contentDisplay = document.querySelector(".content");
const contactDisplay = document.querySelector(".contact");
document.querySelector(".year").innerText = new Date().getFullYear();

// Init for carousel auto-slide
const carousel = document.querySelector(".auto__car");
const inputs = carousel.querySelectorAll("input");
const intervalTime = 5000; // time in milliseconds (5000 = 5 seconds)
let currentIndex = 0;
let timer;
let isPaused = false;

// Text effect on mouseOver/mouseOut

// About
aboutLink.addEventListener("mouseover", () => {
  aboutLink.classList.add("link_glitch");
});
aboutLink.addEventListener("mouseout", () => {
  aboutLink.classList.remove("link_glitch");
});

//contact
contactLink.addEventListener("mouseover", () => {
  contactLink.classList.add("link_glitch");
});
contactLink.addEventListener("mouseout", () => {
  contactLink.classList.remove("link_glitch");
});

//works
worksLink.addEventListener("mouseover", () => {
  worksLink.classList.add("link_glitch");
});
worksLink.addEventListener("mouseout", () => {
  worksLink.classList.remove("link_glitch");
});

// GitHub Link
gitHubLink.addEventListener("mouseover", () => {
  gitHubLink.classList.add("link_glitch");
});
gitHubLink.addEventListener("mouseout", () => {
  gitHubLink.classList.remove("link_glitch");
});

// Prevent scrolling on clicks on thumbnails.

const thumbnailLabels = document.querySelectorAll(".carousel__thumbnails label");

thumbnailLabels.forEach((label) => {
  label.addEventListener("click", (event) => {
    event.preventDefault();
    const radioInput = document.querySelector(`#${label.htmlFor}`);
    radioInput.click();
  });
});

// Auto slide on carousel

function changeSlide() {
  if (isPaused) return;

  inputs[currentIndex].checked = false;
  currentIndex = (currentIndex + 1) % inputs.length;
  inputs[currentIndex].checked = true;
}

function startTimer() {
  timer = setInterval(changeSlide, intervalTime);
}

function stopTimer() {
  clearInterval(timer);
}

function pause() {
  isPaused = true;
  stopTimer();
}

function resume() {
  isPaused = false;
  startTimer();
}

carousel.addEventListener("mouseenter", pause);
carousel.addEventListener("mouseleave", resume);

startTimer();
