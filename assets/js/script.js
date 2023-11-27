// type city in search bar 

// display info about city

// current and future conditions

// city name, date, icon of weather, 
// temp, humidity, wind speed

// 5 day forecast

// search history
const API_Key = '3e0e9f7896f23481394fe11def7369f2';
const API_URL = 'http://api.openweathermap.org/data/2.5/';

// User input from search bar
let cityEl = document.querySelector('.user-input');

// some function to do stuff

// Allow stuff to happen when searchBtn is clicked
let searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', function() {
  let city = cityEl.value.replace(/[^\D]/g, '');
  if (city != '') {
    // callback to function goes here
  }
});