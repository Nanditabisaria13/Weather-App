

const weatherapp = document.querySelector('.weatherapp');
const wrapper = document.querySelector('.wrapper');

//start function
function startwin(){
    weatherapp.style.display= "none";
     wrapper.style.display = "flex";
    searchform.style.display = 'flex'
}

const weatherwrapper = document.querySelector(".weather-wrapper");
const yourWeatherContainer = document.querySelector(".your-weather");
const searchform = document.querySelector(".searchform");
const searchform2 = document.querySelector(".searchform2");
const loadingScreen = document.querySelector(".loading-container");
const loadingScreen2 = document.querySelector(".loading-container2");
const userInfoContainer = document.querySelector(".weather-information");
const showweather = document.querySelector('.showweather');
const showweatherinfo = document.querySelector('.showweatherinfo');
const searchvideo = document.querySelector('.searchvideo');
const error = document.querySelector('.error');

//api key
const API_KEY = "bee46cd94ceb8778cb2f2ff7c7989a3e";

//  function for user city weather information

async function getUserWeatherInfo(coordinates) {
    const {lat, lon} = coordinates;
    yourWeatherContainer.classList.add("active");
    loadingScreen2.style.display= 'block'
     
    
    //API CALL
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY} `
          );
        const  data = await response.json();
        loadingScreen2.style.display= 'none'
        userInfoContainer.classList.add("active");
        showweather.classList.add('active');
        showWeatherInfo(data);
        usertemp();
    }
    catch(err) {
        loadingScreen2.classList.remove("active");
        console.log("sorry! can't get the weather info")

    }

}

// function to display the the weather information

function showWeatherInfo(weatherInfo) {
    
    const cityName = document.querySelector(".cityName");
    const countryIcon = document.querySelector(".country-icon");
    const desc = document.querySelector(".weather-desc");
    const weatherIcon = document.querySelector(".weather-icon");
    const temp = document.querySelector(".citytemp");
    const windspeed = document.querySelector(".windspeed");
    const humidity = document.querySelector(".humidity");
    const cartoonIcon = document.querySelector(".weather-gif")
    const pressure = document.querySelector(".pressure");
    const visibility = document.querySelector(".visibility");
    const error = document.querySelector('.error');
    const userInfoContainer = document.querySelector(".weather-information");
   const showweather = document.querySelector('.showweather');

    console.log(weatherInfo);

    //fetch values from weatherINfo
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `http://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
     temp.innerText = weatherInfo?.main?.temp+ '°C';
    windspeed.innerText = weatherInfo?.wind?.speed+ 'm/s';
    humidity.innerText = `${weatherInfo?.main?.humidity}%`;
    pressure.innerText = weatherInfo?.main?.pressure+'hPa'
      visibility.innerText=  (weatherInfo?.visibility/1000)+"km"

    // show the weather gif
     if(weatherInfo?.weather?.[0]?.main == 'Clear'   && weatherInfo?.main?.temp >= 30 &&  weatherInfo?.main?.temp <= 45 && weatherInfo?.weather?.[0]?.icon=='01d' ){
        cartoonIcon.src = 'gif/sunnyweather.mp4'
        error.style.display="none";
      
   }

    else if(weatherInfo?.weather?.[0]?.main == 'Clear'  && weatherInfo?.main?.temp >= 45 &&  weatherInfo?.weather?.[0]?.icon=='01d' ){
    cartoonIcon.src = 'gif/hotweather.mp4'
    error.style.display="none";      
}

  else if(weatherInfo?.weather?.[0]?.main == 'Clear' &&    weatherInfo?.weather?.[0]?.icon=='01n'){
    cartoonIcon.src = 'gif/nightskyy.mp4'
    error.style.display="none";     
  }

  

else if(weatherInfo?.weather?.[0]?.main == 'Clear' ){
    cartoonIcon.src = 'gif/sky.mp4'
    error.style.display="none";
}



    else if( weatherInfo?.weather?.[0]?.description=='broken clouds'  ){
        cartoonIcon.src = 'gif/cloud2.mp4'
        error.style.display="none";
    }

    else if( weatherInfo?.weather?.[0]?.description=='few clouds'  ){
        cartoonIcon.src = 'gif/cloud1.mp4'
        error.style.display="none";
    }


    else if( weatherInfo?.weather?.[0]?.description=='scattered clouds' ){
        cartoonIcon.src = 'gif/cloud3.mp4'
        error.style.display="none";
       
    }
  
    else if( weatherInfo?.weather?.[0].main=='Clouds' ){
        cartoonIcon.src = 'gif/cloudsgif.mp4'
        error.style.display="none";
    }


    else if(weatherInfo?.weather?.[0]?.main == 'Dust'){
        cartoonIcon.src = 'gif/dust3.mp4'
        error.style.display="none";
                
    }
    
    else if (weatherInfo.weather?.[0].main=='Rain') {
        cartoonIcon.src = 'gif/rainingweathergif.mp4'
        error.style.display="none";
    }

    else if (weatherInfo?.weather?.[0]?.main=='Drizzle') {
        cartoonIcon.src = 'gif/drizzle.mp4'
        error.style.display="none";
    }
    else if (weatherInfo?.weather?.[0]?.main=='Mist') {
        cartoonIcon.src = 'gif/mist.mp4'
        error.style.display="none";
    }
    else if (weatherInfo?.weather?.[0]?.main=='Haze') {
        cartoonIcon.src = 'gif/Haze.mp4'
        error.style.display="none";
    }
    
    else if (weatherInfo?.weather?.[0]?.main=='Snow') {
        cartoonIcon.src = 'gif/snowgif.mp4'
        error.style.display="none";
    }

     
    else if (weatherInfo?.weather?.[0]?.main== "Thunderstorm") {
        cartoonIcon.src = 'gif/strom.mp4'
        error.style.display="none";
    }

   else if (weatherInfo?.weather?.[0]?.main== "smoke") {
        cartoonIcon.src = 'gif/smokegif.mp4'
        error.style.display="none";
    }
    
    else if (weatherInfo?.weather?.[0]?.main== "Fog") {
        cartoonIcon.src = 'gif/foggif.mp4'
        error.style.display="none";
    }

   
   else if(weatherInfo?.message == 'city not found' ){
     error.style.display="flex";
     userInfoContainer.classList.remove("active");
    
  }

    weatherwrapper.classList.add('active');
    searchform2.classList.add('active');
      
}

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        yourWeatherContainer.classList.add("active");
        loadingScreen2.style.display= 'block'

    }
    else {
        alert("Sorry! can't access the location");
    }
}


