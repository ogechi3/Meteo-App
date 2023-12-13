function updateWeather(response) {
  let temperatureElement = document.querySelector("#top-temp");
  let temperature = response.data.temperature.current;
  let h1 = document.querySelector("#city");
  h1.innerHTML = response.data.city;

  temperatureElement.innerHTML = Math.round(temperature);
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

let FormElement = document.querySelector("#form-input");
FormElement.addEventListener("submit", handleSearch);

searchCity("london");
