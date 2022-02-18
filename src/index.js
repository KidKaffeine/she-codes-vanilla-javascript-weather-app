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
  getForecast(response.data.coord);
}

function removeTimestamp(timestamp) {
  let now = new Date(timestamp * 1000);
  let day = now.getDay();
  let days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  return days[day];
}

function getForecast(coordinates) {
  let apiKey = `9b761912c6d0907fc2545d504bce9a80`;
  let apiEndPoint = `api.openweathermap.org`;
  let apiUrl = `https://${apiEndPoint}/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let showForecast = document.querySelector(`#weekly-forecast`);
  let showInHTML = `<div class="row m-0">`;
  forecast.forEach(function (dailyForecast, result) {
    if (result < 5) {
      showInHTML += `<div class="col-md-2 daily-forecast">
              <div>${removeTimestamp(dailyForecast.dt)}</div>
              <div>${Math.round(dailyForecast.temp.max)}° </div>
              <div>${Math.round(dailyForecast.temp.min)}°</div>
       <img src="http://openweathermap.org/img/wn/${
         dailyForecast.weather[0].icon
       }@2x.png" alt="weather-icon" width="30"/>
              </div>`;
    }
  });
  showInHTML += `</div>`;
  showForecast.innerHTML = showInHTML;
}

function getCoordinates(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(geoLocation);
}

function geoLocation(position) {
  let apiKey = `9b761912c6d0907fc2545d504bce9a80`;
  let apiEndPoint = `api.openweathermap.org`;
  apiUrl = `https://${apiEndPoint}/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let searchCity = document.querySelector(`#form, #search-button`);
searchCity.addEventListener(`submit`, search);

let allowCoordinates = document.querySelector(`#location-button`);
allowCoordinates.addEventListener(`click`, getCoordinates);

formatDate();
getCity(`Berlin`);
