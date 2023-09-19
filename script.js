const activities = {
    summer: ['Beach', 'Camping', 'Wildlife'],
    autumn: ['Wine Tasting', 'Scenic Drives', 'River Cruise'],
    winter: ['Snow Activities', 'Day Trips', 'Shopping'],
    spring: ['Hiking Trail', 'Sport Events', 'Outdoor Dining']
  };
  
  const destinations = {
    summer: {
      Beach: ['St Kilda Beach', 'Brighton Beach', 'Port Melbourne Beach'],
      Camping: ['Cumberland River Holiday Park', 'Marengo Holiday Park', 'Johanna Beach, Great Ocean Road'],
      Wildlife: ['Werribee Zoo', 'Melbourne Zoo', 'Melbourne Aquarium']
    },
    // Add other seasons and their respective destinations here
  };
  
  function showActivities() {
    const holidayType = document.getElementById('holidayType').value;
    const activitySelect = document.getElementById('activityType');
    const options = activities[holidayType];
    activitySelect.innerHTML = '';
  
    options.forEach(function(activity) {
      const optionElement = document.createElement('option');
      optionElement.value = activity;
      optionElement.text = activity;
      activitySelect.appendChild(optionElement);
    });
  
    document.getElementById('activityOptions').style.display = 'block';
  }
  
  function showDestinations() {
    const holidayType = document.getElementById('holidayType').value;
    const activityType = document.getElementById('activityType').value;
    const destinationList = document.getElementById('destinationList');
    const recommendedDestinations = destinations[holidayType][activityType];
    destinationList.innerHTML = '';
  
    recommendedDestinations.forEach(function(destination) {
      const listItem = document.createElement('li');
      listItem.textContent = destination;
      destinationList.appendChild(listItem);
    });
  }  