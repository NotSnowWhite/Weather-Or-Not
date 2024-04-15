const cityState = localStorage.getItem('cityState');
const lat = localStorage.getItem('lat');
const lon = localStorage.getItem('lon');
const fiveDayForecastAPI = 'c7fc1fd28ddf8fba0642efaab611afd3';
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${fiveDayForecastAPI}&units=imperial`;
const display = document.getElementById('display');
// push current date to page with dayjs
const date = document.createElement('p');
date.textContent = dayjs().format('MM/DD/YYYY');
display.appendChild(date);

fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        const container = document.createElement('div');
        const sunrise = document.createElement('p');
        const sunriseDate = new Date(data.city.sunrise * 1000);
        const adjustedSunrise = new Date(sunriseDate.getTime() + data.timezone * 1000);
        const sunriseComplete = adjustedSunrise.toLocaleDateString();
        sunrise.textContent = sunriseComplete;
        container.appendChild(sunrise);

        display.append(container);
    })
    .catch(error => {
        console.error(error);
    })

