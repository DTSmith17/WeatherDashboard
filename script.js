const searchButton = document.getElementsByClassName('cityInput');

async function getApi() {
    const cityName = document.getElementsByClassName("CityInput").value;
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=56e36f99ead2fd7da124d40234c7f905`;
    
    
    fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
    })

    // const weatherData = await fetchData(apiUrl);
    // const data = await weatherData.json()
    // console.log(data)

}
      
  
  searchButton.addEventListener('click', getApi);