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
