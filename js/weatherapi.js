//
//var xLocation = document.getElementById("infoLocation");
//
//function getLocation() {
//    if (navigator.geolocation) {
//        navigator.geolocation.getCurrentPosition(showPosition);
//    } else { 
//        xLocation.innerHTML = "Geolocation is not supported by this browser.";
//    }
//}
//
//function showPosition(position) {
//    xLocation.innerHTML = "Latitude: " + position.coords.latitude.toFixed(2) + 
//    "<br>Longitude: " + position.coords.longitude.toFixed(2);
//}
//    
//var xWeather = document.getElementById("infoWeather")
//
//function getWeather(){
//    xWeather.innerHTML = "29 Deg "
//};

    
// Function to work with Location API to get Longitude, Latitude, City and State to bed used with the weather API
var getLocation = function (data) {
  var lat =data.lat;
  var lon =data.lon;
  var city =data.city;
  var state =data.regionName;
  // Custom url for the weather API, it is only missing imperial or metric format.
  url = 'http://api.openweathermap.org/data/2.5/weather?'+'&APPID=aded2644e0681a69ba5a43f3b1508304' + '&lat=' + lat + '&lon=' + lon + '&units=';
    
var units = 'imperial'
// Function to get the Weather info and display it.
  getWeather = function (data) {
    var temp = data.main.temp
    var tempUnit = units === 'metric' ? 'C' : 'F'
    var windUnit = units === 'metric' ? ' meters/s' : ' miles/h'
    var description = data.weather[0].description
    var code = data.weather[0].icon
    var wspeed = data.wind.speed
    // Create custom HTML to display all the information gathered.
    var html = '<img src="http://openweathermap.org/img/w/' + code + '.png" alt="Weather Icon">' + '<p> ' + Math.round(temp) + ' ' + tempUnit + ', ' + description + '<br> Wind Speed: ' + wspeed + windUnit + '</p><p>' + city + ', ' + state + '</p>'
    // Displays the custom HTML
    $('#weather').html(html)
      
      
      
// Checks what kind style of temperature was used for dynamic background image.
    switch (tempUnit) {
      case 'F':
        var temps = [90, 70, 32]
        break
      case 'C':
        temps = [32, 21, 0]
        break
    }
    // Array of backgroudn images.
    var imgs = ['url("http://i.imgur.com/eI5KLUW.jpg")', 'url("http://i.imgur.com/rG0P1ro.jpg")', 'url("http://i.imgur.com/voCuONs.jpg")', 'url("http://i.imgur.com/5tFHSKa.jpg")']
    // Select custom backgroudn image according to temperature range.
    if (temp >= temps[0]) {
      $('.intro').css('background-image', imgs[0])
    } else if (temp < temps[0] && temp >= temps[1]) {
      $('.intro').css('background-image', imgs[1])
    } else if (temp < temps[1] && temp >= temps[2]) {
      $('.intro').css('background-image', imgs[2])
    } else if (temp < temps[2]) {
      $('.intro').css('background-image', imgs[3])
    }
  }
  // Calls the Weather API
  $.getJSON(url + 'imperial', getWeather, 'jsonp')
}      


// When the documet finished loading call the Location API
$(document).ready(function () {
  $.getJSON('http://ip-api.com/json', getLocation, 'jsonp')
  // Handler for opetion between Metric and Imperial style temperature
  $('input[type=radio][name=farenheit-celcius]').change(function () {
    if ($('#f').is(':checked')) {
      units = 'imperial'
    } else {
      units = 'metric'
    }
    $.getJSON(url + units, getWeather, 'jsonp')
  })
})
