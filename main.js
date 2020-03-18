const APIKey = "***";

let cityName = document.getElementById('city-search');
let searchButton = document.getElementById('search-button');
let searchForm = document.getElementById('search-form');
let results = document.getElementById('results-container');
let temperature = document.getElementById('temperature');
let cityTitle = document.getElementById('city');
let searchAgain = document.getElementById('search-again');


function printCityName() {
  console.log(cityName.value);
}

function printResults(respObject) {
  city.innerHTML = respObject.name + ', ' + respObject.sys.country;
  temperature.innerHTML = (respObject.main.temp - 273.15).toFixed(0) + ' &degC';
  document.getElementById('feels-like').innerHTML = (respObject.main.feels_like - 273.15).toFixed(0) + ' &degC';
  document.getElementById('high-temp').innerHTML = (respObject.main.temp_max - 273.15).toFixed(0) + ' &degC';
  document.getElementById('low-temp').innerHTML = (respObject.main.temp_min - 273.15).toFixed(0) + ' &degC';
  let iconValue = respObject.weather[0].icon;
  document.getElementById('weather-icon').src = `http://openweathermap.org/img/wn/${iconValue}@2x.png`;
  document.getElementById('condition-description').innerHTML = respObject.weather[0].main;
}

function temperatureGET() {
  const xhr = new XMLHttpRequest();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=${APIKey}`;

  xhr.responseType = 'json';
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      // console.log(xhr.response);
      console.log(xhr.response);
      printResults(xhr.response);
    }
  };

  xhr.open('GET', url);
  xhr.send();
  }

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  printCityName();
  temperatureGET();
  results.style.display = 'block';
  searchForm.style.display = 'none';
});

searchAgain.addEventListener('click', function() {
  results.style.display = 'none';
  searchForm.style.display = 'block';
  document.getElementById('city-search').value = '';
});
