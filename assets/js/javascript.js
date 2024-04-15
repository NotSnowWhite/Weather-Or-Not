const fiveDayForecastAPI = 'c7fc1fd28ddf8fba0642efaab611afd3';
const userSearch = document.getElementById('search');
const form = document.querySelector('.formSubmit');
const results = document.getElementsByClassName('results');
const button = document.querySelector('button');
let lat;
let lon;
let coordinates = { lat, lon };
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${fiveDayForecastAPI}`;


// fetch(url)

//     .then(response => {
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//     })
//     .catch(error => {
//         console.error(error);
//     })


    // function that requests response from geocoding api to be called upon in form handler
function cityLocation(city) {
fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${fiveDayForecastAPI}`)
.then(response => {
    return response.json();
})
.then(data => {
    console.log(data);
})
.catch(error => {
    console.log(error);
})
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = userSearch.value;
    cityLocation(city);
})