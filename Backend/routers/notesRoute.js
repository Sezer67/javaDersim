const express = require('express');
const notesController = require('../controllers/notesController');

const router = express.Router();

router.route('/').post(notesController.createNote);
router.route('/:userId').get(notesController.getAllNotes);
router.route('/no/:id').put(notesController.updateNoteById).delete(notesController.deleteNoteById);

module.exports = router;