function showPosition(position) {

    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    }

    sessionStorage.setItem("user-coordinates", JSON.stringify(userCoordinates));
    getUserWeatherInfo(userCoordinates);

}

const useLocationBtn = document.querySelector(".uselocation");
useLocationBtn.addEventListener("click", getLocation);

const searchInput = document.querySelector(".data-searchInput");
const searchInput2 = document.querySelector(".data-searchInput2");

searchform.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput.value;

    if(cityName === "")
        return;
    else 
        getSearchWeatherInfo(cityName);
})


searchform2.addEventListener("submit", (e) => {
    e.preventDefault();
    let cityName = searchInput2.value;

    if(cityName === "")
        return;
    else 
        getSearchWeatherInfo(cityName);
})

// function to get search weather information
async function getSearchWeatherInfo(city) {
    searchvideo.style.display="none"
    loadingScreen.classList.add("active");
  
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
          );
        const data = await response.json();
        loadingScreen.classList.remove("active");
        
        showweather.classList.add('active');
        userInfoContainer.classList.add("active");

        showWeatherInfo(data);
        resetUnit();
        
    }
       
    catch(err) {
        console.log(err);
        alert("sorry! Can't fetch the weather information");
    }
}

// loading function
function loading(){
    loadingScreen.classList.add('active')
}

// back-function
function goback(){
    showweather.classList.remove('active');
    userInfoContainer.classList.remove("active");
    weatherwrapper.classList.remove('active');
    searchvideo.style.display='block'
    yourWeatherContainer.classList.remove("active");
}

// go to main page function
function goback2(){
location.reload();
}

// go to setting function

const settingdiv = document.querySelector('.settingdiv')
function setting(){
    showweather.classList.remove('active');
    settingdiv.style.display="block"
}


function backtoweather(){
    showweather.classList.add('active');
    settingdiv.style.display="none"

    
}

// Function to change the user city temperature in celsius
function usertemp(){
    const temp = document.querySelector(".citytemp");
    temper= temp.innerText.replace("°C"," ")  
    temp.innerText = (temper-273).toFixed(2)+"°C";
}

// Change Unit:

// changre the temperature

const tempid = document.getElementById('tempid');
tempid.addEventListener("change",select);

var temper;

function select(){
    const temp = document.querySelector(".citytemp");
   
    const option = tempid.value;
  
    temper= temp.innerText.replace("°C"," ")
     
        if(option ==='Fahrenheit'){
            temp.innerText = ((temper*9/5)+32).toFixed(2)+"°F";
            
        }

        else if(option === 'Celsius'){
            temper =  temp.innerText.replace("°F"," ")
            temp.innerText = ((temper-32)*5/9).toFixed(2)+"°C";
        }   
           
    }

    // change the unit of windspeed

    const windid = document.getElementById('windid');
    windid.addEventListener("change",selectwindspeed);
    
    const windspeed = document.querySelector(".windspeed");
    var wind;

    function selectwindspeed(){
        const option2 = windid.value;
        wind = windspeed.innerText.replace("m/s"," ")
        if(option2 === 'Kilometresperhour'){
            windspeed.innerText = (wind*3.6).toFixed(2) + "km/h"
        }

        else if(option2 === 'metrespersecond'){
            wind = windspeed.innerText.replace("km/h"," ")
            windspeed.innerText = (wind/3.6).toFixed(2) + "m/s"
        }
    }

    //change the unit of air preesure

    const airid = document.getElementById('airid');
    airid.addEventListener("change",selectairpr);
    const pressure = document.querySelector(".pressure");
   
    var air;

       function selectairpr(){
        const option3 = airid.value;
        air = pressure.innerText.replace("hPa"," ")

        if(option3 === 'inchesofmercury'){
            pressure.innerText = (air/33.864).toFixed(2) + "inHg"
        }

       else if(option3 === 'hectopascal'){
         air = pressure.innerText.replace("inHg"," ") 
            pressure.innerText = (air*33.864).toFixed() + "hPa"
       }
    }

//    change the unit of visibility

    const visibilityid = document.getElementById('visibilityid');
    visibilityid.addEventListener("change",selectvisibility);
    const visibility = document.querySelector(".visibility");
   
    var vis;

    function selectvisibility(){
        const option4 = visibilityid.value;
        vis = visibility.innerText.replace("km"," ")

        if(option4 === 'miles'){
            visibility.innerText = (vis/1.609).toFixed(2) + "miles"
        }

       else if(option4 === 'kilometres'){
         vis = visibility.innerText.replace("miles"," ") 
            visibility.innerText = (vis*1.609).toFixed() + "km"
       }
    }

    //reset the unti:

    function resetUnit(){
    tempid.value='Celsius'
    windid.value='metrespersecond'
    airid.value='hectopascal'
    visibilityid.value='kilometres'

}




