$("#submitButton").click(function(e){
  var value = $("#cityText").val();
  console.log(value);
  e.preventDefault();
  $("#selectedCity").text(value);
  //insert API call here:
  var myurl = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=A908D64B6C335B82CFF622D642C7814F&steamid=76561197960434622&format=json';
  myurl += value;
  console.log(myurl);
  $.ajax({
    url : myurl,
    dataType : "json",
        success : function(parsed_json) {
            var location = parsed_json['name'];
            var weather = parsed_json['weather'][0]['main'];
            var temp = parsed_json['main']['temp'];
            var weather_icon = parsed_json['weather'][0]['icon'];
            var humidity = parsed_json['main']['humidity'];
            var temp_min = parsed_json['main']['temp_min'];
            var temp_max = parsed_json['main']['temp_max'];
            var wind_speed = parsed_json['wind']['speed'];
            everything = "<img src=\"http://openweathermap.org/img/w/" + weather_icon + ".png\"/>"
            everything += "<ul>";
            everything += "<li>Location: " + location;
            everything += "<li>Weather: " + weather + " (" + temp + "&#8457;)";
            everything += "<li>Low: " + temp_min + "&#8457; | High: " + temp_max + "&#8457;";
            everything += "<li>Humidity: " + humidity + "%";
            everything += "<li>Wind: " + wind_speed + " mph";
            everything += "</ul>";
            $("#weather").html(everything);
            console.log("name="+location);
            console.log("temp="+temp);
        }
  });
});
