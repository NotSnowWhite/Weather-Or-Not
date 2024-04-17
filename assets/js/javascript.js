const fiveDayForecastAPI = 'c7fc1fd28ddf8fba0642efaab611afd3';
const userSearch = document.getElementById('search');
const form = document.querySelector('.formSubmit');
const results = document.querySelector('div');
const button = document.querySelector('button');
const stateMenu = document.getElementById('stateMenu');
const dropdown = document.getElementById('search-menu');
let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];

window.addEventListener('DOMContentLoaded', () => {
    displaySearch();
})

function saveSearch(searchQuery) {
    searchHistory.push({ query: searchQuery });
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

function displaySearch() {

    dropdown.textContent = '';

    searchHistory.forEach(item => {
        let option = document.createElement('option');
        option.textContent = item.query;
        dropdown.appendChild(option);
    });

    dropdown.addEventListener('change', () => {
        let selection = dropdown.value;
        if (selection) {

            userSearch.value = selection;
            cityLocation(selection);
        }
    });
}

function cityLocation(cityState) {
    results.textContent = "";
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityState},&limit=1&appid=${fiveDayForecastAPI}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            data.forEach(location => {
                const container = document.createElement('div');
                const lat = location.lat;
                const lon = location.lon;

                const stateCity = document.createElement('h2');
                stateCity.textContent = location.name + ', ' + location.state;
                console.log(stateCity);

                container.appendChild(stateCity);
                results.append(container);

                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${fiveDayForecastAPI}&units=imperial`;

                fetch(url)

                    .then(response => {
                        return response.json();
                    })
                    .then(weather => {
                        console.log(weather.list);
                        const timezone = weather.city.timezone;

                        const firstEntry = weather.list[0];

                        const clouds = document.createElement('p');
                        clouds.textContent = 'Clouds: ' + firstEntry.clouds.all + '%';

                        const windSpeed = document.createElement('p');
                        windSpeed.textContent = `Wind Speed: ${firstEntry.wind.speed} mph`;

                        const humidity = document.createElement('p');
                        humidity.textContent = `Humidity: ${firstEntry.main.humidity}%`;

                        const temperature = document.createElement('p');
                        temperature.textContent = `Temperature: ${firstEntry.main.temp} °F`;

                        const weatherIcon = document.createElement('img');
                        weatherIcon.src = `http://openweathermap.org/img/wn/${firstEntry.weather[0].icon}@2x.png`;

                        const date = document.createElement('p');
                        date.textContent = dayjs(firstEntry.dt_txt).format('MM/DD/YYYY');

                        const time = document.createElement('p');
                        const timeUnix = firstEntry.dt;
                        const newTime = dayjs.unix(timeUnix + timezone).format('hh:mm A');
                        time.textContent = newTime + ' Forecast';

                        const sunrise = document.createElement('p');
                        const sunriseUnix = weather.city.sunrise;
                        const sunriseTime = dayjs.unix(sunriseUnix).format('hh:mm A');
                        sunrise.textContent = `Sunrise: ${sunriseTime}`;

                        const sunset = document.createElement('p');
                        const sunsetUnix = weather.city.sunset;
                        const sunsetTime = dayjs.unix(sunsetUnix).format('hh:mm A');
                        sunset.textContent = `Sunset: ${sunsetTime}`;

                        const details = document.createElement('button');
                        details.textContent = "Details";

                        container.appendChild(date);
                        container.appendChild(time);
                        container.appendChild(weatherIcon);
                        container.appendChild(temperature);
                        container.appendChild(humidity);
                        container.appendChild(clouds);
                        container.appendChild(windSpeed);
                        container.appendChild(sunrise);
                        container.appendChild(sunset);
                        container.appendChild(details);
                        results.append(container);

                        details.addEventListener('click', () => {
                            localStorage.setItem('cityState', cityState);
                            localStorage.setItem('lat', lat);
                            localStorage.setItem('lon', lon);
                            document.location.href = './details.html';
                        });
                        saveSearch(cityState);
                        displaySearch();
                    })
                    .catch(error => {
                        console.error(error);
                    });
            });

        })

        .catch(error => {
            console.error(error);
        })

}


form.addEventListener('submit', (event) => {
    event.preventDefault();
    cityLocation(userSearch.value);
    userSearch.value = "";

})

button.addEventListener('click', () => {
    cityLocation(userSearch.value);
    userSearch.value = "";
})