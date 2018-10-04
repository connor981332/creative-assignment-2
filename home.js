$(document).ready(function() {
  console.log("Page is loaded");
  $("#submitButton").click(function(e) {
    e.preventDefault();

    //Read from form
    console.log("Submit button clicked")
    var username = $("#steamaccountid").val();
    console.log(username);

    //1st API call
    var myurl1 = 'http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=A908D64B6C335B82CFF622D642C7814F&vanityurl=';
    myurl1 += username;
    console.log("First call:" + myurl1);
    var userId;
    $.ajax({
      url: myurl1,
      dataType: "json",
      success: function(parsed_json) {
        console.log(parsed_json);
        userId = parsed_json['response']['steamid'];
        console.log("User ID: " + userId);

        //2nd API call
        var myurl2 = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=A908D64B6C335B82CFF622D642C7814F&steamid=';
        myurl2 += userId;
        myurl2 += '&format=json'
        console.log("Second call: " + myurl2);
        $.ajax({
          url: myurl2,
          dataType: "json",
          success: function(parsed_json) {
            console.log(parsed_json);
            //TODO: Work with returned data here

            /*var location = parsed_json['name'];
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
            console.log("name=" + location);
            console.log("temp=" + temp);*/
          }
        });
      }
    })


  });
});
