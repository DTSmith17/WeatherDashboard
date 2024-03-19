const searchButtons = document.getElementsByClassName("cityInput");
//getApi- Pass in the city name and make a fetch request to get the forecast for that city
async function getApi(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=56e36f99ead2fd7da124d40234c7f905&units=imperial`;

  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayWeatherData(data);
    });
}

//Get data from getApi function to display
function displayWeatherData(data) {
  //Filters through weather data and retrieves only weather for 12 noon, which returns weather for 5 days out
  const weatherResultsEl = document.querySelector(".resultsSection .results");
  const wkForecast = data.list.filter((element, index, array) => {
    //return true or false if noon
    const hour = element.dt_txt.split(" ")[1].split(":")[0];
    if (hour == 12) {
      return true;
    }
  });
  //populates weather card for main section
  weatherResultsEl.innerHTML = generateWeatherCardHtml(
    wkForecast[0],
    data.city.name
  );

  //populate 5day forecast div
  const weatherResultsE2 = document.querySelector(
    ".resultsSection .fiveDayForecast"
  );
  const fiveDayTitle = document.getElementById("fiveDayTitle");
  fiveDayTitle.style.display = "contents"; //display the title when weather data is produced
  weatherResultsE2.innerHTML = "";
  for (let i = 0; i < wkForecast.length; i++) {
    weatherResultsE2.innerHTML += generateWeatherCardHtml(wkForecast[i]);
  }
}

//return the html for a single days weather data
function generateWeatherCardHtml(data, cityName) {
  const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  return `<div><h1>${
    cityName ? cityName + " " : ""
  }${new Date().toLocaleDateString()}</h1> <img src=${weatherIcon}>
  <p>Temp: ${data.main.temp}°F</p>
  <p>Wind: ${data.wind.speed} MPH</p>
  <p>Humidity: ${data.main.humidity}%</p></div>`;
}

let searchHistory = [];
function addToSearchHistory(cityName) {
  if (!searchHistory.includes(cityName)) {
    searchHistory.push(cityName);
    updateSearchHistory();
  }
}

// Function to update the search history buttons
function updateSearchHistory() {
  const searchHistoryContainer = document.getElementById("searchHistory");
  searchHistoryContainer.innerHTML = "";

  searchHistory.forEach((cityName) => {
    const button = document.createElement("button");
    button.textContent = cityName;
    button.addEventListener("click", () => {
      cityName = button.textContent;
      getApi(cityName);
    });
    searchHistoryContainer.appendChild(button);
  });
}

// Call this function whenever a city is searched and needs to be added to the search history

document.getElementById("searchButton").addEventListener("click", function () {
  cityName = document.getElementById("searchText").value;
  getApi(cityName);
  addToSearchHistory(cityName);
});
