const apiKey = "4092b29efa1de2d87b695e8b409c2f91";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherIcon = document.querySelector(".weather-icon img");
const weatherDisplay = document.getElementById("weatherDisplay");
const errorDisplay = document.getElementById("errorDisplay");

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim();
  if (city === "") return;

  checkWeather(city);
});

async function checkWeather(city) {
  try {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    updateWeatherInfo(data);
    errorDisplay.style.display = "none";
    weatherDisplay.style.display = "block";
  } catch (error) {
    errorDisplay.style.display = "block";
    weatherDisplay.style.display = "none";
  }
}

function updateWeatherInfo(data) {
  document.querySelector(".city").textContent = data.name;
  document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
  document.querySelector(".humidity").textContent = data.main.humidity + "%";
  document.querySelector(".wind").textContent = data.wind.speed + " km/h";
  document.querySelector(".Files.Like").textContent = "Files Like: " + Math.round(data.main.feels_like) + "°C";

  const highTempElement = document.querySelector(".high-temp");
  const lowTempElement = document.querySelector(".low-temp");
  const highTemperature = Math.round(data.main.temp_max);
  const lowTemperature = Math.round(data.main.temp_min);

  
  highTempElement.textContent = `H: ${highTemperature}°C`;
  lowTempElement.textContent = `L: ${lowTemperature}°C`;

  const weatherMain = data.weather[0].main;
  updateWeatherIcon(weatherMain);
}

function updateWeatherIcon(weatherMain) {
  const weatherImages = {
    Clouds: "images/clouds.png",
    Rain: "images/rain.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
    Clear: "images/clear.png",
    Snow: "images/snow.png",
  };

  const weatherImgSrc = weatherImages[weatherMain];
  weatherIcon.src = weatherImgSrc;
}

const weatherMain = data.weather[0].main;
  updateWeatherIcon(weatherMain);
  updateBackground(weatherMain);

function updateBackground(weatherMain) {
  const body = document.querySelector("body");

  // Check if it is night time
  const currentHour = new Date().getHours();
  const isNightTime = currentHour >= 18 || currentHour < 6;

  if (weatherMain === "Clear" && isNightTime) {
    body.classList.add("dark-background");
  } else {
    body.classList.remove("dark-background");
  }
}