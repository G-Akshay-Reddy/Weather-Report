var temp=document.getElementById('temp');
var cityName=document.getElementById('city');
var humidity=document.getElementById('humidity');
var windspeed=document.getElementById('windspeed');
var searchinput=document.getElementById('searchinput');
var serchbox=document.getElementById('serchbox');

var desc=document.getElementById('desc');
var body_data=document.getElementById('body_data');
var deatil=document.getElementById('deatil');
var error=document.getElementById('error');

async function checkWeather(city, lat = null, lon = null) {
    let Upi_key='f27b269d54e4fa1e72993364a80fa8bd';
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${Upi_key}&units=metric`;
    if (city) {
        url += `&q=${city}`;
    } else if (lat && lon) {
        url += `&lat=${lat}&lon=${lon}`;
    }
    let response = await fetch(url);
    let data = await response.json();

    temp.innerHTML = Math.floor(data.main.temp) + '°C';
    cityName.innerHTML = data.name;
    humidity.innerHTML = data.main.humidity + "%";
    windspeed.innerHTML = data.wind.speed + 'km/h';
    console.log(data);

    if (data.weather[0].main == "Clouds") {
        desc.innerHTML = 'Clouds';
    } else if (data.weather[0].main == 'Clear') {
        desc.innerHTML = 'Clear';
    } else if (data.weather[0].main == 'Rain') {
        desc.innerHTML = 'Rainy';
    } else if (data.weather[0].main == 'Drizzle') {
        desc.innerHTML = 'Drizzle';
    } else if (data.weather[0].main == 'Mist') {
        desc.innerHTML = 'Mist';
    } else if (data.weather[0].main == 'Haze') {
        desc.innerHTML = 'Haze';
    }
    body_data.style.display = 'flex';
    deatil.style.display = 'flex';
}

function getCurrentLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            checkWeather(null, lat, lon);
        }, (error) => {
            console.error("Error getting location: ", error);
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}

serchbox.addEventListener('click', () => {
    let cityIn = searchinput.value;
    checkWeather(cityIn);
});

searchinput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let cityIn = searchinput.value;
        checkWeather(cityIn);
    }
});

// Call the function to get the current location weather when the page loads
window.onload = getCurrentLocationWeather;