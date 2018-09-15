$(document).ready(function() {

                                                        //ARRAY TO STORE GIFPHY IMAGES 
var topics = ["GERARD WAY", "ROBERT SMITH",  "SKRILLEX", "BRIGHT EYES", "SUFJAN STEVENS", "MORRISEY", "LEONARD COHEN"]; 
                           
                                                        //FUNCTION THAT RE-RENDERS HTML TO DISPLAY 
function displayGifphys() {
    var artist = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + artist + "&api_key=XDPcOeI4M9yKEpttK33FxsuypoDjJGKt&limit=10"; 

$.ajax({                                                //CREATING AJAX CALL FOR SPECIIFC SADBOY BUTTON
    url: queryURL,
    method: "GET"
    }).done(function(response) {
    $("#gifs-station").empty();                         //CLEARS OUT IMAGES

    var results = response.data;                        //RETRIEVING GIPHY DATA
    console.log(response);

    for(var i = 0; i < results.length; i++) {           //LOOPS THROUGH RESULTS

    var gifDiv = $("<div>");                            //CREATING A DIV TO HOLD THE GIPHYS 
    gifDiv.addClass("sadboyPics");                      //ADDS CLASS FOR STYLE (CSS)
    var rating = results[i].rating;                     //STORING THE RATING DATA
    var p = $("<p>").text("Rating: " + rating);         //DISPLAYS RATING DATA 

    var artistImage = $("<img>");                       //ADDING ATTRIBUTES TO ALLOW FOR STILL/MOVING IMAGES
    artistImage.attr("src", results[i].images.fixed_height_still.url);
    artistImage.attr("data-state", "still");
    artistImage.attr("data-still", results[i].images.fixed_height_still.url);
    artistImage.attr("data-animate", results[i].images.fixed_height.url);
    artistImage.addClass("artistImage");
    gifDiv.prepend(p);                                  //DISPLAYS RATING
    gifDiv.prepend(artistImage);                        //DISPLAYS SADBOY IMAGES
    $("#gifs-station").prepend(gifDiv);
}
    $(".artistImage").on("click", function() {
        var state = $(this).attr("data-state");
        console.log(state);
    
    if (state === "still") {                            //ALLOWS FOR STILLNESS/CHANGES
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        }
    });
});

}

function renderButtons() {                              //FUNCTION TO DISPLAY BUTTONS 

    $("#sadBoyButtons").empty();

    for (var i = 0; i <topics.length; i++) {
    var artistAdd = $("<button>");
    artistAdd.addClass("artist");
    artistAdd.attr("data-name", topics[i]);
    artistAdd.text(topics[i]);
    $("#sadBoyButtons").append(artistAdd);
    }   
}
$("#addSadBoy").on("click", function(event){            //ALLOWS TO UPDATE FORM WITH NEW SADBOY
    event.preventDefault();

                                                        //GRABS INPUT FROM TEXTBOX 
    var sadBoySelect = $("#musician-input").val().trim();

                                                        //SADBOY/TOPIC FROM TEXTBOX IS ADDED TO ARRAY
    topics.push(sadBoySelect);

    renderButtons();                                    //CALLING RENDERBUTTONS TO HANDLE PROCESSING OF TOPICS ARRAY
  });

 
  $(document).on("click", ".artist", displayGifphys);   //SELECTS ARTIST CLASS TO GENERATE BUTTONS

                                                        //CALLING RENDER BUTTONS FUNCTION 
  renderButtons();
});
