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
  
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
  }

  function displayForecast() {
    let forecastElement = document.querySelector("#forecast");
   let days = ["Thu", "Fri", "Sat", "Sun"]; 
   let forecastHTML =`<div class="row">`;
    
    days.forEach(function(day) {
    forecastHTML = forecastHTML +`
   
    <div class="col-2">
    <div class="weather-forecast-date">
      ${day}
    </div>
      <img src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
      alt="" width="42" />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temp-max">
      18°
    </span>
    <span class="weather-forecast-temp-min">
     12°
    </span>
    </div>
    </div>
  
`; });

forecastHTML= forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
  }



function displayTemperature(response) {
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.name;
  
    let temperatureElement = document.querySelector("#temperature");
    celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
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
function search(city) {
let apiKey = "9a26aeeafb7f3d9e16e58f5effdd59d0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature)
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}


let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);



function showFahrenheitTemperature(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 +32; 
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
    
}
function showCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);



search("Kyiv");
displayForecast();