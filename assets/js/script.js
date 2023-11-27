// type city in search bar 

// display info about city

// current and future conditions

// city name, date, icon of weather, 
// temp, humidity, wind speed

// 5 day forecast

// search history
const API_Key = '3e0e9f7896f23481394fe11def7369f2';
const API_URL = 'http://api.openweathermap.org/data/2.5/';
const API_GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct?q=';

// User input from search bar
let cityEl = document.querySelector('.user-input');

// some function to do stuff .catch(err => console.err(err));
function displayWeather(city) {
  // Get coords from input
  const userReq = API_GEO_URL + city + '&limit=1' + '&appid=' + API_Key;
  
  fetch(userReq)
    .then((response) => response.json())
    .then((cityInfo) => {
      let lon = cityInfo[0].lon;
      let lat = cityInfo[0].lat;

      const forecastReq = API_URL + 'forecast?lat=' + lat + '&lon=' + lon + '&appid=' + API_Key + '&units=imperial';
      
      fetch(forecastReq)
      .then((response) => response.json())
      .then((info) => {
        console.log(info);

        let city = document.getElementById('city-choice');
        let date = document.getElementById('date');
        let temp = document.getElementById('temp');
        let wind = document.getElementById('wind');
        let humidity = document.getElementById('humidity');
        
        city.innerHTML = info.city.name;
        date.innerHTML = new Date(info.list[0].dt * 1000).toLocaleDateString();
        temp.innerHTML += ' ' + info.list[0].main.temp + '°F';
        wind.innerHTML += ' ' + info.list[0].wind.speed + 'mph';
        humidity.innerHTML += ' ' + info.list[0].main.humidity + '%';
      })
    })
}

// Allow stuff to happen when searchBtn is clicked
let searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', function() {
  let city = cityEl.value.replace(/[^\D]/g, '');
  if (city != '') {
    displayWeather(city);
  }
});