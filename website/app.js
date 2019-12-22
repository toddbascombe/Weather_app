/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();
const weatherApi = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const currentApi = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&APPID=24ee761b29b537c6cb57bbcd2097d2e3";

const userInfo = () => {
  const userZipCode = document.querySelector("#zip").value;
  getWeather(userZipCode);
};

const getWeather = async zip => {
  await fetch(currentApi + zip + apiKey).then(value2 => {
    value2.json().then(current_weather_api_value => {
      postData("/", current_weather_api_value);
      add_server_data();
    });
  });
};

const postData = async (url = "", data) => {
  const res = await fetch(url, {
    method: "POST",
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

const add_server_data = async () => {
  await fetch("/weather").then(server_data => {
    server_data.json().then(data => {
      document.querySelector(".city h2").textContent = data[0].userWeather.name;
      if (data[0].userWeather.weather.main == "Clouds") {
        document.querySelector(".image img").
      }
    });
  });
};

const search = document
  .querySelector("#generate")
  .addEventListener("click", userInfo);
