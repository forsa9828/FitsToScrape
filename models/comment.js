var mongoose = require("mongoose");
var Schema = mongoose.Schema;


//Creating a new Schema for comment
var CommentSchema = new Schema({


  title: {
      type: String,
      },

  body: {
      type: String,
      }

});


//Creating a model for Comment Schema
var Comment = mongoose.model("Comment", CommentSchema);



// Export model
module.exports = Comment;
