function getSeason(date) {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return 'Autumn';
  if (month >= 5 && month <= 7) return 'Winter';
  if (month >= 8 && month <= 10) return 'Spring';
  return 'Summer';
}

const dateElement = document.getElementById('holidayDate');
const recommendationElement = document.getElementById('recommendation');
const weatherIcon = document.getElementById('weatherIcon');
const sunIcon = document.getElementById('sunIcon');
const sunInfo = document.getElementById('sunTime');

const activities = {
  'Summer': ['Beach', 'Camping', 'Wildlife'],
  'Autumn': ['Wine Tasting', 'Scenic Drives', 'River Cruise'],
  'Winter': ['Snow Activities', 'Day Trips', 'Shopping'],
  'Spring': ['Hiking Trail', 'Sport Events', 'Outdoor Dining']
};

const apiKey = 'f367485e723c43718aaaf6d17ecf21f3';
const melbourneLat = -37.8136;
const melbourneLon = 144.9631;

function fetchWeatherData() {
  const apiUrl = `https://pro.openweathermap.org/data/2.5/weather?lat=${melbourneLat}&lon=${melbourneLon}&appid=${apiKey}`;
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    let iconClass;
    const temperatureInKelvin = data.main.temp;
    const temperatureInCelsius = parseInt(temperatureInKelvin - 273.15, 10);

    const temperatureValue = document.getElementById('temperatureValue');
    if (temperatureValue) {
      temperatureValue.innerHTML = `${temperatureInCelsius}°C`;
    }

    const locationInfo = document.getElementById('locationInfo');
    if (locationInfo) {
      locationInfo.innerHTML = "Melbourne Weather Right Now";
    }

    const sunriseTimestamp = data.sys.sunrise;
    const sunsetTimestamp = data.sys.sunset;
    const sunrise = new Date(sunriseTimestamp * 1000);
    const sunset = new Date(sunsetTimestamp * 1000);

    const currentTime = new Date();
    let sunEvent, sunTime, sunIconClass;
  
    if (currentTime < sunrise) {
      sunEvent = "Sunrise";
      sunTime = sunrise;
      sunIconClass = "wi-sunrise";
    } else if (currentTime >= sunrise && currentTime < sunset) {
      sunEvent = "Sunset";
      sunTime = sunset;
      sunIconClass = "wi-sunset";
    } else {
      sunEvent = "Sunrise";
      sunTime = sunrise;
      sunIconClass = "wi-sunrise";
    }

    const conditionCode = data.weather[0].id;
    const dayOrNight = data.weather[0].icon.slice(-1);

    if (conditionCode >= 200 && conditionCode < 300) {
      iconClass = 'wi-thunderstorm';
    } else if (conditionCode >= 300 && conditionCode < 400) {
      iconClass = 'wi-sprinkle';
    } else if (conditionCode >= 500 && conditionCode <= 504) {
      iconClass = (dayOrNight === 'd') ? 'wi-day-rain' : 'wi-night-alt-rain';
    } else if (conditionCode >= 520 && conditionCode <= 531) {
      iconClass = 'wi-rain';
    } else if (conditionCode >= 600 && conditionCode < 700) {
      iconClass = 'wi-snow';
    } else if (conditionCode >= 700 && conditionCode < 800) {
      iconClass = 'wi-fog';
    } else if (conditionCode === 800) {
      iconClass = (dayOrNight === 'd') ? 'wi-day-sunny' : 'wi-night-clear';
    } else if (conditionCode === 801) {
      iconClass = (dayOrNight === 'd') ? 'wi-day-sunny-overcast' : 'wi-night-partly-cloudy';
    } else if (conditionCode === 802) {
      iconClass =  (dayOrNight === 'd') ? 'wi-day-cloudy': 'wi-night-cloudy';
    } else if (conditionCode >= 803 && conditionCode <= 804) {
      iconClass = 'wi-cloudy';
    } else {
      iconClass = 'wi-na';
    }

    const weatherIcon = document.getElementById('weatherIcon');
    if (weatherIcon) {
      weatherIcon.className = `wi ${iconClass}`;
    }

    const sunIcon = document.getElementById('sunIcon');
    sunIcon.className = `wi ${sunIconClass}`;

    const sunInfo = document.getElementById('sunTime');
    const formattedTime = `${sunTime.getHours()}:${sunTime.getMinutes()}`;
    sunInfo.innerHTML = `${formattedTime}`;
  })
  .catch(error => {
    console.error("Error fetching weather data: ", error);
  });
}

const colors = {
  'Summer': '#FACE5C',
  'Autumn': '#EA4D2A',
  'Winter': '#2145C7',
  'Spring': '#F59AE7'
};

const seasonSymbols = {
  'Summer': '☀️',
  'Autumn': '🍁',
  'Winter': '❄️',
  'Spring': '🌸'
};

dateElement.addEventListener('change', function() {
  const selectedDate = new Date(dateElement.value);
  const selectedSeason = getSeason(selectedDate);
  const seasonActivities = activities[selectedSeason];
  const selectedColor = colors[selectedSeason] || '#FFFFFF';

  const seasonField = document.getElementById('currentSeason');
  seasonField.innerHTML = ` Selected Season: ${selectedSeason}`;

  const seasonBox = document.getElementById('seasonBox');
  seasonBox.style.backgroundColor = selectedColor;

  if (selectedColor === '#2145C7' || selectedColor === '#EA4D2A') {
    seasonBox.style.color = '#FFFFFF';
  } else {
    seasonBox.style.color = '#000000';
  }

  const selectedSeasonSymbol = seasonSymbols[selectedSeason] || '';
  seasonField.innerHTML = `Current Season: ${selectedSeason} ${selectedSeasonSymbol}`;
});

function getRecommendation() {
  const selectedDate = new Date(dateElement.value);
  const selectedSeason = getSeason(selectedDate);
  const recommendation = `Place for ${selectedSeason}`;
  recommendationElement.innerText = recommendation;
}

dateElement.dispatchEvent(new Event('change'));
fetchWeatherData();