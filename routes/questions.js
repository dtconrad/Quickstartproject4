const express = require('express');
const router = express.Router();
const Question = require('../models/Question');

// Get Questions by Category
router.get('/:categoryId', async (req, res) => {
  try {
    const questions = await Question.find({ categoryId: req.params.categoryId }).populate('userId', 'username');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch questions' });
  }
});

// Create a Question
router.post('/', async (req, res) => {
  const { userId, categoryId, title, content } = req.body;
  try {
    const question = new Question({ userId, categoryId, title, content });
    await question.save();
    res.status(201).json({ message: 'Question created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create question' });
  }
});

module.exports = router;