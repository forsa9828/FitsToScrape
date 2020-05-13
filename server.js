// Dependencies

var express = require("express");
var body = require("body-parser");
var mongoose = require("mongoose");
var logger = require("morgan");
//Scape Depend.
var cheerio = require("cheerio");
var axios = require("axios");
//Models
var db = require("./models");


var PORT = process.env.PORT || 3000;

//Initialize Express
var app = express();

// Connect to Mongoose
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);



// Middleware APP Setups

app.use(logger("dev"));
app.use(express.static("public"))
app.use(body.urlencoded({extended: true}));

})



// Routes


// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {

  // First, we grab the body of the html with axios
  axios.get("http://www.bioethics.net/news").then(function(response) {

    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);



    // Now, we grab every h2 within an article tag, and do the following:
    $("h5").each(function(i, element) {

      // Save an empty result object
      var result = {};



      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)

        .children("a")

        .text();

      result.link = $(this)

        .children("a")

        .attr("href");



      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)

        .then(function(dbArticle) {

          // View the added result in the console
          console.log(dbArticle);

        })

        .catch(function(err) {

          // If an error occurred, log i
          console.log(err);

        });

    });



    // Send a message to the client
    res.send("Scrape Complete!");

  });

});



// Route for getting all Articles from the db
app.get("/articles", function(req, res) {

    // Find all results from the scrapedData collection in the db
    db.Article.find()

      // Throw any errors to the console
      .then(function(dbPopulate) {

        // If any Libraries are found, send them to the client with any associated Books
        res.json(dbPopulate);

      })
      .catch(function(err) {

        // If an error occurs, send it back to the client
        res.json(err);

      });

});


// Route for grabbing a specific Article by id, populate it with it's note

app.get("/articles/:id", function(req, res) {

 
  db.Article.findById(req.params.id)

  .populate("note")

  .then(function(dbPopulate) {

    res.json(dbPopulate);

  })

  .catch(function(err) {

    // If an error occurs, send it back to the client

    res.json(err);

  });

});


// Route for saving/updating an Article's associated Note

app.post("/articles/:id", function(req, res) {


  // save the new note that gets posted to the Notes collection
  // then find an article from the req.params.id
  // and update it's "note" property with the _id of the new note

  db.Note.create(req.body)

    .then(function(dbPopulate) {

      

      return db.Article.findOneAndUpdate({_id: req.params.id}, { $push: { note: dbPopulate._id } }, { new: true });

    })

    .then(function(dbPopulate) {

      // If the Library was updated successfully, send it back to the client

      res.json(dbPopulate);

    })

    .catch(function(err) {

      // If an error occurs, send it back to the client

      res.json(err);

    });

});

/ Start the server

app.listen(PORT, function() {

  console.log("App running on port " + PORT + "!");

});
