const carousel = document.querySelector(".auto__car");
const inputs = carousel.querySelectorAll("input");
const intervalTime = 5000; // time in milliseconds (5000 = 5 seconds)
let currentIndex = 0;
let timer;
let isPaused = false;

let touchStartX = 0;
let touchEndX = 0;

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

// Detect touch start
carousel.addEventListener("touchstart", (event) => {
  touchStartX = event.changedTouches[0].screenX;
});

// Detect touch move
carousel.addEventListener("touchmove", (event) => {
  touchEndX = event.changedTouches[0].screenX;
});

// Detect touch end to figure out swipe direction
carousel.addEventListener("touchend", () => {
  if (touchEndX < touchStartX) {
    // Swiped left
    changeSlide(); // Move to the next slide
  }
  if (touchEndX > touchStartX) {
    // Swiped right
    currentIndex = (currentIndex - 1 + inputs.length) % inputs.length;
    inputs[currentIndex].checked = true; // Move to the previous slide
  }

  // Restart the timer after a swipe
  stopTimer();
  startTimer();
});

// Pause and resume carousel on hover
carousel.addEventListener("mouseenter", pause);
carousel.addEventListener("mouseleave", resume);

startTimer();
