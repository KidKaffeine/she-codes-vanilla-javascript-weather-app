function formatDate(date, time) {
  let now = new Date();
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[now.getDay()];
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let update = document.querySelector(`#update`);
  update.innerHTML = `Last Updated: ${day}, ${hours}:${minutes}h`;
}

function search(event) {
  event.preventDefault();
  let city = document.querySelector(`#search-input`).value;
  let displayHeading = document.querySelector(`#heading`);
  displayHeading.innerHTML = `${city}`;
  getCity(city);
}

function getCity(city) {
  let apiKey = `9b761912c6d0907fc2545d504bce9a80`;
  let apiEndPoint = `api.openweathermap.org`;
  let apiUrl = `https://${apiEndPoint}/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  console.log(response.data);
  let cityName = document.querySelector(`#heading`);
  let currentTemperature = document.querySelector(`#temperature`);
  let overview = document.querySelector(`#description`);
  let feelsLike = document.querySelector(`#real-feel`);
  let wind = document.querySelector(`#wind-speed`);
  let humidity = document.querySelector(`#humidity`);
  let icon = document.querySelector(`#weather-icon`);
  cityName.innerHTML = response.data.name;
  currentTemperature.innerHTML = `${Math.round(response.data.main.temp)}°C`;
  overview.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = `Real Feel: ${Math.round(
    response.data.main.feels_like
  )}°C`;
  wind.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function getCoordinates(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(apiCoordinates);
}

function apiCoordinates(position) {
  let apiKey = `9b761912c6d0907fc2545d504bce9a80`;
  let apiEndPoint = `api.openweathermap.org`;
  apiUrl = `https://${apiEndPoint}/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let coordinates = document.querySelector(`#location-button`);
coordinates.addEventListener(`click`, getCoordinates);

let searchCity = document.querySelector(`#form, #search-button`);
searchCity.addEventListener(`submit`, search);

formatDate();
getCity(`Berlin`);
