const userSearch = document.getElementById('search');
const form = document.querySelector('.formSubmit');
const results = document.getElementsByClassName('results');
const button = document.querySelector('button');
const fiveDayForecastAPI = 'c7fc1fd28ddf8fba0642efaab611afd3';
let lat = 32.3633005;
let lon = -96.8751270;
let coordinates = {lat, lon};
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${fiveDayForecastAPI}`;


fetch(url)

    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
    console.error(error);
})