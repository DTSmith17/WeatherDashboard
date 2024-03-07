const searchButtons = document.getElementsByClassName("cityInput");

//getApi- Pass in the city name and make a fetch request to get the forecast for that city
async function getApi(cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=56e36f99ead2fd7da124d40234c7f905`;

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

}

//
for (const button of searchButtons) {
  let cityName;
  // checking to see of button has a valid City name in the ID
  if (button.id === "searchButton") {
    cityName = document.getElementById("searchText").value;
  } else {
    cityName = button.textContent;
  }
  button.addEventListener("click", function () {
    getApi(cityName);
  });
}
