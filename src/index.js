function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
    hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
    minutes = `0${minutes}`;
}
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = days[date.getDate()];
return `${day} ${hours}:${minutes}`;
}





function displayTemperature(response) {
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.weather[0].description;
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = response.data.main.humidity;
let windElement = document.querySelector("#wind");
windElement.innerHTML = Math.round(response.data.wind.speed);
let dateElement = document.querySelector("#date");
dateElement.innerHTML = formatDate(response.data.dt * 1000);
let iconElement = document.querySelector("#icon");
iconElement.setAttribute(
     "src",
`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
); 

}

let apiKey = "9a26aeeafb7f3d9e16e58f5effdd59d0";
let city = "Kyiv"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature)
