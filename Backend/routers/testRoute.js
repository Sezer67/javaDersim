const express = require("express");
const testController = require("../controllers/testController");

const router = express.Router();

router
  .route("/")
  .post(testController.createTest)
  .get(testController.getAllTests);
router.route('/:id').get(testController.getTestById);
router.route('/next/:no').get(testController.nextTestByNo);
module.exports = router;