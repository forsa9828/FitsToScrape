var mongoose = require("mongoose");
var Schema = mongoose.schema;



var ArticleSchema = new Schema({
//headline
  title: {

    type: String,
    required: true
  },
  
//summary
  summary: {
	type: String,
	default: "Summary unavailable."
 },
  
//url
  link: {
    type: String,
    required: true
 },

  // Populate the Article
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }

});


// Creating model from schema, using mongoose's model method

var Article = mongoose.model("Article", ArticleSchema);


// Export the Article model

module.exports = Article;
