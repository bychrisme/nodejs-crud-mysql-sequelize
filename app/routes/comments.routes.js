import express from 'express';
import comments from '../controllers/comment.controller';

const router = express.Router();

// Create a new Comment
router.post("/", comments.create);
  
// Retrieve all Comments
router.get("/", comments.findAll);

// Retrieve a single Comment with id
router.get("/:id", comments.findOne);

// Update a Comment with id
router.put("/:id", comments.update);

// Delete a Comment with id
router.delete("/:id", comments.delete);

// Delete all Comments
router.delete("/", comments.deleteAll);

module.exports = router