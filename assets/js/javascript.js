const fiveDayForecastAPI = 'c7fc1fd28ddf8fba0642efaab611afd3';
const userSearch = document.getElementById('search');
const form = document.querySelector('.formSubmit');
const results = document.querySelector('div');
const button = document.querySelector('button');
const stateMenu = document.getElementById('stateMenu');

// function gets city lat.lon from geocoding api and passes it in variables to weather api to request data
function cityLocation(cityState) {
    // clear the results at every new search
    results.textContent = "";
    // merges the city and state parameters into 1 string value to be called in below function
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityState},&appid=${fiveDayForecastAPI}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            // loop through the lon and lat for each city with the same name
            data.forEach(location => {
                const container = document.createElement('div');
                const lat = location.lat;
                const lon = location.lon;

                const stateCity = document.createElement('h2');
                stateCity.textContent = location.name + ', ' + location.state;
                console.log(stateCity);

                container.appendChild(stateCity);
                results.append(container);

                // specify url for lat.lon inside () after lat.lon variables are created and fetch data 
                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${fiveDayForecastAPI}&units=imperial`;

                fetch(url)

                    .then(response => {
                        return response.json();
                    })
                    .then(weather => {
                        console.log(weather.list);
                        const firstEntry = weather.list[0]

                        const clouds = document.createElement('p');
                        clouds.textContent = 'Clouds: ' + firstEntry.clouds.all;

                        const windSpeed = document.createElement('p');
                        windSpeed.textContent = 'Wind Speed: ' + firstEntry.wind.speed;
                        // details button for every location
                        const buttonContainer = document.createElement('div');
                        const details = document.createElement('button');
                        details.textContent = "Details";
                        container.appendChild(clouds);
                        results.append(container);
                        // event listener to go to details html upon click
                        details.addEventListener('click', () => {
                            localStorage.setItem('cityState', cityState);
                            localStorage.setItem('lat', lat);
                            localStorage.setItem('lon', lon);
                            document.location.href = './details.html';
                        });

                        buttonContainer.appendChild(details);
                        results.append(buttonContainer)

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
// on form submit or button click, call the function to obtain search data and clear input after search
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const cityState = userSearch.value;
    cityLocation(cityState);
    userSearch.value = "";

})

button.addEventListener('click', () => {
    const cityState = userSearch.value;
    cityLocation(cityState);
    userSearch.value = "";
})