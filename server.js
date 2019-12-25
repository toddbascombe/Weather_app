// Setup empty JS object to act as endpoint for all routes
projectData = {};

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
  projectData.current_weather = data;
  console.log(data);
  
});

app.post("/future_weather", (req, res)=>{
  const data = req.body;
  projectData.future_weather = data;
  
})

app.get("/weather", (req, res) => {
  res.send([projectData]);
});

// Setup Server
app.listen(port, () => {
  console.log("server is ready!!");
});
