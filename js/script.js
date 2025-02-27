const carousel = document.querySelector(".auto__car");
const inputs = carousel.querySelectorAll("input");

const nextButton = document.getElementById("next-btn");
nextButton.addEventListener("click", nextSlide);

const prevButton = document.getElementById("prev-btn");
prevButton.addEventListener("click", prevSlide);

let currentIndex = 0;

// let touchStartX = 0;
// let touchEndX = 0;

function changeSlide() {
  inputs[currentIndex].checked = false;
  currentIndex = (currentIndex + 1) % inputs.length;
  inputs[currentIndex].checked = true;
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + inputs.length) % inputs.length;
  inputs[currentIndex].checked = true;
}

function nextSlide() {
  changeSlide();
}
