const halloween = "31 Oct 2023";

const daysDisplay = document.querySelector("#days");
const hoursDisplay = document.querySelector("#hours");
const minutesDisplay = document.querySelector("#minutes");
const secondsDisplay = document.querySelector("#seconds");

function countdown() {
  const halloweenDate = new Date(halloween);
  const currentDate = new Date(); //these are of course in milliseconds

  const totalSeconds = (halloweenDate - currentDate) / 1000; //converts milliseconds to whole seconds

  const days = Math.floor(totalSeconds / 3600 / 24);

  const hours = Math.floor(totalSeconds / 3600) % 24;

  const minutes = Math.floor(totalSeconds / 60) % 60;

  const seconds = Math.floor(totalSeconds % 60);

  daysDisplay.textContent = days;
  hoursDisplay.textContent = hours;
  minutesDisplay.textContent = minutes;
  secondsDisplay.textContent = seconds;
}

countdown();

setInterval(countdown, 1000);
