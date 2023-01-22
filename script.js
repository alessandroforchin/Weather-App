const search = document.getElementById('search-btn');
const cityInput = document.getElementById('cityName');
const container = document.querySelector('.weather-container');

const cityName = document.createElement('h1');
const weatherPng = document.createElement('img');
const currWeather = document.createElement('h2');
const temperature = document.createElement('p');
const wind = document.createElement('p');
const humidity = document.createElement('p');

async function getWeather() {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=` + cityInput.value + `&APPID=8880a416cb00b3cfcec8fa77f9b2c7ba&units=metric`, {mode: 'cors'});

    try {
        const data = await response.json();

        const cityWord = cityInput.value;
        const cityWordUpper = cityWord.charAt(0).toUpperCase() + cityWord.slice(1);
        cityName.innerText = `${cityWordUpper}, ${data.sys.country}`;

        const weatherWord = data.weather[0].description;
        const weatherWordUpper = weatherWord.charAt(0).toUpperCase() + weatherWord.slice(1);
        currWeather.innerText = `${weatherWordUpper}`

        temperature.innerText = `Temperature: ${data.main.temp}°C`; 
        wind.innerText = `Wind speed: ${data.wind.speed}m/s`;
        humidity.innerText = `Humidity: ${data.main.humidity}%`;
            
        container.appendChild(cityName);
        container.appendChild(weatherPng);
        container.appendChild(currWeather);
        container.appendChild(temperature);
        container.appendChild(wind);
        container.appendChild(humidity);

        switch (data.weather[0].main) {
            case 'Clear':
                document.body.style.backgroundImage = 'url("/images/sun.jpg")';
                weatherPng.src = "/png/sunPng.png";
                break;
            case 'Clouds':
                document.body.style.backgroundImage = 'url("/images/cloud.jpg")';
                weatherPng.src = '/png/cloudPng.png';
                break;
            case 'Rain':
            case 'Drizzle':
            case 'Mist':
            case 'Thunderstorm':
                document.body.style.backgroundImage = 'url("/images/rain.jpg")';
                weatherPng.src = '/png/rainPng.png';
                break;
            case 'Snow':
                document.body.style.backgroundImage = 'url("/images/snow.jpg")';
                weatherPng.src = '/png/snowPng.png';
                break;
            default:
                break;
        }
    } catch (error) {
        console.log(error);
    }
}

search.addEventListener('click', getWeather);
