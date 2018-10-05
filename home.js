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
    var accountFound;
    $.ajax({
      url: myurl1,
      dataType: "json",
      success: function(parsed_json) {
        console.log(parsed_json);
        userId = parsed_json['response']['steamid'];
        console.log("User ID: " + userId);
        accountFound = parsed_json['response']['success'];
        console.log(accountFound);
        if (accountFound != 1) {
          $("#returnData").html("<p>Steam account not found. Please try again.</p>");
        };

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
            //TODO Do some stuff with returned data
          }
        });
      }
    })


  });
});
