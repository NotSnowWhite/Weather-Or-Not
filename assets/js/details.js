const cityState = localStorage.getItem('cityState');
const lat = localStorage.getItem('lat');
const lon = localStorage.getItem('lon');
const fiveDayForecastAPI = 'c7fc1fd28ddf8fba0642efaab611afd3';
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${fiveDayForecastAPI}&units=imperial`;
const display = document.getElementById('display');
const backBtn = document.getElementById('back');

backBtn.addEventListener('click', function () {
    window.history.back();
})

// new fetch to get and append data to the page
fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        const timezone = data.city.timezone;
        // store forecast data to an empty object
        const forecastDate = {};
        // loops through data in list for 5-day forecast
        data.list.forEach(item => {
            const dateUnix = dayjs(item.dt_txt).unix() + timezone;
            const weekday = dayjs.unix(dateUnix).format('dddd');

            // if there is no weekday in the forecastDate object, create an empty array for the weekday and its data inside the forecastDate object
            if (!forecastDate[weekday]) {
                forecastDate[weekday] = [];
            }
            // push the response from the api to the matching weekday array
            forecastDate[weekday].push(item);
            console.log(forecastDate);
        });
        // iterate over the forecastData object's keys (weekdays []) and for each piece of data creates an h3 with the weekday
        Object.keys(forecastDate).forEach(weekday => {

            // create containers for each weekday and an h3 with the weekday name
            const container = document.createElement('div');
            container.classList.add('container');

            const day = document.createElement('h3');
            day.textContent = weekday;
            container.appendChild(day);
            // forecastDate[weekday] is now an object of weekdays with arrays of data from the api. the below will pull the api weather data onto the page and sort into weekdays
            forecastDate[weekday].forEach(item => {
                const forecastContainer = document.createElement('div');
                forecastContainer.classList.add('forecast');

                const date = document.createElement('h3');
                const dateUnix = dayjs(item.dt_txt).unix() + timezone;
                date.innerHTML = dayjs.unix(dateUnix).format('dddd<br>MM/DD/YYYY');

                const time = document.createElement('h4');
                const timeUnix = item.dt;
                const newTime = dayjs.unix(timeUnix + timezone).format('hh:mm A');
                time.textContent = newTime;

                const mainDescription = document.createElement('p');
                mainDescription.textContent = item.weather[0].main;

                const weatherDescription = document.createElement('p');
                weatherDescription.textContent = item.weather[0].description;

                const weatherIcons = document.createElement('img');
                weatherIcons.src = `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

                const clouds = document.createElement('p');
                clouds.textContent = 'Clouds: ' + item.clouds.all + '%';

                const windSpeed = document.createElement('p');
                windSpeed.textContent = `Wind Speed: ${item.wind.speed} mph`;

                const humidity = document.createElement('p');
                humidity.textContent = `Humidity: ${item.main.humidity}%`;

                const temperature = document.createElement('p');
                temperature.textContent = `Temperature: ${item.main.temp} °F`;

                const tempMin = document.createElement('p');
                tempMin.textContent = `Min Temp: ${item.main.temp_min} °F`;

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

                forecastContainer.appendChild(date);
                forecastContainer.appendChild(time);
                forecastContainer.appendChild(mainDescription);
                forecastContainer.appendChild(weatherIcons);
                forecastContainer.appendChild(weatherDescription);
                forecastContainer.appendChild(temperature);
                forecastContainer.appendChild(humidity);
                forecastContainer.appendChild(clouds);
                forecastContainer.appendChild(windSpeed);
                forecastContainer.appendChild(tempMin);
                forecastContainer.appendChild(tempMax);
                forecastContainer.appendChild(sunrise);
                forecastContainer.appendChild(sunset);
                // append all above to the container
                container.append(forecastContainer);
            });
            // append everything from the container to the display
            display.append(container);

        });

    })
    .catch(error => {
        console.error(error);
    })

