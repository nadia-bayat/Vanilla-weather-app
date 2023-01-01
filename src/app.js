let dateTime = document.querySelector("#dateTime");
let now = new Date();

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let date = now.getDate();
let hour = now.getHours();
if (hour < 10) {
  minute = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> 18° </span>
          <span class="weather-forecast-temperature-min"> 12° </span>
        </div>
      </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let iconElement = document.querySelector("#icon");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  dateTime.innerHTML = `${month} ${date}, ${hour}:${minute}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}
function search(city) {
  let apiKey = "c651b570409fd5da2a6ffe01cfd48b43";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  search(city);
}
displayForecast();
search("Rome");
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#fLink");
let celciusLink = document.querySelector("#cLink");

farenheitLink.addEventListener("click", showFTemperature);
function showFTemperature(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  let fTemp = (12 * 9) / 5 + 32;
  temp.innerHTML = Math.round(fTemp);
}
celciusLink.addEventListener("click", showCTemperature);
function showCTemperature(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature");
  let cTemp = ((53.6 - 32) * 5) / 9;
  temp.innerHTML = Math.round(cTemp);
}
