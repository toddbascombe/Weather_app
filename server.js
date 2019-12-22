// Setup empty JS object to act as endpoint for all routes
projectData = {};
const mainImages = {
  hot: "https://media.giphy.com/media/26BRR33sZ9O08MPG8/source.gif",
  cold: "https://media.giphy.com/media/26FLdaDQ5f72FPbEI/source.gif",
  rain: "https://media.giphy.com/media/3oKIPstwMF15FghbYQ/source.gif",
  snow: "https://media.giphy.com/media/RBBWcwzuYIoOA/source.gif",
  windy: "https://media.giphy.com/media/2v1Y2dt4FvwI0/source.gif",
  storm: "https://media.giphy.com/media/67vBafnTcPz85kXnE0/source.gif",
  tornado: "https://media.giphy.com/media/ed8JGxnQmrke4/source.gif",
  clear_sky: "https://media.giphy.com/media/VxbvpfaTTo3le/source.gif",
  cloudy: "https://media.giphy.com/media/alEGxmahCCywE/source.gif"
};

const current_weather = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 8080;
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

app.get("/", (req, res) => {
  res.send("index");
});

app.post("/", (req, res) => {
  const data = req.body;
  projectData.userWeather = data;

  console.log(projectData.userWeather.name);
});

app.get("/weather", (req, res) => {
  res.send([projectData, mainImages]);
});

// Setup Server
app.listen(port, () => {
  console.log("server is ready!!");
});
