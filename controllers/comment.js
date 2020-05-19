var db = require("../models");

module.exports = {
  // Find one comment
  find: function(req, res) {
    db.comment.find({ _headlineId: req.params.id }).then(function(dbcomment) {
      res.json(dbcomment);
    });
  },
  // Create a new comment
  create: function(req, res) {
    db.comment.create(req.body).then(function(dbcomment) {
      res.json(dbcomment);
    });
  },
  // Delete a comment with a given id
  delete: function(req, res) {
    db.comment.remove({ _id: req.params.id }).then(function(dbcomment) {
      res.json(dbcomment);
    });
  }
};
