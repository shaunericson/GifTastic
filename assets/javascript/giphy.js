// GifTastic JS

var giphyMenu = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish"];
var giphyToggle =
    [{
        
    }];

const user = {
    id: 101,
    email: 'jack@dev.com',
    personalInfo: {
        name: 'Jack',
        address: {
            line1: 'westwish st',
            line2: 'washmasher',
            city: 'wallas',
            state: 'WX'
        }
    }
}


function createMenu() {

    for (x = 0; x < giphyMenu.length; x++) {
        var b = $("<button>");
        b.attr("type", "button")
            .attr("class", "btn btn-info menu-item")
            .attr("data-type", giphyMenu[x]);
        b.text(giphyMenu[x]);
        $("#menu-bar").append(b);
    };
};

createMenu();

$("#submitAddAnimal").on("click", function () {

    event.preventDefault();

    var animal = $("#addAnimal").val().trim();
    giphyMenu.push(animal);
    $("#menu-bar").empty();
    createMenu();
    $("#addAnimal").val("");

});

$(document.body).on("click", ".menu-item", function () {

    // Set this to a variable
    var q = $(this).text();

    // Get API giphy images
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + q +
            "&api_key=FMbq2Vtj5T4zKhfSVr9wDCL3ttYknL1H&limit=10",
        method: "GET"
    }).then(function (res) {    
        var giphyResponse = res.data;

        // Empty giphy DIV
        $("#giphyPics").empty();

        // For loop to go through response and output data / pics
        for (x = 0; x < giphyResponse.length; x++) {

            // Assign Still and Moving giphy URLs to variables
            var giphyPicURLStill = giphyResponse[x].images.fixed_width_still.url;
            var giphyPicUrlMove = giphyResponse[x].images.fixed_width.url;

            //Create P tag for giphy rating
            var p = $("<p>");
            p.text("Rating: " + giphyResponse[x].rating);
            var b = $("<b>");

            //Create img tag for giphy URL
            var i = $("<img>");
            i.attr("src", giphyPicURLStill)
                .attr("class", "giphyImage")
                .attr("imageStill", giphyPicURLStill)
                .attr("imageMove", giphyPicUrlMove)
                .attr("imageId", giphyResponse[x].id);

            // Push object to capture toggle of giphy URl still vs. move
            giphyToggle.push({ id: giphyResponse[x].id, still: true });

            // Create DIV and append elements
            var d = $("<div>");
            d.attr("class", "col-lg-4");
            d.append(p);
            d.append(i);
            $("#giphyPics").append(d);

        }

        // Event handler for setting still vs. moving images
        
        $(".giphyImage").on("click", function () {

            var imageStill = $(this).attr("imageStill");
            var imageMove = $(this).attr("imageMove");
            var imageId = $(this).attr("imageId");

            for (x = 0; x < giphyToggle.length; x++) {
                console.log(giphyToggle[x])
                if (giphyToggle[x].id == imageId) {
                    console.log(typeof(giphyToggle[x].still));
                    if (giphyToggle[x].still === true) {
                        $(this).attr("src", imageMove);
                        giphyToggle[x].still = false;
                    } else {
                        $(this).attr("src", imageStill);
                        giphyToggle[x].still = true;
                    }
                }
            }
        });
    });
});