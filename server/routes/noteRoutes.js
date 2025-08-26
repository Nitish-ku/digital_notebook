const express = require('express');
const router = express.Router();
const Notebook = require('../models/Notebook');
const Chapter = require('../models/Chapter');
const Page = require('../models/Page');

// --- Notebook Routes ---

// Get all notebooks
router.get('/notebooks', async (req, res) => {
  try {
    const notebooks = await Notebook.find().populate('chapters');
    res.json(notebooks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new notebook
router.post('/notebooks', async (req, res) => {
  const { name } = req.body;
  const notebook = new Notebook({ name });
  try {
    const newNotebook = await notebook.save();
    res.status(201).json(newNotebook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- Chapter Routes ---

// Get all chapters for a notebook
router.get('/notebooks/:notebookId/chapters', async (req, res) => {
  try {
    const chapters = await Chapter.find({ notebook: req.params.notebookId }).populate('pages');
    res.json(chapters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new chapter
router.post('/notebooks/:notebookId/chapters', async (req, res) => {
  const { name } = req.body;
  const chapter = new Chapter({ name, notebook: req.params.notebookId });
  try {
    const newChapter = await chapter.save();
    await Notebook.findByIdAndUpdate(req.params.notebookId, { $push: { chapters: newChapter._id } });
    res.status(201).json(newChapter);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// --- Page Routes ---

// Get all pages for a chapter
router.get('/chapters/:chapterId/pages', async (req, res) => {
  try {
    const pages = await Page.find({ chapter: req.params.chapterId });
    res.json(pages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new page
router.post('/chapters/:chapterId/pages', async (req, res) => {
  const { title, content } = req.body;
  const page = new Page({ title, content, chapter: req.params.chapterId });
  try {
    const newPage = await page.save();
    await Chapter.findByIdAndUpdate(req.params.chapterId, { $push: { pages: newPage._id } });
    res.status(201).json(newPage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get a single page
router.get('/pages/:id', async (req, res) => {
  try {
    const page = await Page.findById(req.params.id);
    if (!page) return res.status(404).json({ message: 'Page not found' });
    res.json(page);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Update a page
router.put('/pages/:id', async (req, res) => {
  const { title, content } = req.body;
  try {
    const updatedPage = await Page.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!updatedPage) return res.status(404).json({ message: 'Page not found' });
    res.json(updatedPage);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
