const seasonElement = document.getElementById('season');
const activityElement = document.getElementById('activity');
const recommendationElement = document.getElementById('recommendation');

// Define your activities for each season
const activities = {
  'Summer': ['Beach', 'Camping', 'Wildlife'],
  'Autumn': ['Wine Tasting', 'Scenic Drives', 'River Cruise'],
  'Winter': ['Snow Activities', 'Day Trips', 'Shopping'],
  'Spring': ['Hiking Trail', 'Sport Events', 'Outdoor Dining']
};

// Update activity options when the season changes
seasonElement.addEventListener('change', function() {
  const selectedSeason = seasonElement.value;
  const options = activities[selectedSeason];
  activityElement.innerHTML = '';

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
  // You can replace the following line with an API call to your back-end
  const recommendation = "Place for " + selectedActivity + " during " + selectedSeason;
  recommendationElement.innerText = recommendation;
}

// Initialize
seasonElement.dispatchEvent(new Event('change'));

// Weather API Key
const apiKey = 'c7cc5f87eeb22da038aac4efd7443c45';

// Function to fetch weather data
function fetchWeatherData(location) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`)
    .then(response => response.json())
    .then(data => {
      // Process and use the weather data here
      console.log(data);
      const weatherInfo = document.getElementById('weatherInfo');
      if (weatherInfo) {
        weatherInfo.innerHTML = `Current Weather: ${data.weather[0].description}`;
      }
    })
    .catch(error => {
      console.error("Error fetching weather data: ", error);
    });
}