import weatherPlaceDB from "./placeDatabase.js";

function getSeason(date) {
  const month = date.getMonth();
  if (month >= 2 && month <= 4) return 'Autumn';
  if (month >= 5 && month <= 7) return 'Winter';
  if (month >= 8 && month <= 10) return 'Spring';
  return 'Summer';
}

const dateElement = document.getElementById('holidayDate');

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
    const temperatureInCelsiusRaw = temperatureInKelvin - 273.15;
    
    // Round to the nearest integer if the decimal is equal to or greater than 0.5
    const temperatureInCelsius = Math.round(temperatureInCelsiusRaw * 10) / 10;
    
    // Round up if the value after the decimal point is >= 0.5
    const roundedTemperatureInCelsius = Math.round(temperatureInCelsius);
    
    const temperatureValue = document.getElementById('temperatureValue');
    if (temperatureValue) {
      temperatureValue.innerHTML = `${roundedTemperatureInCelsius}°C`;
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
  seasonField.innerHTML = `Selected Season: ${selectedSeason} ${selectedSeasonSymbol}`;
});

let prediction = {};
async function fetchForecastWeather(date) {
  const apiUrl = `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${melbourneLat}&lon=${melbourneLon}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("API Response: ", data);
    const targetDate = new Date(date);
    const targetTimestamp = Math.floor(targetDate.getTime() / 1000);  // Convert to Unix timestamp (UTC)

    // Convert to the same date format to compare
    const forecast = data.list.find(forecast => {
      const forecastDate = new Date(forecast.dt * 1000);  // Convert Unix timestamp to JavaScript Date object
      return forecastDate.getUTCFullYear() === targetDate.getUTCFullYear() &&
             forecastDate.getUTCMonth() === targetDate.getUTCMonth() &&
             forecastDate.getUTCDate() === targetDate.getUTCDate();
    });

    if (forecast) {
      const rawTempInCelsius = forecast.temp.day - 273.15;
      const roundedTempInCelsius = Math.round(rawTempInCelsius);
      prediction = {
        temperature: roundedTempInCelsius,
        rain: forecast.rain || 0,
      };
    }
  } catch (error) {
    console.error("Error fetching weather data: ", error);
  }
  return prediction
}

dateElement.dispatchEvent(new Event('change'));
fetchWeatherData();
document.getElementById('getRecommendationButton').addEventListener('click', getRecommendation);

// Function to format date from yyyy-mm-dd to dd MMMM yyyy
function formatDate(inputDate) {
  const date = new Date(inputDate);
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

// Initialize all boxes to be active by default
function initializeTourismActivityBoxes() {
  const busyBox = document.getElementById('busyBox');
  const moderateBox = document.getElementById('moderateBox');
  const lowBox = document.getElementById('lowBox');

  busyBox.className = 'tourism-box busy';
  moderateBox.className = 'tourism-box moderate';
  lowBox.className = 'tourism-box low';
}

// Update boxes based on the predicted level
function updateTourismActivityBoxes(predictedLevel) {
  const busyBox = document.getElementById('busyBox');
  const moderateBox = document.getElementById('moderateBox');
  const lowBox = document.getElementById('lowBox');

  // Reset all boxes to active
  initializeTourismActivityBoxes();

  // Gray out the non-predicted boxes
  switch (predictedLevel) {
    case 'busy':
      moderateBox.className = 'tourism-box inactive';
      lowBox.className = 'tourism-box inactive';
      break;
    case 'moderate':
      busyBox.className = 'tourism-box inactive';
      lowBox.className = 'tourism-box inactive';
      break;
    case 'low':
      busyBox.className = 'tourism-box inactive';
      moderateBox.className = 'tourism-box inactive';
      break;
  }
}

// Set the default date to today
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
const dd = String(today.getDate()).padStart(2, '0');

const formattedToday = `${yyyy}-${mm}-${dd}`;
dateElement.value = formattedToday;

// Dispatch an event to trigger any 'change' event listeners
dateElement.dispatchEvent(new Event('change'));

function getRainCategory(dailyrain) {
  if (dailyrain === 0) return 'Clear';
  if (dailyrain > 0 && dailyrain <= 5) return 'Slight rain';
  if (dailyrain > 5 && dailyrain <= 15) return 'Moderate rain';
  if (dailyrain > 15 && dailyrain <= 30) return 'Heavy rain';
  if (dailyrain > 30 && dailyrain <= 50) return 'Very heavy rain';
  if (dailyrain > 100) return 'Extreme rain';
  return 'No data';
}

function getRecommendation() {
  const selectedDate = new Date(dateElement.value);
  const rain = prediction.rain;  // Use the global prediction object
  const season = getSeason(selectedDate);

  let recommendationKey;
  if (season === 'Summer') {
    recommendationKey = (rain <= 5) ? 'Summer and Dry' : 'Summer and Wet';
  } else if (season === 'Winter') {
    recommendationKey = (rain <= 5) ? 'Winter and Dry' : 'Winter and Wet';
  } else if (season === 'Spring') {
    recommendationKey = (rain <= 5) ? 'Spring and Dry' : 'Spring and Wet';
  } else {
    recommendationKey = (rain <= 5) ? 'Autumn and Dry' : 'Autumn and Wet';
  }

  const recommendation = weatherPlaceDB[recommendationKey];
  if (!recommendation) {
    console.log("No recommendations found for this season and weather condition.");
    return;
  }

  // Create HTML content for each category
  let recommendationHTML = '<div class="categories-container">';
  for (const [category, items] of Object.entries(recommendation)) {
    recommendationHTML += `<div class="recommendation-category"><h6>${category}:</h6><ul>`;
    items.forEach(item => {
      recommendationHTML += `<li class="recommendation-item">${item}</li>`;
    });
    recommendationHTML += '</ul></div>';
  }
  recommendationHTML += '</div>';

  const placeRecommendation = document.getElementById('placeRecommendation');
  // Create or get the existing recommendation list container
  let recommendationContainer = document.getElementById('recommendationContainer');
  if (!recommendationContainer) {
    recommendationContainer = document.createElement('div');
    recommendationContainer.id = 'recommendationContainer';
    placeRecommendation.appendChild(recommendationContainer);
  }
  
  // Set the new recommendations
  recommendationContainer.innerHTML = recommendationHTML;
}

document.getElementById('getRecommendationButton').addEventListener('click', function() {
  const selectedDate = new Date(dateElement.value);
  fetchForecastWeather(selectedDate)
    .then(() => {
      getRecommendation();
    })
    .catch(error => {
      console.error("Error fetching weather data: ", error);
    });
});

// This will run when the document is fully loaded
document.addEventListener("DOMContentLoaded", function() {
  // Initialize boxes to be active
  initializeTourismActivityBoxes();

  const dateElement = document.getElementById('holidayDate');
  const predictedWeatherElement = document.getElementById('predictedWeatherOutput');

  dateElement.addEventListener('change', function() {
    // Add a delay (buffer) of 2 seconds
    setTimeout(async () => {
      const selectedDate = dateElement.value;
      const today = new Date();
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(today.getDate() + 30);
      const thirtyDaysBefore = new Date();
      thirtyDaysBefore.setDate(today.getDate() - 30);
    
      if (new Date(selectedDate) > thirtyDaysBefore && new Date(selectedDate) < thirtyDaysFromNow) {
        // Fetch forecast weather data
        prediction = await fetchForecastWeather(selectedDate);
      } else {
        // Use ML model to predict weather (Your existing code)
        prediction = await predictWeather(selectedDate);  // Assuming predictWeather is defined elsewhere
      }
      
      // Update UI
      const boldCat = `<b>${getRainCategory(prediction.rain)}</b>`;
      const boldTemperature = `<b>${prediction.temperature}°C</b>`;
      const boldRain = `<b>${prediction.rain}mm</b>`;
      const formattedDate = formatDate(selectedDate);
      predictedWeatherElement.innerHTML = `The weather you're most likely to experience in Melbourne on <b>${formattedDate}</b>, is an average temperature of ${boldTemperature}. With a total expected rainfall of ${boldRain} for the day, the conditions are likely to be ${boldCat}.`;

      // For demonstration, using a static 'moderate' value for tourism activity
      // In a real-world scenario, this would be predicted by your model or fetched from an API
      updateTourismActivityBoxes('moderate');
    }, 2000);
  });
});

