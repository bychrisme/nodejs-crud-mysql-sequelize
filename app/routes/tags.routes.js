import express from 'express';
import tags from '../controllers/tag.controller';

const router = express.Router();

// Create a new Tag
router.post("/", tags.create);
  
// Retrieve all Tags
router.get("/", tags.findAll);

// Retrieve a single Tag with id
router.get("/:id", tags.findOne);

// Add Tutorial on a Tag
router.post("/tutorial", tags.addTutorial);

// Update a Tag with id
router.put("/:id", tags.update);

// Delete a Tag with id
router.delete("/:id", tags.delete);

// Delete all Tags
router.delete("/", tags.deleteAll);

module.exports = router