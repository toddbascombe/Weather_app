/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const weatherApi = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const currentApi = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&APPID=24ee761b29b537c6cb57bbcd2097d2e3";

const userInfo = () => getWeather(document.querySelector("#zip").value);

const getWeather = async zip => {
  let [current_weather, future_weather] = await Promise.all([
    fetch(currentApi + zip + apiKey),
    fetch(weatherApi + zip + apiKey)
  ]);
  current_weather.json().then(value => {
    postData("/", value);
    add_server_data();
  });
  future_weather.json().then(value => {
    postData("/future_weather", value);
    add_server_data();
  });
};

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

const kelvin_to_fahrenheit = kelvin_temp =>
  Math.round(kelvin_temp * 1.8 - 459.67);

const element_creator = (element, classInfo) =>
  (document.createElement(element).className = classInfo);

const weather_append = weather_data => {
  const entry = document.querySelector(".entry");
  for (weather of weather_data) {
    let entryHolder = element_creator("div", "entryHolder");
    let date = element_creator("div", "date");
    let temp = element_creator("div", "temp");
    let icon = element_creator("div", "icon");
    entryHolder.appendChild(date);
    entryHolder.appendChild(icon);
    temp.innerHTML = `<p>${kelvin_to_fahrenheit(weather.main.temp)}&deg</p>`;
    entryHolder.appendChild(temp);
    entry.appendChild(entryHolder);
  }
};
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
    });
  });
};

const search = document
  .querySelector("#generate")
  .addEventListener("click", userInfo);
