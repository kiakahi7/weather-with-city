const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});


app.post("/", function(req, res) {
    

        const units = "imperial";
        const lat = req.body.latCoord;
        const lon = req.body.longCoord;
        const apiKey = "5aff7aec1194d22b9dc26e7a6e86b8d6";
        const url = "api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=" + units + "&APPID=" + apiKey;
    

    https.get(url, function(response){
        console.log(response.statusCode);
        
 
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const tempMin = weatherData.main.temp_min;
            const tempMax = weatherData.main.temp_max;
            const city = weatherData.name;
            const windSpeed = weatherData.wind.speed;
            const windDirection = weatherData.wind.deg;
            const weatherDescription = weatherData.weather[0].description; 
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
            

            res.write("<h1> The weather is " + weatherDescription + "<h1>");
            res.write("<h2>The Minimum Temperature in " + city + " is " + tempMin + " Degrees Fahrenheit<h2>");
            res.write("<h2>The Maximum Temperature is " + tempMax + " Degrees Fahrenheit<h2>");
            res.write("Wind speed is " + windSpeed+  " miles/hour with a direction of " + windDirection + " Meteorological Degrees" );
            res.write("<img src=" + imageURL +">");
            res.send();
        });
    });
});


app.listen(process.env.PORT || 3000, function() {
console.log ("Server is running on port");
});
