/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
const country_code = ',us';
const weatherApi ="http://api.openweathermap.org/data/2.5/forecast?zip="
const apiKey = "&APPID=24ee761b29b537c6cb57bbcd2097d2e3"

const userInfo = ()=>{
    const userZipCode = document.querySelector("#zip").value;
    getWeather(userZipCode);
}

const getWeather = async(zip)=>{
    const res = await fetch(weatherApi+zip+country_code+apiKey)
    .then(value =>{
        value.json().then(weather=>{
            postData("/", weather)
        })
        
    })
}

const postData = async(url='', data)=>{
    const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: 'same-origin',
        headers:{
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(data)
    });
    try{
        const newData = await res.json();
        return newData
    }catch(err){
        console.log("Error "+ err)
    }
}


const search = document.querySelector("#generate").addEventListener("click", userInfo)