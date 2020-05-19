var router = require("express").Router();
var noteController = require("../../controllers/note");

router.get("/:id", commentController.find);
router.post("/", commentController.create);
router.delete("/:id", commentController.delete);

module.exports = router;
