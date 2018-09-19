// GifTastic JS

var giphyMenu = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish"];
var giphyToggle =
    [{
        // id: 0,
        // still: true
    }];

// var giphyToggle = {
//     id: 0, 
//             {
//                 still: true
//             }
//         }

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

    var q = $(this).text();

    // var giphyToggle = Object.create(null);
    // giphyToggle.id = 0; // "name" is a property set on "me", but not on "person"
    // giphyToggle.toggle = false; // inherited properties can be overwritten
    // console.log(giphyToggle);

    $.ajax({
        url: "https://api.giphy.com/v1/gifs/search?q=" + q +
            "&api_key=FMbq2Vtj5T4zKhfSVr9wDCL3ttYknL1H&limit=10",
        method: "GET"
    }).then(function (res) {
        console.log(res);
        // console.log(res.data.length);    
        var giphyResponse = res.data;
        // console.log(giphyResponse);

        // Empty giphy DIV
        $("#giphyPics").empty();

        // For loop to go through response and output data / pics
        for (x = 0; x < giphyResponse.length; x++) {
            // console.log("for loop working");

            // Assign Still and Moving giphy URLs to variables
            var giphyPicURLStill = giphyResponse[x].images.fixed_width_still.url;
            var giphyPicUrlMove = giphyResponse[x].images.fixed_width.url;
            // console.log(giphyPicURLStill);
            // console.log(giphyPicUrlMove);

            //Create P tag for giphy rating
            var p = $("<p>");
            p.text("Rating: " + giphyResponse[x].rating);
            var b = $("<b>");
            // console.log(giphyResponse[x].rating);
            // console.log(p);
            // $("#giphyPics").append("<p>Rating:</p>");
            // var pRating = $("<p>");
            // pRating.text(giphyResponse[x].rating);
            // console.log(giphyResponse[x].rating);
            // console.log(pRating.text());
            // $("#giphyPics").append(pRating);
            // $("#giphyPics").append("<br>");

            //Create img tag for giphy URL
            var i = $("<img>");
            i.attr("src", giphyPicURLStill)
                .attr("class", "giphyImage")
                .attr("imageStill", giphyPicURLStill)
                .attr("imageMove", giphyPicUrlMove)
                .attr("imageId", giphyResponse[x].id);
            // $("#giphyPics").append(i);

            // Create object to capture toggle of giphy URl still vs. move
            giphyToggle.push({ id: giphyResponse[x].id, still: true });
            // giphyToggle.id[x] = ({ giphyResponse.id: giphyResponse[x].id, still: true });
            // giphyToggle

            // Create DIV
            var d = $("<div>");
            d.attr("class", "col-4");
            d.append(p);
            d.append(i);
            $("#giphyPics").append(d);

        }

        console.log(giphyToggle);

        // var toggle = 0;

        $(".giphyImage").on("click", function () {
           console.log("yo")
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
            // if (giphyToggle.imageId.still === true) {

            // }
            // if (giphyToggle[x].toggle.still === true) {
            //     $(this).attr("src", imageMove);
            //     giphyToggle.imageId.toggle.still = false;
            // } else {
            //     $(this).attr("src", imageStill);
            //     giphyToggle.imageId.toggle.still = true;
            // }
        });
    });
});

// const someArray = [
//     { id: 1, name: "susie"},
//     { id: 2, name: "mark"},
//     { id: 3, name: "wendy"},
//     { id: 4, name: "sal"},
//     { id: 5, name: "yo"},
//     { id: 6, name: "lo"},
//   ]

//   const getPropById = (id) => {
//     const [object = { id: id }] = someArray
//     return object
//   }

//   console.log(getPropById(1))