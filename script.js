// Function to determine season based on date
function getSeason(date) {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return 'Autumn';
  if (month >= 5 && month <= 7) return 'Winter';
  if (month >= 8 && month <= 10) return 'Spring';
  return 'Summer';
}

// Initialize DOM Elements
const dateElement = document.getElementById('holidayDate');
const activityElement = document.getElementById('activity');
const recommendationElement = document.getElementById('recommendation');
const weatherIcon = document.getElementById('weatherIcon');
const sunIcon = document.getElementById('sunIcon');
const sunInfo = document.getElementById('sunTime');

// Activity options for each season
const activities = {
  'Summer': ['Beach', 'Camping', 'Wildlife'],
  'Autumn': ['Wine Tasting', 'Scenic Drives', 'River Cruise'],
  'Winter': ['Snow Activities', 'Day Trips', 'Shopping'],
  'Spring': ['Hiking Trail', 'Sport Events', 'Outdoor Dining']
};

// Weather API Key and Melbourne coordinates
const apiKey = 'f367485e723c43718aaaf6d17ecf21f3';
const melbourneLat = -37.8136;
const melbourneLon = 144.9631;

// Fetch weather data
function fetchWeatherData() {
  const apiUrl = `https://pro.openweathermap.org/data/2.5/weather?lat=${melbourneLat}&lon=${melbourneLon}&appid=${apiKey}`;
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    let iconClass;
    // Convert temperature to Celsius and round it
    const temperatureInKelvin = data.main.temp;
    const temperatureInCelsius = parseInt(temperatureInKelvin - 273.15, 10);

    // Update temperature
    const temperatureValue = document.getElementById('temperatureValue');
    if (temperatureValue) {
      temperatureValue.innerHTML = `${temperatureInCelsius}°C`;
    }

    // Update location information
    const locationInfo = document.getElementById('locationInfo');
    if (locationInfo) {
      locationInfo.innerHTML = "Melbourne Weather Right Now";
    }

    // Fetch and convert sunrise and sunset times
    const sunriseTimestamp = data.sys.sunrise;
    const sunsetTimestamp = data.sys.sunset;
    const sunrise = new Date(sunriseTimestamp * 1000);
    const sunset = new Date(sunsetTimestamp * 1000);

    // Compare with current time
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
      sunTime = sunrise; // For the next day
      sunIconClass = "wi-sunrise";
    }

    // Weather Condition
    const conditionCode = data.weather[0].id;
    const dayOrNight = data.weather[0].icon.slice(-1); // 'd' for day, 'n' for night

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
      iconClass = 'wi-na';  // Not available
    }

    const weatherIcon = document.getElementById('weatherIcon');
    if (weatherIcon) {
      weatherIcon.className = `wi ${iconClass}`;
    }

    // Update the sun icon
    const sunIcon = document.getElementById('sunIcon');
    sunIcon.className = `wi ${sunIconClass}`;

    // Update the sun information
    const sunInfo = document.getElementById('sunTime');
    const formattedTime = `${sunTime.getHours()}:${sunTime.getMinutes()}`;
    sunInfo.innerHTML = `${formattedTime}`;
  })
  .catch(error => {
    console.error("Error fetching weather data: ", error);
  });
}

// Colors for each season
const colors = {
  'Summer': '#FACE5C',
  'Autumn': '#EA4D2A',
  'Winter': '#2145C7',
  'Spring': '#F59AE7'
};

// Symbols for each season
const seasonSymbols = {
  'Summer': '☀️',
  'Autumn': '🍁',
  'Winter': '❄️',
  'Spring': '🌸'
};

// Event Listener to update activities based on selected date
dateElement.addEventListener('change', function() {
  const selectedDate = new Date(dateElement.value);
  const selectedSeason = getSeason(selectedDate);
  const seasonActivities = activities[selectedSeason];
  const selectedColor = colors[selectedSeason] || '#FFFFFF';

  // Update activity options based on season
  activityElement.innerHTML = seasonActivities.map(activity => `<option value="${activity}">${activity}</option>`).join('');

  // Update background color based on season
  activityElement.style.backgroundColor = selectedColor;

  // Update text color based on background
  if (selectedColor === '#2145C7' || selectedColor === '#EA4D2A') {
    activityElement.style.color = '#FFFFFF';
  } else {
    activityElement.style.color = '#000000';
  }

  // Update the text field with the current season
  const seasonField = document.getElementById('currentSeason');
  seasonField.innerHTML = ` Selected Season: ${selectedSeason}`;

  // Update the background color of the season box
  const seasonBox = document.getElementById('seasonBox');
  seasonBox.style.backgroundColor = selectedColor;

  // Update text color based on background
  if (selectedColor === '#2145C7' || selectedColor === '#EA4D2A') {
    seasonBox.style.color = '#FFFFFF';
  } else {
    seasonBox.style.color = '#000000';
  }

  const selectedSeasonSymbol = seasonSymbols[selectedSeason] || '';
  seasonField.innerHTML = `Current Season: ${selectedSeason} ${selectedSeasonSymbol}`;
});

// Function to get recommendations
function getRecommendation() {
  const selectedDate = new Date(dateElement.value);
  const selectedSeason = getSeason(selectedDate);
  const selectedActivity = activityElement.value;
  const recommendation = `Place for ${selectedActivity} during ${selectedSeason}`;
  recommendationElement.innerText = recommendation;
}

// Initialize
dateElement.dispatchEvent(new Event('change'));
fetchWeatherData();