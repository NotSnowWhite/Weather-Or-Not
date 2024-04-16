const cityState = localStorage.getItem('cityState');
const lat = localStorage.getItem('lat');
const lon = localStorage.getItem('lon');
const fiveDayForecastAPI = 'c7fc1fd28ddf8fba0642efaab611afd3';
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${fiveDayForecastAPI}&units=imperial`;
const display = document.getElementById('display');
// push current date to page with dayjs
// const date = document.createElement('p');
// date.textContent = dayjs().format('MM/DD/YYYY');
// display.appendChild(date);
// new fetch to get and append data to the page
fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        const container = document.createElement('div');

        const time = document.createElement('p');
        const timeUnix = data.list[0].dt;
        const newTime = dayjs.unix(timeUnix).format('hh:mm A');
        time.textContent = newTime;

        const date = document.createElement('p');
        date.textContent = dayjs(data.list[0].dt_txt, 'YYYY-MM-DD HH:mm:ss').format('MM/DD/YYYY hh:mm A');
        
        const sunrise = document.createElement('p');
        const sunriseUnix = data.city.sunrise;
        const sunriseTime = dayjs.unix(sunriseUnix).format('hh:mm A');
        sunrise.textContent = `Sunrise: ${sunriseTime}`;

        const sunset = document.createElement('p');
        const sunsetUnix = data.city.sunset;
        const sunsetTime = dayjs.unix(sunsetUnix).format('hh:mm A');
        sunset.textContent = `Sunset: ${sunsetTime}`;

        const timezone = document.createElement('p');
        timezone.textContent = data.city.timezone;

        const tempMin = document.createElement('p');
        tempMin.textContent = `Mini Temp: ${data.list[0].main.temp_min} °F`;
        const tempMax = document.createElement('p');
        tempMax.textContent = `Max Temp: ${data.list[0].main.temp_max} °F`;

        const weatherIcon = document.createElement('img');
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
        console.log(data.list[0].weather[0].icon);

        container.appendChild(date);
        container.appendChild(time);
        container.appendChild(weatherIcon);
        container.appendChild(sunrise);
        container.appendChild(sunset);
        container.appendChild(timezone);
        container.appendChild(tempMin);
        container.appendChild(tempMax);

        display.append(container);
    })
    .catch(error => {
        console.error(error);
    })

