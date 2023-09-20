const seasonElement = document.getElementById('season');
const activityElement = document.getElementById('activity');
const recommendationElement = document.getElementById('recommendation');

const activities = {
  'Summer': ['Beach', 'Camping', 'Wildlife'],
  'Autumn': ['Wine Tasting', 'Scenic Drives', 'River Cruise'],
  'Winter': ['Snow Activities', 'Day Trips', 'Shopping'],
  'Spring': ['Hiking Trail', 'Sport Events', 'Outdoor Dining']
};

seasonElement.addEventListener('change', function() {
  const selectedSeason = seasonElement.value;
  const options = activities[selectedSeason];
  activityElement.innerHTML = '';

  const colors = {
    'Summer': '#FACE5C',
    'Autumn': '#EA4D2A',
    'Winter': '#2145C7',
    'Spring': '#F59AE7'
  };

  const selectedColor = colors[selectedSeason] || '#FFFFFF';
  activityElement.style.backgroundColor = selectedColor;

  if (selectedColor === '#2145C7' || selectedColor === '#EA4D2A') {
    activityElement.style.color = '#FFFFFF';  // Set to white
  } else {
    activityElement.style.color = '#000000';  // Set to black
  }

  options.forEach(function(activity) {
    const option = document.createElement('option');
    option.value = activity;
    option.text = activity;
    activityElement.appendChild(option);
  });
});

function getRecommendation() {
  const selectedSeason = seasonElement.value;
  const selectedActivity = activityElement.value;
  const recommendation = "Place for " + selectedActivity + " during " + selectedSeason;
  recommendationElement.innerText = recommendation;
}

// Initialize
seasonElement.dispatchEvent(new Event('change'));

// Weather API Key
const apiKey = 'c7cc5f87eeb22da038aac4efd7443c45';

// Latitude and longitude for Melbourne
const melbourneLat = -37.8136;
const melbourneLon = 144.9631;

// Function to fetch weather data based on latitude and longitude
function fetchWeatherData() {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${melbourneLat}&lon=${melbourneLon}&appid=${apiKey}`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Convert temperature to Celsius
      const temperatureInKelvin = data.main.temp;
      const temperatureInCelsius = parseInt(temperatureInKelvin - 273.15, 10);

      // Update temperature
      const temperatureValue = document.getElementById('temperatureValue');
      if (temperatureValue) {
        temperatureValue.innerHTML = `${temperatureInCelsius}°C`;
      }

      // Update weather icon based on condition code
      const weatherIcon = document.getElementById('weatherIcon');
      const conditionCode = data.weather[0].id;
      if (weatherIcon) {
        let icon;
        if (conditionCode >= 200 && conditionCode < 300) {
          icon = '⛈️';  // Thunderstorm
        } else if (conditionCode >= 300 && conditionCode < 600) {
          icon = '🌧️';  // Rain
        } else if (conditionCode >= 600 && conditionCode < 700) {
          icon = '❄️';  // Snow
        } else if (conditionCode >= 700 && conditionCode < 800) {
          icon = '🌫️';  // Atmosphere
        } else if (conditionCode === 800) {
          icon = '☀️';  // Clear
        } else if (conditionCode > 800) {
          icon = '☁️';  // Clouds
        }
        weatherIcon.innerHTML = icon;
      }
    })
    .catch(error => {
      console.error("Error fetching weather data: ", error);
    });
}

// Call the function when the page loads
fetchWeatherData();