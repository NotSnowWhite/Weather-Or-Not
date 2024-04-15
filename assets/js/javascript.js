const fiveDayForecastAPI = 'c7fc1fd28ddf8fba0642efaab611afd3';
const userSearch = document.getElementById('search');
const form = document.querySelector('.formSubmit');
const results = document.querySelector('div');
const button = document.querySelector('button');
const stateMenu = document.getElementById('stateMenu');

// // dropdown for state search
// // const stateInfo = [{code: 'AL', name: 'Alabama'},
// // {code: 'AK', name:'Alaska'},
// // {code: 'AZ', name:'Arizona'},
// // {code: 'AR', name:'Arkansas'},
// // {code: 'CA', name:'California'},
// // {code: 'CO', name:'Colorado'},
// // {code: 'CT', name:'Connecticut'},
// // {code: 'DE', name:'Delaware'},
// // {code: 'FL', name:'Florida'},
// // {code: 'GA', name:'Georgia'},
// // {code: 'HI', name:'Hawaii'},
// // {code: 'ID', name:'Idaho'},
// // {code: 'IL', name:'Illinois'},
// // {code: 'IN', name:'Indiana'},
// // {code: 'IA', name:'Iowa'},
// // {code: 'KS', name:'Kansas'},
// // {code: 'KY', name:'Kentucky'},
// // {code: 'LA', name:'Louisiana'},
// // {code: 'ME', name:'Maine'},
// // {code: 'MD', name:'Maryland'},
// // {code: 'MA', name:'Massachusetts'},
// // {code: 'MI', name:'Michigan'},
// // {code: 'MN', name:'Minnesota'},
// // {code: 'MS', name:'Mississippi'},
// // {code: 'MO', name:'Missouri'},
// // {code: 'MT', name:'Montana'},
// // {code: 'NE', name:'Nebraska'},
// // {code: 'NV', name:'Nevada'},
// // {code: 'NH', name:'New Hampshire'},
// // {code: 'NJ', name:'New Jersey'},
// // {code: 'NM', name:'New Mexico'},
// // {code: 'NY', name:'New York'},
// // {code: 'NC', name:'North Carolina'},
// // {code: 'ND', name:'North Dakota'},
// // {code: 'OH', name:'Ohio'},
// // {code: 'OK', name:'Oklahoma'},
// // {code: 'OR', name:'Oregon'},
// // {code: 'PA', name:'Pennsylvania'},
// // {code: 'PR', name:'Puerto Rico'},
// // {code: 'RI', name:'Rhode Island'},
// // {code: 'SC', name:'South Carolina'},
// // {code: 'SD', name:'South Dakota'},
// // {code: 'TN', name:'Tennessee'},
// // {code: 'TX', name:'Texas'},
// // {code: 'UT', name:'Utah'},
// // {code: 'VT', name:'Vermont'},
// // {code: 'VA', name:'Virginia'},
// // {code: 'WA', name:'Washington'},
// // {code: 'WV', name:'West Virginia'},
// // {code: 'WI', name:'Wisconsin'},
// // {code: 'WY', name:'Wyoming'},];


// // stateInfo.forEach(state => {
// //   const option = document.createElement('option');
// //   option.value = state.code;
// //   option.textContent = state.name;
// //   stateMenu.appendChild(option);
// // });

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

                        const buttonContainer = document.createElement('div');
                        const details = document.createElement('button');
                        details.textContent = "Details";
                        container.appendChild(clouds);
                        results.append(container);

                        details.addEventListener('click', () => {
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
    // // const stateName = stateMenu.value;
    cityLocation(cityState);
    userSearch.value = "";

})

button.addEventListener('click', () => {
    const cityState = userSearch.value;
    // // const stateName = stateMenu.value;
    cityLocation(cityState);
    userSearch.value = "";
})