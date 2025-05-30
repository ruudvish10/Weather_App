//Enabling strict mode
"use strict";

//Grab references to DOM elements once for efficiency
const cityInput = document.getElementById("city-input");
const searchBtn = document.getElementById("search-btn");
const weatherDiv = document.getElementById("weather");

//Async function to fetch the weather API
async function getWeather(city){
    try{
        const response = await fetch(`/api/weather-proxy?city=${city}`);           //Fetch response data from API
        if (!response.ok) throw new Error("City not found!");                      //Check if HTTP request failed

        //Parse JSON response
        const data = await response.json();                          //await pauses execution until the fetch executes

        updateDOM(data);                                                           //Update weather info with new data

        const forecastRes =  await fetch(`/api/forecast-proxy?city=${city}`);      //Fetch forecast data

        if (!forecastRes.ok) throw new Error("Forecast not available!");    //Check if HTTP request failed for forecasts
        const forecastData = await forecastRes.json();                            //Parse JSON

        //Update weather with forecast data
        showForecast(forecastData.list);                                           //Show first forecast
    }

    //Handle errors
    catch(error){
        weatherDiv.innerHTML = `<p class="error">Error: ${error.message}</p>`;
        console.error("Failed to fetch the weather data. Please try again:", error);
        handleError();                                                //Call the handle error function on an error
    }
}

//Function to hide the forecast panel when city not found or on error
    function handleError() {
        const forecastContainer = document.getElementById("forecast-container")
        if(forecastContainer) forecastContainer.style.display = "none";
    }

//The actual DOM update function
function updateDOM(data) {
    //Destructure common properties from the object and/or nested objects
    const {name, main, weather, wind} = data;
    const {temp, feels_like, temp_min, temp_max} = main;
    const {speed} = wind;
    const {description, icon} = weather[0];             //Weather is an array that holds weather properties

    //HTML template with weather data
    weatherDiv.innerHTML = `
        <div class="weather-container">
            <h2>${name}</h2>
            <div class="weather-header">
                <div class="main-temp">${Math.round(temp)}°C</div> 
                <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
                <p>${description}</p>
            </div>
            <div class="weather-attributes"> 
                <p>Feels like: ${Math.round(feels_like)}°C</p>
                <p>Min: ${Math.round(temp_min)}°C</p>
                <p>Max: ${Math.round(temp_max)}°C</p>
                <p>Wind: ${Math.round(speed)} m/s</p>
            </div>
        </div>
        `
         ;
}

//Forecast function 5-day 
function showForecast(forecastList) {
    const forecastContainer = document.getElementById("forecast-container");
    if(!forecastContainer) return;                          //Safety check
    forecastContainer.style.display = "block";              //Show only when data is valid

    //Get one midday forecast per day filtered by a 24 hr period. Assuming the weather API updates every 3 hrs (3x8 = 24)
    //Slice gives the first five forecasts
    const middayForecasts = forecastList.filter((_, index) => index % 8 === 4).slice(0, 5); 

    //HTML for 5-day forecasts
    forecastContainer.innerHTML = `
        <h2>5-Day Forecast</h2>
        <div class="forecast-days">
            ${middayForecasts.map(day => `
                <div class="day">
                    <p>${new Date(day.dt * 1000).toLocaleDateString("en", {weekday: "short"})}</p>
                    <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png" alt="${day.weather[0].description}">
                    <p>${Math.round(day.main.temp)} °C</p>
                    <small>12 PM</small>
                </div>
            `).join("")}
        </div>
        `;
}

//Event listeners

//Handle button clicks
searchBtn.addEventListener("click", () => {
const city = cityInput.value.trim();     //Trims any whitespaces 
if (city) getWeather(city);             //Fetch only if city isn't empty
else if (city === "") alert("Please enter a city!");              
});

//Handle keyboard 'enter' key
cityInput.addEventListener("keypress", (e) => {
const city = cityInput.value.trim();
if (e.key === "Enter" && city) getWeather(city);
else if (e.key === "Enter" && city === "") alert("Please enter a city!")
});