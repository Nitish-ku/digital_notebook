const express = require('express');
const router = express.Router();
const Notebook = require('../models/Notebook');
const Chapter = require('../models/Chapter');
const Page = require('../models/Page');
const { protect } = require('../middleware/authMiddleware');

// --- Notebook Routes ---

// Get all notebooks for the authenticated user
router.get('/notebooks', protect, async (req, res) => {
  try {
    const notebooks = await Notebook.find({ user: req.auth.userId }).populate('chapters');
    res.json(notebooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new notebook for the authenticated user
router.post('/notebooks', protect, async (req, res) => {
  const { name } = req.body;
  const notebook = new Notebook({ name, user: req.auth.userId });
  try {
    const newNotebook = await notebook.save();
    res.status(201).json(newNotebook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- Chapter Routes ---

// Get all chapters for a notebook and authenticated user
router.get('/notebooks/:notebookId/chapters', protect, async (req, res) => {
  try {
    const chapters = await Chapter.find({ notebook: req.params.notebookId, user: req.auth.userId }).populate('pages');
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new chapter for the authenticated user
router.post('/notebooks/:notebookId/chapters', protect, async (req, res) => {
  const { name } = req.body;
  const chapter = new Chapter({ name, notebook: req.params.notebookId, user: req.auth.userId });
  try {
    const newChapter = await chapter.save();
    await Notebook.findByIdAndUpdate(req.params.notebookId, { $push: { chapters: newChapter._id } });
    res.status(201).json(newChapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- Page Routes ---

// Get all pages for a chapter and authenticated user
router.get('/chapters/:chapterId/pages', protect, async (req, res) => {
  try {
    const pages = await Page.find({ chapter: req.params.chapterId, user: req.auth.userId });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new page for the authenticated user
router.post('/chapters/:chapterId/pages', protect, async (req, res) => {
  const { title, content } = req.body;
  const page = new Page({ title, content, chapter: req.params.chapterId, user: req.auth.userId });
  try {
    const newPage = await page.save();
    await Chapter.findByIdAndUpdate(req.params.chapterId, { $push: { pages: newPage._id } });
    res.status(201).json(newPage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single page for the authenticated user
router.get('/pages/:id', protect, async (req, res) => {
  try {
    const page = await Page.findOne({ _id: req.params.id, user: req.auth.userId });
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a page for the authenticated user
router.put('/pages/:id', protect, async (req, res) => {
  const { title, content } = req.body;
  try {
    const updatedPage = await Page.findOneAndUpdate(
      { _id: req.params.id, user: req.auth.userId },
      { title, content },
      { new: true }
    );
    if (!updatedPage) return res.status(404).json({ message: 'Page not found or not authorized' });
    res.json(updatedPage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a page for the authenticated user
router.delete('/pages/:id', protect, async (req, res) => {
  try {
    const result = await Page.deleteOne({ _id: req.params.id, user: req.auth.userId });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Page not found or not authorized' });
    res.json({ message: 'Page deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
