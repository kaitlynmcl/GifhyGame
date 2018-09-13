$(document).ready(function() {

var topics = ["GERARD WAY", "ROBERT SMITH",  "SKRILLEX", "BRIGHT EYES", "SUFJAN STEVENS", "MORRISEY", "LEONARD COHEN"]; 
for (var i = 0; i <topics.length; i++) {
    var artistAdd = $("<button>");
    artistAdd.addClass("artist");
    artistAdd.attr("data-name", topics[i]);
    artistAdd.text(topics[i]);
    $("#topics").append(artistAdd);
}   

$("button").on("click", function() {
    var artist = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artist + "&api_key=XDPcOeI4M9yKEpttK33FxsuypoDjJGKt&limit=10"; 

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class='item'>");

          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);

          var artistImage = $("<img>");
          artistImage.attr("src", results[i].images.fixed_height.url);
          gifDiv.prepend(p);
          gifDiv.prepend(artistImage);

          $("#gifs-station").prepend(gifDiv);
        }
  
     })

    });
   
  });