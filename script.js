let searchedAreaWeather_form = document.querySelector('.searchedAreaWeather_form')
let searchedArea = document.querySelector('.searchedLocationName')

let cityCountryNameShow = document.querySelector('.weather_cityCountry')
let dateTime = document.querySelector('.weather_date_time')
let weatherName = document.querySelector('.weather_forecast_name')
let weatherIconImg = document.querySelector('.weather_forecast_IconImg')
let weathertemp = document.querySelector('.weather_temperature')
let weatherMin =  document.querySelector('.weather_Min')
let weatherMax =  document.querySelector('.weather_Max')

let weather_feelsLike =  document.querySelector('.weather_feelsLikeN')
let weather_Humadity =  document.querySelector('.weather_HumadityN')
let weather_Wind =  document.querySelector('.weather_WindN')
let weather_Pressure =  document.querySelector('.weather_PressureN')




//for getting full country name.

let getFullCountryName = (countryCode)=>{

    const regionNamesInEnglish = new Intl.DisplayNames([countryCode], { type: 'region' })
    const convertedregionNamesInEnglish = regionNamesInEnglish.of(countryCode);
    return convertedregionNamesInEnglish;
    

    // or in short

    //? const regionNamesInEnglish = new Intl.DisplayNames([countryCode], { type: 'region' }).of(countryCode); // .of() method
    //? return regionNamesInEnglish;

};


//  for getting full day, date, time from dt(milisec)

let getDateTime = (dt)=>{  // dt: This variable holds a time value in seconds since the Unix epoch (January 1, 1970).
    // let dt = 1728470565
    const curDayDateTime = new Date(dt * 1000); // we got seconds since the Unix epoch (January 1, 1970) till today and convert into milisecond then further work new Date() does.
    // return curDayDateTime;
    console.log(curDayDateTime);
    // return curDayDateTime;

    const options = {

     weekday: "long", // this is problem of new Date() method and solved by Intl.DateTimeFormat() and format() method.
     year: "numeric",
     month: "long", // this is problem of new Date()  method and solved by Intl.DateTimeFormat() and format() method.
     day: "numeric",
     hour : "numeric",
     minute: "numeric",
    //  second: "numeric"l

    }

    const formatter = new Intl.DateTimeFormat("en-US", options)

    const formattedDate = formatter.format(curDayDateTime) // .format() method
    
    return formattedDate;



    // or in short

    //?   const formatter = new Intl.DateTimeFormat("en-US", options);
    //?   return formatter.format(curDayDateTime);

};

let searchedAreaName = "pune"; // by default set


// search functionality


searchedAreaWeather_form.addEventListener('submit', (e)=>{
    e.preventDefault();

    console.log(searchedArea.value);

    searchedAreaName = searchedArea.value; // input data only takes when form is submit. it can submit via form element or inside another.
    
    searchedArea.value = '';

    getWeatherData();

    

})



let getWeatherData = async ()=>{


    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedAreaName}&APPID=ee721b7475d906423f58c97281e7b3ea`; 

     try{

      let response = await fetch(weatherUrl)
      let data  = await response.json();  
      console.log(data);
    //   console.log(data.name);

         
    // cityCountryNameShow.innerHTML = `${data.name}, ${data.sys.country }`; // before📗🔖
    cityCountryNameShow.innerHTML = `${data.name}, ${ getFullCountryName(data.sys.country) }`;

    // dateTime.innerHTML = data.dt; // before📗🔖
    dateTime.innerHTML = getDateTime(data.dt);

    weatherName.innerHTML = data.weather.description;
    // searchedAreaWeather_form
    weatherName.innerHTML = data.weather[0].main;

    // weatherIconImg.innerHTML  = data.weather[0].icon;

    weatherIconImg.innerHTML  =  `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png" />`;


    weathertemp.innerHTML = `${data.main.temp.toFixed()}&#176`; // 📗🔖 why template literal need us in programming it is real usecase. real scenario. when from js we need to show html comtent in web page.

    weatherMin.innerHTML = `Min: ${data.main.temp_min}&#176`; // 📗🔖 why template literal need us in programming it is real usecase. real scenario. when from js we need to show html comtent in web page.

    weatherMax.innerHTML = `Max: ${data.main.temp_max}&#176`;// 📗🔖 why template literal need us in programming it is real usecase. real scenario. when from js we need to show html comtent in web page.



    weather_feelsLike.innerHTML = `${data.main.feels_like.toFixed()}&#176`;

    weather_Humadity.innerHTML = `${data.main.humidity}%`;

    weather_Wind.innerHTML = `${data.wind.speed} m/s`;

    weather_Pressure.innerHTML = data.main.pressure;

    // Object Destructuring  --- real use ---

    // let [main, name, weather, wind, sys, dt] = data;

    // cityCountryNameShow.innerHTML = `${name}, ${sys.country}`;

     } catch(err){

        console.log(err);
        alert("Please enter the correct area.")

     }
}

document.body.addEventListener('load', getWeatherData())