document.addEventListener("DOMContentLoaded", function() {
  // Dropdown Functionality
  const btn = document.querySelector(".dropbtn");
  btn.addEventListener("click", function() {
    document.getElementById("categoryDropdown").classList.toggle("show");
  });

  // Filter Functionality
  const filterCategoryDiv = document.getElementById('categoryDropdown');
  
  // Function to apply filter
  function applyFilter() {
    const allCategories = document.querySelectorAll('.recommendation-category');
    const checkedBoxes = filterCategoryDiv.querySelectorAll('input[type=checkbox]:checked');
    const checkedCategories = Array.from(checkedBoxes).map(box => box.name);

    allCategories.forEach((categoryDiv) => {
      const categoryName = categoryDiv.querySelector('h6').textContent.replace(':', '');
      if (checkedCategories.includes('all') || checkedCategories.includes(categoryName)) {
        categoryDiv.style.display = 'block';
      } else {
        categoryDiv.style.display = 'none';
      }
    });
  }
  
// Function to reset all filters
function resetFilter() {
  const allCheckboxes = filterCategoryDiv.querySelectorAll('input[type=checkbox]');
  allCheckboxes.forEach(box => box.checked = false);
  document.getElementById('all').checked = true; // set "All" to checked
  applyFilter();
}

// Adding an event listener to reset filter button
const resetBtn = document.getElementById("resetFilterButton");
resetBtn.addEventListener("click", resetFilter);


  filterCategoryDiv.addEventListener('change', function(event) {
    // Uncheck "All" if any other categories are selected
    if (event.target.id !== 'all' && event.target.checked) {
      document.getElementById('all').checked = false;
    }
    
    // Check "All" if no other categories are selected
    const checkedBoxes = filterCategoryDiv.querySelectorAll('input[type=checkbox]:checked');
    if (checkedBoxes.length === 0 || (checkedBoxes.length === 1 && checkedBoxes[0].id === 'all')) {
      document.getElementById('all').checked = true;
    }
    
    // Apply the filter
    applyFilter();
  });
  
  // Initial filter application
  applyFilter();
});