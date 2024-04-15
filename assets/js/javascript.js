const fiveDayForecastAPI = 'c7fc1fd28ddf8fba0642efaab611afd3';
const userSearch = document.getElementById('search');
const form = document.querySelector('.formSubmit');
const results = document.getElementsByClassName('results');
const button = document.querySelector('button');

// function gets city lat.lon from geocoding api and passes it in variables to weather api to request data
function cityLocation(city) {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${fiveDayForecastAPI}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            // loop through the lon and lat for each city with the same name
            data.forEach(location => {

                const lat = location.lat;
                const lon = location.lon
                // console.log(lat, lon);

                // specify url for lat.lon inside () after lat.lon variables are created and fetch data 
                const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${fiveDayForecastAPI}`;

                fetch(url)

                    .then(response => {
                        return response.json();
                    })
                    .then(weather => {
                        console.log(weather);
                    })
                    .catch(error => {
                        console.error(error);
                    })
            })
        })

        .catch(error => {
            console.log(error);
        })

}
// on form submit, call the function to obtain search data
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const city = userSearch.value;
    cityLocation(city);
})

button.addEventListener('click', () => {
    const city = userSearch.value;
    cityLocation(city);

})