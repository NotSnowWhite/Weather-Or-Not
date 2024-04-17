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
        container.classList.add('container');

        const timezone = data.city.timezone;

        // loops through data in list for 5-day forecast
        data.list.forEach(item => {
            const date = document.createElement('p');
            dateUnix = dayjs(item.dt_txt).unix() + timezone;
            date.textContent = dayjs.unix(dateUnix).format('MM/DD/YYYY hh:mm A');
            // date.style.display = 'inline-block';

            const time = document.createElement('p');
            const timeUnix = item.dt ;
            const newTime = dayjs.unix(timeUnix).format('hh:mm A');
            time.textContent = newTime;

            const mainDescription = document.createElement('p');
            mainDescription.textContent = item.weather[0].main;

            const weatherDescription = document.createElement('p');
            weatherDescription.textContent = item.weather[0].description;

            const weatherIcons = document.createElement('img');
            weatherIcons.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;


            const tempMin = document.createElement('p');
            tempMin.textContent = `Mini Temp: ${item.main.temp_min} °F`;

            const tempMax = document.createElement('p');
            tempMax.textContent = `Max Temp: ${item.main.temp_max} °F`;

            const sunrise = document.createElement('p');
            const sunriseUnix = data.city.sunrise;
            const sunriseTime = dayjs.unix(sunriseUnix).format('hh:mm A');
            sunrise.textContent = `Sunrise: ${sunriseTime}`;

            const sunset = document.createElement('p');
            const sunsetUnix = data.city.sunset;
            const sunsetTime = dayjs.unix(sunsetUnix).format('hh:mm A');
            sunset.textContent = `Sunset: ${sunsetTime}`;

            container.appendChild(date);
            container.appendChild(time);
            container.appendChild(mainDescription);
            container.appendChild(weatherIcons);
            container.appendChild(weatherDescription);
            container.appendChild(tempMin);
            container.appendChild(tempMax);
            container.appendChild(sunrise);
            container.appendChild(sunset);
        });

        // const timezone = document.createElement('p');
        // container.appendChild(timezone);

        display.append(container);
    })
    .catch(error => {
        console.error(error);
    })

