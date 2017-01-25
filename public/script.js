/** FUNCTIONS START **/

//converts kelvin to celsius
function kelvinToCelsius(kelvin) {
  var celsius = kelvin - 273;
  celsius = celsius.toFixed(1);
  return celsius;
}

/**
function getWeather START
Get weather from openweathermap's API
(doesnt work when api is down, which is allot..)
Takes the API link as parameter
If the cities id match with Oslo, Roma or San Francisco, it appends
content to those cities
**/
function getWeather(apiLink) {
  $.getJSON(apiLink, function(result) {
    //Oslo's id = 3143244
    if(result.id === 3143244) {
      $('.cityoslo').append(result.name);
      $('.osloDesc').append(result.weather[0].main);
      var osloDegrees = kelvinToCelsius(result.main.temp);
      $('.osloDeg').append(osloDegrees);
    }
    //Roma's id = 3169070
    else if(result.id === 3169070) {
      $('.cityrome').append(result.name);
      $('.romeDesc').append(result.weather[0].main);
      var romaDegrees = kelvinToCelsius(result.main.temp);
      $('.romeDeg').append(romaDegrees);
    }
    //SF's id = 5391959
    else if(result.id === 5391959) {
      $('.citysf').append(result.name);
      $('.sfDesc').append(result.weather[0].main);
      var sfDegrees = kelvinToCelsius(result.main.temp);
      $('.sfDeg').append(sfDegrees);
    }
  });
}

/** FUNCTIONS END **/


/* SLIDESHOW START */
$(".slideshow > div:gt(0)").hide(); // Select all elements at an index greater than index within the matched set.

// goes through every image and changes image every 4 seconds
setInterval(function() {
  $('.slideshow > div:first')
    .fadeOut(1000)
    .next() // makes sure it goes to next picture
    .fadeIn(1000)
    .end()
    .appendTo('.slideshow');
},  4000);
/* SLIDESHOW END */


/* Call function getWeather START */

//Oslo
getWeather("http://api.openweathermap.org/data/2.5/weather?q=Oslo,NO&APPID=c90ad211e94c581eacdeef8e83f29bcb");
//Roma
getWeather("http://api.openweathermap.org/data/2.5/weather?q=Roma,IT&APPID=c90ad211e94c581eacdeef8e83f29bcb");
//San Francisco
getWeather("http://api.openweathermap.org/data/2.5/weather?q=San Francisco,US&APPID=c90ad211e94c581eacdeef8e83f29bcb");

/* function calls END */

/*
weather tomorrow START
Sweetalert is a simple way to make alert messages look good.
Onclick for the tomorrow button
*/
$( "a .tomorrow" ).click(function() {
  //Oslo
  $.getJSON('http://api.openweathermap.org/data/2.5/forecast/city?id=3143244&APPID=c90ad211e94c581eacdeef8e83f29bcb', function(result) {
    var tempTomorrow = kelvinToCelsius(result.list[1].main.temp);
    $('.osloTomorrow').append('<strong>'+tempTomorrow+'<span>&#8451</span></strong>');
  });

  //Roma
  $.getJSON('http://api.openweathermap.org/data/2.5/forecast/city?id=3169070&APPID=c90ad211e94c581eacdeef8e83f29bcb', function(result) {
    var romaTempTomorrow = kelvinToCelsius(result.list[1].main.temp);
    $('.romaTomorrow').append('<strong>'+romaTempTomorrow+'<span>&#8451</span></strong>');
  });

  //SF
  $.getJSON('http://api.openweathermap.org/data/2.5/forecast/city?id=5391959&APPID=c90ad211e94c581eacdeef8e83f29bcb', function(result) {
  var sfTempTomorrow = kelvinToCelsius(result.list[1].main.temp);
    $('.sfTomorrow').append('<strong>'+sfTempTomorrow+'<span>&#8451</span></strong>');
  });
  swal({
    title: "Weather for tomorrow",
    text: "Oslo: <span class='osloTomorrow'></span><br/>"+
    "Rome: <span class='romaTomorrow'></span><br/>" + "\n" +
    "San Francisco: <span class='sfTomorrow'></span><br/>",
    html: true
  });
});
/* sweetalert END */

/* forecast link api down allot */


/*
USE THIS ON THE SHOWING IF API IS DOWN
// Get weatherdata from JSON file
$.getJSON('weather.json', function (data) {
      $.each(data.Weatherfile, function(key, val) {
        //Oslo
        if(val.ID === 1) {
          $('.cityoslo').append(result.name);
          $('.osloDesc').append(val.Desc);
          $('.osloMsg').append(val.Msg);
          $('.osloDeg').append(val.Weather);
        }
        //Rome
        else if(val.ID === 2) {
          $('.cityrome').append(val.City);
          $('.romeDesc').append(val.Desc);
          $('.romeMsg').append(val.Msg);
          $('.romeDeg').append(val.Weather);
        }
        //SF
        else if(val.ID === 3) {
          $('.citysf').append(val.City);
          $('.sfDesc').append(val.Desc);
          $('.sfMsg').append(val.Msg);
          $('.sfDeg').append(val.Weather);
        }
  });
});
*/
