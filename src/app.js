function displayTemperature(response) {
  console.log(response.data);
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let description = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  description.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
}
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
let minute = now.getMinutes();
dateTime.innerHTML = `${month} ${date}, ${hour}:${minute}`;

let apiKey = "c651b570409fd5da2a6ffe01cfd48b43";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Rome&appid=${apiKey}&units=metric`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(displayTemperature);
