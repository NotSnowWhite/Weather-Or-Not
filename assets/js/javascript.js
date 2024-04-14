const userSearch = document.getElementById('search');
const form = document.querySelector('.formSubmit');
const results = document.getElementsByClassName('results');
const button = document.querySelector('button');
const fiveDayForecastAPI = 'c7fc1fd28ddf8fba0642efaab611afd3';
let lat;
let lon;
const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${fiveDayForecastAPI}`;


fetch {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}