const express = require("express");
const lessonController = require("../controllers/lessonController");

const router = express.Router();

router
  .route("/")
  .post(lessonController.createLesson)
  .get(lessonController.getAllLessons);
router
  .route("/:id")
  .get(lessonController.getLessonById)
  .put(lessonController.updateLessonById);

module.exports = router;
