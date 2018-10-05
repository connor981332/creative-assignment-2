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
    var usingNativeID = false;
    $.ajax({
      url: myurl1,
      dataType: "json",
      success: function(parsed_json) {
        console.log(parsed_json);
        userId = parsed_json['response']['steamid'];
        console.log("User ID: " + userId);
        accountFound = parsed_json['response']['success'];
        console.log("Account Found Status: " + accountFound);
        if ($("#nativeIDBox").val() == "on") {
          usingNativeID = true;
          userId = username;
          console.log("UserID has been changed to :" + userId);
        }
        console.log("UsingNativeID Value: " + usingNativeID);
        console.log($("#nativeIDBox").val())
        if (accountFound != 1 && usingNativeID == false) {
          $("#returnData").html("<p>Steam account not found. Please try again.</p>");
        } else {
          //2nd API call
          var myurl2 = 'http://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=A908D64B6C335B82CFF622D642C7814F&steamid=';
          myurl2 += userId;
          myurl2 += '&format=json'
          console.log("Second call: " + myurl2);
          var minutesPlayed = 0;
          var numGames;
          $.ajax({
            url: myurl2,
            dataType: "json",
            success: function(parsed_json) {
              console.log(parsed_json);
              numGames = parsed_json["response"]["total_count"];
              console.log("Games played in past two weeks: " + numGames);
              for (i = 0; i < numGames; i++) {
                minutesPlayed += parsed_json["response"]["games"][i]["playtime_2weeks"];
                console.log("Hours played so far: " + minutesPlayed);
              }
              console.log("Total play time: " + minutesPlayed);
              everything = "<p>";
              everything += "You have played an average of ";
              everything += ((minutesPlayed / 60) / 2);
              everything += " hours of video games per week during the last two weeks.";
              everything += "</p>";
              $("#returnData").html(everything);
            }
          });
        }
      }
    })


  });
});
