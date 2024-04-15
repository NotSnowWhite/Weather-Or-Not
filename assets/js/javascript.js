const fiveDayForecastAPI = 'c7fc1fd28ddf8fba0642efaab611afd3';
const userSearch = document.getElementById('search');
const form = document.querySelector('.formSubmit');
const results = document.querySelector('div');
const button = document.querySelector('button');

// dropdown for state search
const stateInfo = [{code: 'AL', name: 'Alabama'},
{code: 'AK', name:'Alaska'},
{code: 'AZ', name:'Arizona'},
{code: 'AR', name:'Arkansas'},
{code: 'CA', name:'California'},
{code: 'CO', name:'Colorado'},
{code: 'CT', name:'Connecticut'},
{code: 'DE', name:'Delaware'},
{code: 'FL', name:'Florida'},
{code: 'GA', name:'Georgia'},
{code: 'HI', name:'Hawaii'},
{code: 'ID', name:'Idaho'},
{code: 'IL', name:'Illinois'},
{code: 'IN', name:'Indiana'},
{code: 'IA', name:'Iowa'},
{code: 'KS', name:'Kansas'},
{code: 'KY', name:'Kentucky'},
{code: 'LA', name:'Louisiana'},
{code: 'ME', name:'Maine'},
{code: 'MD', name:'Maryland'},
{code: 'MA', name:'Massachusetts'},
{code: 'MI', name:'Michigan'},
{code: 'MN', name:'Minnesota'},
{code: 'MS', name:'Mississippi'},
{code: 'MO', name:'Missouri'},
{code: 'MT', name:'Montana'},
{code: 'NE', name:'Nebraska'},
{code: 'NV', name:'Nevada'},
{code: 'NH', name:'New Hampshire'},
{code: 'NJ', name:'New Jersey'},
{code: 'NM', name:'New Mexico'},
{code: 'NY', name:'New York'},
{code: 'NC', name:'North Carolina'},
{code: 'ND', name:'North Dakota'},
{code: 'OH', name:'Ohio'},
{code: 'OK', name:'Oklahoma'},
{code: 'OR', name:'Oregon'},
{code: 'PA', name:'Pennsylvania'},
{code: 'PR', name:'Puerto Rico'},
{code: 'RI', name:'Rhode Island'},
{code: 'SC', name:'South Carolina'},
{code: 'SD', name:'South Dakota'},
{code: 'TN', name:'Tennessee'},
{code: 'TX', name:'Texas'},
{code: 'UT', name:'Utah'},
{code: 'VT', name:'Vermont'},
{code: 'VA', name:'Virginia'},
{code: 'WA', name:'Washington'},
{code: 'WV', name:'West Virginia'},
{code: 'WI', name:'Wisconsin'},
{code: 'WY', name:'Wyoming'},];

const stateMenu = document.getElementById('stateMenu');

stateInfo.forEach(state => {
  const option = document.createElement('option');
  option.value = state.code;
  option.textContent = state.name;
  stateMenu.appendChild(option);
});

// function gets city lat.lon from geocoding api and passes it in variables to weather api to request data
function cityLocation(city) {
    // clear the results at every new search
    results.textContent = "";

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${fiveDayForecastAPI}`)
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