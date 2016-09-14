$('document').ready(function() { 

$('#bigPanel').hide();
$('#resultsPanel').hide();

function clearCurrent() {
  $('#currentTemp').empty();
  $('#highLow').empty();
  $('#description').empty();
  $('#windSpeed').empty();
  $('#windDeg').empty();
  $('#sun').empty();

}

function handleData(data) {
    var temp = data.query.results.channel.item.condition.temp;
    var low = data.query.results.channel.item.forecast[0].low;
    var high = data.query.results.channel.item.forecast[0].high;
    var description = data.query.results.channel.item.condition.text;
    var windSpeed = data.query.results.channel.wind.speed;
    var windDeg = data.query.results.channel.wind.direction;
    var sunRise = data.query.results.channel.astronomy.sunrise;
    var sunSet = data.query.results.channel.astronomy.sunset;

    $('#currentTemp').html('<div class="panel-footer">' + 'Current Temperature: ' + '<span style="color:#e74c3c">' + temp  + 'ºF' + '</span>' + '</div>');
    $('#highLow').html('<div class="panel-footer">' + ' Maximum Temperature: ' + '<span style="color:#c0392b">' + high + 'ºF </span>' + '<br>'  + 'Minimum Temperature: ' + '<span style="color:#4183D7">' + low + 'ºF' + '</span></div>');
    $('#description').html('<div class="panel-footer">' + 'Description: ' + '<span style="color:#8e44ad">' + description + '</span></div>'  );
    $('#windSpeed').html('<div class="panel-footer">' + 'Wind Speed: ' + '<span style="color:#1E824C">' + windSpeed + ' MPH' + '</span></div>' );
    $('#windDeg').html('<div class="panel-footer">' + 'Wind Degreee: ' + '<span style="color:#1E824C">' + windDeg  + ' º </span> </div>');
    $('#sun').html('<div class="panel-footer">' + 'Sun Rise: ' + '<span style="color:#c0392b">' + sunRise + '</span>' + ' Sun Set: ' + '<span style="color:#c0392b">' + sunSet + '</span>' + '</div>');
  };       

function handleDataForecast(data) {

  arrayToLoop = data.query.results.channel.item.forecast
  var arrayToLoop2 = arrayToLoop.slice(0,7);


// This one loops through the days
function dayLooper() {
  _.each(arrayToLoop2, function(value){

        $('#resultsList2').append('<div class="panel panel-primary" id="' + value.day + '" >' + '<div class="panel-body">' + value.day + '</div>'  + '</div>');

        _.each(value, function(value2, key){

          if (key == 'date') {
            $('#' + value.day).append('<div class="panel-footer">' + 'Date: ' + '       ' + '<span id="dateList">' + value2 + '</span>' + '</div>');
          }
          if (key == 'high') {
             $('#' + value.day).append('<div class="panel-footer">'+ 'High: ' + '       ' + '<span id="highList">' + value2 + '</span>' + '</div>');
          }
          if (key == 'low') {
            $('#' + value.day).append('<div class="panel-footer">'+ 'Low: ' + '       ' + '<span id="lowList">' + value2 + '</span>' + '</div>');
          }
          if (key == 'text') {
            $('#' + value.day).append('<div class="panel-footer">'+ 'Description: ' + '       ' + '<span id="descriptionList">' + value2 + '</span>' + '</div>');
          }
        })
  });
}
dayLooper();

};

function getData(userInputs1, userInputs2) {
  return $.ajax({
    method: 'GET',
    url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22' 
    + userInputs1 + '%2C%20' + userInputs2 + '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2dj0yJmk9enlRczFnb3hMb0NVJmQ9WVdrOVoycEhObmgxTm5VbWNHbzlNQS0tJnM9Y29uc3VtZXJzZWNyZXQmeD0yNA--'
  })
};


var currentWeather = null;
var fiveDayForecast = null;

//Current Weather button
$('#getWeather').click(function() {
  $('#dropDownDefault').html('Current Weather');
  currentWeather = true;
  fiveDayForecast = false;
  $('#siteDescription').hide();
})

//5 Day button
$('#fiveDayButton').click(function() {
  $('#dropDownDefault').html('7 Day Forcast');
  currentWeather = false;
  fiveDayForecast = true;
  $('#siteDescription').hide();
})

//Input box enter button
$(document).keypress(function(e) {
  //For currentWeather
  if (currentWeather == true) {
    if(e.which == 13) {

      $('#resultsList2').empty();
      $('#bigPanel').show();
      $('#resultsPanel').show();
      clearCurrent();
      var value = $('#inputBox').val();
      pickValue = value.split(',');
      var value1 = pickValue[0];
      var value2 = pickValue[1];
      getData(value1, value2).done(handleData);

      $('#resultsHeader').html('<p>' + 'HERE IS THE CURRENT WEATHER FOR ' + value1.toUpperCase() + ' ' + value2.toUpperCase() + '</p>');
    
      if (value.length > 0) {
      $('#inputBox').val('');
      }

    }
  }
  //For five day forecast
  if (fiveDayForecast == true) {
    if(e.which == 13) {

      $('#resultsList2').empty();
      $('#bigPanel').show();
      $('#resultsPanel').hide();
      clearCurrent();
      var value = $('#inputBox').val();
      pickValue = value.split(',');
      var value1 = pickValue[0];
      var value2 = pickValue[1];
      getData(value1, value2).done(handleDataForecast);

      $('#resultsHeader').html('<p>' + 'HERE IS THE 7 DAY FORECAST FOR ' + value1.toUpperCase() + ' ' + value2.toUpperCase() + '</p>');

      if (value.length > 0) {
        $('#inputBox').val('');
    }
    }
  }
});
//click Go button
$('#goButton').click(function() {
    //for current weather
    if(currentWeather == true) {

      $('#resultsList2').empty();
      $('#bigPanel').show();
      $('#resultsPanel').show();
      clearCurrent();
      var value = $('#inputBox').val();
      pickValue = value.split(',');
      var value1 = pickValue[0];
      var value2 = pickValue[1];
      getData(value1, value2).done(handleData);

    $('#resultsHeader').html('<p>' + 'HERE IS THE CURRENT WEATHER FOR ' + value1.toUpperCase() + ' ' + value2.toUpperCase() + '</p>');
  
    if (value.length > 0) {
      $('#inputBox').val('');
    }
  }
  //for five day forecast
  if(fiveDayForecast == true) {
    $('#resultsList2').empty();
    $('#bigPanel').show();
    $('#resultsPanel').hide();
    clearCurrent();
    var value = $('#inputBox').val();
    pickValue = value.split(',');
    var value1 = pickValue[0];
    var value2 = pickValue[1];
    getData(value1, value2).done(handleDataForecast);

    $('#resultsHeader').html('<p>' + 'HERE IS THE 7 DAY FORECAST FOR ' + value1.toUpperCase() + ' ' + value2.toUpperCase() + '</p>');
  
    if (value.length > 0) {
    $('#inputBox').val('');
    }
  }
});
})