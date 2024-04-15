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
// new fetch to get and append data to the page
fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        const container = document.createElement('div');
        const sunrise = document.createElement('p');
        const sunriseUnix = data.city.sunrise;
        const sunriseTime = dayjs.unix(sunriseUnix).format('hh:mm A');
        sunrise.textContent = `Sunrise: ${sunriseTime}`;

        const sunset = document.createElement('p');
        const sunsetUnix = data.city.sunset;
        const sunsetTime = dayjs.unix(sunsetUnix).format('hh:mm A');
        sunset.textContent = `Sunset: ${sunsetTime}`;

        container.appendChild(sunrise);
        container.appendChild(sunset);

        display.append(container);
    })
    .catch(error => {
        console.error(error);
    })

