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

                // const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${fiveDayForecastAPI}&units=imperial`;
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${fiveDayForecastAPI}&units=imperial`;
                fetch(url)

                    .then(response => {
                        return response.json();
                    })
                    .then(weather => {
                        console.log(weather);
                        // let timezone = weather.timezone;

                        const clouds = document.createElement('p');
                        clouds.textContent = 'Clouds: ' + weather.clouds.all + '%';

                        const windSpeed = document.createElement('p');
                        windSpeed.textContent = `Wind Speed: ${weather.wind.speed} mph`;

                        const humidity = document.createElement('p');
                        humidity.textContent = `Humidity: ${weather.main.humidity}%`;

                        const temperature = document.createElement('p');
                        temperature.textContent = `Temperature: ${weather.main.temp} °F`;

                        const weatherIcon = document.createElement('img');
                        weatherIcon.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

                        const weatherDescription = document.createElement('p');
                        weatherDescription.textContent = weather.weather[0].description;

                        const time = document.createElement('p');
                        const newTime = dayjs.unix(weather.dt).format('hh:mm A');
                        time.textContent = newTime + ' Forecast';

                        const details = document.createElement('button');
                        details.textContent = "Details";

                        container.appendChild(time);
                        container.appendChild(weatherIcon);
                        container.appendChild(weatherDescription);
                        container.appendChild(temperature);
                        container.appendChild(humidity);
                        container.appendChild(clouds);
                        container.appendChild(windSpeed);
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