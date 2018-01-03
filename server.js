const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
var path = require('path')

app.use(express.static(path.join(__dirname, 'public')));

const apiKey = 'd4fa923856789582ad5c95c9faa16564'; 


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {weather: null, error: null});
})

app.post('/', function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again'});
    } else {
      let weather = JSON.parse(body)
      
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again'});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}! With 
        and highs of ${weather.main.temp_max} degress and lows of ${weather.main.temp_min} degrees!`;
        res.render('index', {weather: weatherText, error: null});
        //console.log(weather); 
      }
    }
  });
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})





