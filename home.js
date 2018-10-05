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
              var hoursAverage = ((minutesPlayed / 60) / 2);
              everything = "<p>";
              everything += "You have played an average of ";
              everything += hoursAverage;
              everything += " hours of video games per week during the last two weeks.";
              everything += "</p>";
              $("#returnData").html(everything);
              var analysis = "<p>";
              analysis += "Let's see how you stack up...";
              analysis += "</p>";
              if (hoursAverage < 5) {
                analysis += "<p id=\"status\">Status: HEALTHY</p>";
                analysis += "<img src=\"http://lerablog.org/wp-content/uploads/2014/03/guy-running.jpg\" alt=\"Healthy\" style=\"width:300px\">";
                analysis += "<p id= \"statusParagraph\">You're pretty moderate in your video game habits. Great job! Keep up the good work.</p>";
              } else if (hoursAverage < 10) {
                analysis += "<p id=\"status\">Status: AVERAGE</p>";
                analysis += "<img src=\"https://memegenerator.net/img/images/600x600/15251543/old-man-shrug.jpg\" alt=\"Average\" style=\"width:300px\">";
                analysis += "<p id= \"statusParagraph\">You're probably about average. Make sure that you are getting lots of physical activity.</p>";
              } else if (hoursAverage < 20) {
                analysis += "<p id=\"status\">Status: YOU PROBABLY PLAY TOO MUCH</p>";
                analysis += "<img src=\"http://www.fatlossmentality.com/wp-content/uploads/2013/01/iStock_000020595612XSmall.jpg\" alt=\"Too Much\" style=\"width:300px\">";
                analysis += "<p id= \"statusParagraph\">You're spending too much time playing video games each week. "
                analysis += "It would be a good idea to tone it down a bit. Go and do something outside instead of sitting down at the computer. Go on a hike. Ride your bike. Hang out with friends.</p>";
              } else {
                analysis += "<p id=\"status\">Status: LOSER</p>";
                analysis += "<img src=\"https://yt3.ggpht.com/-VdS7T35A-lA/AAAAAAAAAAI/AAAAAAAAAAA/Xl0Jv4nDXPo/s900-c-k-no/photo.jpg\" alt=\"Loser\" style=\"width:300px\">";
                analysis += "<p id= \"statusParagraph\">You are in dire need of restructing your life. In fact, you need to get a life. Take your computer, and throw it in the trash. Your body and mind will thank you.</p>";
              }
              $("#analysis").html(analysis);
            }
          });
        }
      }
    })


  });
});
