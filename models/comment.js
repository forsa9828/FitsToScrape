// comment model
// ==========

// Require mongoose
var mongoose = require("mongoose");
// Create the schema class using mongoose's schema method
var Schema = mongoose.Schema;

// Create the commentSchema with the schema object
var CommentSchema = new Schema({
  // The headline is the article associate with the comment
  _headlineId: {
    type: Schema.Types.ObjectId,
    ref: "Headline"
  },
  // date is just a string
  date: {
    type: Date,
    default: Date.now
  },
  // as is the commentText
  CommentText: String
});

// Create the comment model using the commentSchema
var Comment = mongoose.model("Comment", CommentSchema);

// Export the comment model
module.exports = Comment;


