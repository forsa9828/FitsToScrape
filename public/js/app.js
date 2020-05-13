// Grab the articles as a json

$.getJSON("/articles", function(data) {

  // For each one loop through

  for (var i = 0; i < data.length; i++) {

    // Display information on the page

    $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].link + "</p>");

  }

});





// Whenever someone clicks a p tag

$(document).on("click", "p", function() {

  // Empty the section

  $("#comment").empty();

  // Save the id from the p tag

  var thisId = $(this).attr("data-id");



  // AJAX CALL

  $.ajax({

    method: "GET",

    url: "/articles/" + thisId

  })

    .then(function(data) {

      console.log(data);

      // Title

      $("#comment").append("<h2>" + data.title + "</h2>");

      // enter a new title

      $("#comment").append("<input id='titleinput' name='title' >");

      // A textarea 

      $("#comment").append("<textarea id='bodyinput' name='body'></textarea>");

      // A button to submit  

      $("#comment").append("<button data-id='" + data._id + "' id='savenote'>Save Comment</button>");



      // If there's a note in the article

      if (data.comment) {

        // Place the title of the note in the title input

        $("#titleinput").val(data.comment.title);

        // Place the body of the note in the body textarea

        $("#bodyinput").val(data.comment.body);

      }

    });

});



// When you click the save button

$(document).on("click", "#savecomment", function() {

  // Grab the id associated with the article from the submit button

  var thisId = $(this).attr("data-id");



  // Run a POST request to change the note, using what's entered in the inputs

  $.ajax({

    method: "POST",

    url: "/articles/" + thisId,

    data: {

      // Value taken from title input

      title: $("#titleinput").val(),

      // Value taken from note textarea

      body: $("#bodyinput").val()

    }

  })

    // With that done

    .then(function(data) {

      // Log the response

      console.log(data);

      // Empty the notes section

      $("#comment").empty();

    });



  // Also, remove the values entered in the input and textarea for note entry

  $("#titleinput").val("");

  $("#bodyinput").val("");

});
