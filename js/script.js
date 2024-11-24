const worksLink = document.getElementById("works-btn");
const gitHubLink = document.getElementById("github-btn");
const contactLink = document.getElementById("contact-btn");

document.querySelector(".year").innerText = new Date().getFullYear();

// Init for carousel auto-slide
const carousel = document.querySelector(".auto__car");
const inputs = carousel.querySelectorAll("input");
const intervalTime = 5000; // time in milliseconds (5000 = 5 seconds)
let currentIndex = 0;
let timer;
let isPaused = false;

// Text effect on mouseOver/mouseOut

//contact
contactLink.addEventListener("mouseover", () => {
  contactLink.classList.add("glitch");
  console.log("over on contact");
});
contactLink.addEventListener("mouseout", () => {
  contactLink.classList.remove("glitch");
});

//works
worksLink.addEventListener("mouseover", () => {
  worksLink.classList.add("glitch");
});
worksLink.addEventListener("mouseout", () => {
  worksLink.classList.remove("glitch");
});

// GitHub Link
gitHubLink.addEventListener("mouseover", () => {
  gitHubLink.classList.add("glitch");
});
gitHubLink.addEventListener("mouseout", () => {
  gitHubLink.classList.remove("glitch");
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

// startTimer();
