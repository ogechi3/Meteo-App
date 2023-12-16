function updateWeather(response) {
  let temperatureElement = document.querySelector("#top-temp");
  let temperature = response.data.temperature.current;
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");

  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}"class="weather-icon" />`;

  getForecast(response.data.city);

  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = `7fa2303eo545aaff0tfbf93c4ef484a6`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(updateWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let searchElement = document.querySelector("#search-city-input");

  searchCity(searchElement.value);
}

function getForecast(city) {
  let apiKey = "7fa2303eo545aaff0tfbf93c4ef484a6";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return day[date.getDay()];
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        ` 
              <div class="weather-forecast-date">${formatDay(day.time)}
              
              <div>
                <img
                  src="${day.condition.icon_url}"
                  class="forecast-icon"
                />
              </div>
              <div class="weather-temperatures">
                <div>
                  <strong class="max-forecast-temperature">${Math.round(
                    day.temperature.maximum
                  )}°</strong>
                  <span class="min-forecast-temperature">${Math.round(
                    day.temperature.minimum
                  )}°</span>
                </div>
              </div>
              </div>
          
          `;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let FormElement = document.querySelector("#form-input");
FormElement.addEventListener("submit", handleSearch);

searchCity("london");
displayForecast();
