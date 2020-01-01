/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
//forcast data api url
const weatherApi = "http://api.openweathermap.org/data/2.5/forecast?zip=";
//current data api url
const currentApi = "http://api.openweathermap.org/data/2.5/weather?zip=";
//openweathermap api key
const apiKey = "&APPID=24ee761b29b537c6cb57bbcd2097d2e3";
//get the user zipcode input
const userInfo = () => getWeather(document.querySelector("#zip").value);

//getWeather -> fetch data from the api and post the data to the server
const getWeather = async zip => {
  let [current_weather, future_weather] = await Promise.all([
    fetch(currentApi + zip + apiKey),
    fetch(weatherApi + zip + apiKey)
  ]);
  current_weather.json().then(value => {
    postData("/", value);
  });
  future_weather.json().then(value => {
    postData("/future_weather", value);
    //after posting the data, get the data from the server
    add_server_data();
  });
};

//post data in json format in cors mode to the server
const postData = async (url = "", data) => {
  const res = await fetch(url, {
    method: "post",
    mode: "cors",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  try {
    const newData = await res.json();
    console.log(newData);
    return newData;
  } catch (err) {
    console.log("Error " + err);
  }
};

//convert kelvin to fahrenheit
const kelvin_to_fahrenheit = kelvin_temp =>
  Math.round(kelvin_temp * 1.8 - 459.67);

//creates a given element and a class
const element_creator = (element, class_name) => {
  const element_holder = document.createElement(element);
  element_holder.className = class_name;
  return element_holder;
};

//convert unix timestamp to UTC time and return the hour
const unix_timestamp_converter = unix_timestamp => {
  const date_info = new Date(unix_timestamp * 1000);
  return date_info.getHours();
};

//convert military hour in to stand hours
const military_time_converter = time_hour => {
  if (time_hour > 0 && time_hour <= 12) {
    return time_hour;
  } else if (time_hour > 12) {
    return time_hour - 12;
  } else if (time_hour == 0) {
    time_hour = 12;
    return time_hour;
  }
};

//dynamically add the future weather data to the UI
const weather_append = weather_data => {
  const entry = document.querySelector(".entry");
  for (weather of weather_data) {
    let entryHolder = element_creator("div", "entryHolder");
    let icon = element_creator("div", "icon");
    let temp = element_creator("div", "temp");
    let weather_date = element_creator("div", "date");
    const ampm = unix_timestamp_converter(weather.dt) >= 12 ? "pm" : "am";
    weather_date.innerHTML = `<p>${military_time_converter(
      unix_timestamp_converter(weather.dt)
    ) + ampm}</p>`;
    icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png" class="current_weather_icon" />`;
    temp.innerHTML = `<p>${kelvin_to_fahrenheit(weather.main.temp)}&deg</p>`;
    entryHolder.appendChild(icon);
    entryHolder.appendChild(temp);
    entryHolder.appendChild(weather_date);
    entry.appendChild(entryHolder);
  }
};

//gets weather data from the server and dynamically updates the UI
const add_server_data = async () => {
  const feel_div_children = document.querySelector(".feel").children;
  await fetch("/weather").then(server_data => {
    server_data.json().then(data => {
      feel_div_children[0].children[0].textContent =
        data[0].current_weather.name;
      feel_div_children[1].innerHTML = `<img src="http://openweathermap.org/img/wn/${data[0].current_weather.weather[0].icon}@2x.png" id="current_weather_icon" />`;
      feel_div_children[3].innerHTML = `<p>${kelvin_to_fahrenheit(
        data[0].current_weather.main.temp
      )}&deg</p>`;
      feel_div_children[4].innerHTML = `<p>Feels like: ${kelvin_to_fahrenheit(
        data[0].current_weather.main.feels_like
      )}&deg</p>`;
      feel_div_children[2].innerHTML = `<p>${data[0].current_weather.weather[0].main}</p>`;
      const entryHolder = document.querySelectorAll(".entryHolder");
      if (entryHolder.length > 0) {
        entryHolder.forEach(element => element.parentNode.removeChild(element));
      }
      weather_append(data[0].future_weather.list.splice(0, 5));
    });
  });
};

//listen for a click on the search button
const search = document
  .querySelector("#generate")
  .addEventListener("click", userInfo);
