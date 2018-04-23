$(function() {

  var x = document.getElementById("city");
  var lat;
  var lon;
  var text="";
  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
      } else {
          x.innerHTML = "Geolocation is not supported by this browser.";
      }
  }
  function showPosition(position) {
      lon = parseFloat(position.coords.longitude);
      lat = parseFloat(position.coords.latitude);
      console.log(lon);
      console.log(lat);
      text+="lon="+lon+"&lat="+lat;
      console.log(text);
      getWeather();
  }

  function showError(error) {
      switch(error.code) {
          case error.PERMISSION_DENIED:
              x.innerHTML = "User denied the request for Geolocation."
              break;
          case error.POSITION_UNAVAILABLE:
              x.innerHTML = "Location information is unavailable."
              break;
          case error.TIMEOUT:
              x.innerHTML = "The request to get user location timed out."
              break;
          case error.UNKNOWN_ERROR:
              x.innerHTML = "An unknown error occurred."
              break;
      }
  }

  function getWeather(){
    $.ajax({
  				url: "https://fcc-weather-api.glitch.me/api/current?"+text,
  				type: "GET",
  				success: function (data){
  					//console.log(data);
            $('.city').html(data.name+", "+data.sys.country);
            $('.number').html(data.main.temp);
            $('.weatherdesc').html(data.weather[0].main);
            $('.icon').attr('src', data.weather[0].icon);
  				},
  				error: function (msg) { alert(msg); }
  	});
  }

  function changeNumber(){
    if($('a').html() == 'C'){
      $('.number').html(parseFloat($('.number').html())+273.15);
      $('a').html('K');
    }
    else if($('a').html() == 'K'){
      $('.number').html(parseFloat($('.number').html())-273.15);
      $('a').html('C');
    }
  }

  $('a').click(function(){
    changeNumber();
  });

  getLocation();

});
