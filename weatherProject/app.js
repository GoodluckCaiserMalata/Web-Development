const express = require("express");
const https = require("https");
const app = express();



app.get("/", function(req, res){
    const url = "https://api.openweathermap.org/data/2.5/weather?q=Dar%20es%20salaam&appid=fe29077b9151647e913fed4ad354910a&units%20=metricapi.openweathermap.org/data/2.5/weather?q=Dar es salaam&appid=fe29077b9151647e913fed4ad354910a&units =metric";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data", function(data){
            console.log(data);
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" +icon +"@2x.png"
            res.write("The tempurature in Dar es salaam is " + temp + " degree celcious");
            res.write("<img src="+ imageURL +">");
            res.send();
        });

    });
});

app.listen(3000, function(){
    console.log("server is starting at port 3000!");

});