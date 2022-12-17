const express = require('express');
const https = require('https');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(req,res)
{ 
   res.sendFile(__dirname+"/index.html");
});


app.post("/",function(req,res){

    
    const query=req.body.cityName;

    const apiKey="0948a0da6f1a13368371c61b850897c7";

    const units="metric";

    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;

    https.get(url,function(response)
        { 
            
        console.log(response.statusCode);

    
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp = weatherData.main.temp
            const weatherdescription = weatherData.weather[0].description
            const icon=weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/"+icon+"@2x.png"

            res.write("<p>The Weather is currently " + weatherdescription+"</p>");

            res.write("<h1>The Temprature in "+query+" is "+temp+" degress Celcius.</h1>");

            res.write("<img src= "+imageURL+" >");

            res.send();
        })
    });


    
})






app.listen(3000,function(){

    console.log("Server is Running on 3000");
})


