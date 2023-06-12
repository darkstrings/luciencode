const main = document.querySelector(".weather");
const cityDisplay = document.querySelector(".city");
const tempDisplay = document.querySelector(".temp");
const descriptionDisplay = document.querySelector(".description");
const humidityDisplay = document.querySelector(".humidity");
const windDisplay = document.querySelector(".wind");
const searchBtn = document.querySelector(".search button");
const searchInput = document.querySelector(".search-bar");
const icon = document.querySelector(".icon");

searchBtn.addEventListener("click", function () {
  const city = searchInput.value;
  getWeather(city);
});

searchInput.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    const city = searchInput.value;
    getWeather(city);
  }
});

const apiKey = "4001d5371c98e55c06f10772784952d6";

function degreesToCompass(deg) {
  const directions = ["North", "Northeast", "East", "Southeast", "South", "Southwest", "West", "Northwest"];
  let degrees = (deg * 8) / 360;
  degrees = Math.round(degrees, 0);
  degrees = (degrees + 8) % 8;
  return directions[degrees];
}

async function getWeather(city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`);

  const data = await response.json();

  console.log(data);

  cityDisplay.innerHTML = data.name;

  tempDisplay.innerHTML = `${Math.floor(data.main.temp)}°F`;

  descriptionDisplay.innerHTML = `${data.weather[0].main} `;

  icon.src = `http://www.openweathermap.org/img/wn/${data.weather[0].icon}.png`;

  windDisplay.innerHTML = `Winds: ${degreesToCompass(data.wind.deg)} at ${Math.floor(data.wind.speed)} MPH`;

  humidityDisplay.innerHTML = `Humidity ${data.main.humidity}%`;
  main.classList.remove("loading");
  document.body.style.backgroundImage = `url(https://source.unsplash.com/1600x900/?${data.name}`;
}

getWeather("cleveland");

// https://api.openweathermap.org/data/2.5/weather?q=cleveland&appid=4001d5371c98e55c06f10772784952d6
