$(document).ready(function() {

                                                //ARRAY TO STORE GIFPHY IMAGES 
var topics = ["GERARD WAY", "ROBERT SMITH",  "SKRILLEX", "BRIGHT EYES", "SUFJAN STEVENS", "MORRISEY", "LEONARD COHEN"]; 
for (var i = 0; i <topics.length; i++) {
    var artistAdd = $("<button>");
    artistAdd.addClass("artist");
    artistAdd.attr("data-name", topics[i]);
    artistAdd.text(topics[i]);
    $("#topics").append(artistAdd);
}   

                                                //ON CLICK TO PULL IMAGES FROM GIPHY EACH TIME USER CLICKS
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

          var artistImage = $("<img>");        //ADDING ATTRIBUTES TO ALLOW FOR STILL/MOVING IMAGES
          artistImage.attr("src", results[i].images.fixed_height_still.url);
          artistImage.attr("data-state", "still");
          artistImage.attr("data-still", results[i].images.fixed_height_still.url);
          artistImage.attr("data-animate", results[i].images.fixed_height.url);
          artistImage.addClass("artistImage");
          gifDiv.prepend(p);
          gifDiv.prepend(artistImage);

          $("#gifs-station").prepend(gifDiv);
        }
        $(".artistImage").on("click", function() {
            var state = $(this).attr("data-state");
            console.log(state);

            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          });
    
     })
    
    });
});