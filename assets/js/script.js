const API_Key = '3e0e9f7896f23481394fe11def7369f2';
const API_URL = 'http://api.openweathermap.org/data/2.5/';
const API_GEO_URL = 'http://api.openweathermap.org/geo/1.0/direct?q=';

// User input from search bar
let cityEl = document.querySelector('.user-input');
let container = document.querySelector('.card-box');

// some function to do stuff
function displayWeather(city) {
  // Get coords from input
  const userReq = API_GEO_URL + city + '&limit=1' + '&appid=' + API_Key;
  // Fetch data using userReq 
  fetch(userReq)
    .then((response) => response.json())
    .then((cityInfo) => {
      let lon = cityInfo[0].lon;
      let lat = cityInfo[0].lat;

      const forecastReq = API_URL + 'forecast?lat=' + lat + '&lon=' + lon + '&appid=' + API_Key + '&units=imperial';
      // Fetch data using the longitude and latitude of the user given city
      fetch(forecastReq)
      .then((response) => response.json())
      .then((info) => {
        console.log(info);
        // Display current weather
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

        // Display 5-day forecast
        let i = 0;
        let x = 0;
        while (i < 5) {
          i++;
          x = x + 7;
          // Grab info from api
          let date = new Date(info.list[x].dt * 1000).toLocaleDateString();
          let temp = info.list[x].main.temp + '°F';
          let wind = info.list[x].wind.speed + 'mph';
          let humidity = info.list[x].main.humidity + '%';
          let icon = info.list[x].weather[0].icon;
          let grabIcon = `http://openweathermap.org/img/w/${icon}.png`;
          // Create div for day
          let day = document.createElement('div');
          day.classList.add('card');
          day.innerHTML = `
          <h3>${date}</h3>
          <img src = '${grabIcon}'>
          <h4>Temp: ${temp}</h4>
          <h4>Wind: ${wind}</h4>
          <h4>Humidity: ${humidity}</h4>`
          ; container.appendChild(day);
        }
      }) .catch(err => console.error(err));
    }) .catch(err => console.error(err));
}

function history(city) {
  sessionStorage.setItem('name', city);

  let searchArea = document.querySelector('.search-area');
  let btn = document.createElement('button');
  btn.classList.add('btn');
  btn.textContent = city;
  searchArea.appendChild(btn);
}

// Allow stuff to happen when searchBtn is clicked
let searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', function() {
  let city = cityEl.value.replace(/[^\D]/g, '');
  if (city != '') {
    history(city);
    displayWeather(city);
  }
});

// Check if there are any searched cities and conditionally render the clear button
function toggleClearButton() {
  let searchArea = document.querySelector('.search-area');
  let buttons = searchArea.querySelectorAll('.btn');
  let clearButton = document.querySelector('.clear-btn');
  
  if (buttons.length > 0) {
    if (!clearButton) {
      // Create and append the clear button if it doesn't exist
      clearButton = document.createElement('button');
      clearButton.classList.add('clear-btn');
      clearButton.textContent = 'Clear';
      clearButton.addEventListener('click', clearSearchedCities);
      searchArea.appendChild(clearButton);
    }
  } else if (clearButton) {
    // Remove the clear button if no searched cities are present
    searchArea.removeChild(clearButton);
  }
}

// Call toggleClearButton function after manipulating search buttons
toggleClearButton();

// Clear searched cities from the search area
function clearSearchedCities() {
  let searchArea = document.querySelector('.search-area');
  // Remove all child elements which are buttons with class 'btn'
  let buttons = searchArea.querySelectorAll('.btn');
  buttons.forEach(function(btn) {
    searchArea.removeChild(btn);
  });
}

// Add event listener to a clear button if it exists
let clearBtn = document.querySelector('.clear-btn');
if (clearBtn) {
  clearBtn.addEventListener('click', clearSearchedCities);
}

// Refactor the searchBtn event listener to prevent creating multiple buttons for the same city
searchBtn.addEventListener('click', function() {
  let city = cityEl.value.trim().replace(/[^\w\s]/g, ''); // Also trim whitespace and remove non-alphanumeric characters
  if (city !== '') {
    // Check if a button for this city already exists
    let existingBtn = document.querySelector(`.btn[data-city='${city.toLowerCase()}']`);
    if (!existingBtn) {
      createSearchButton(city);
    }
    displayWeather(city);
  }
});

// Modify the createSearchButton function to include a data attribute for the city
function createSearchButton(city) {
  let searchArea = document.querySelector('.search-area');
  let btn = document.createElement('button');
  btn.setAttribute('data-city', city.toLowerCase()); // Set a data attribute to identify the city
  btn.classList.add('btn');
  btn.textContent = city;
  btn.addEventListener('click', function() {
    displayWeather(city);
  });
  searchArea.appendChild(btn);
  toggleClearButton();
}