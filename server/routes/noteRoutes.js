const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');

// Get all notes
router.get('/', async (req, res) => {
  try {
    const notes = await req.db.collection('notes').find().sort({ createdAt: -1 }).toArray();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single note
router.get('/:id', async (req, res) => {
  try {
    const note = await req.db.collection('notes').findOne({ _id: new ObjectId(req.params.id) });
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new note
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  const newNote = {
    title,
    content,
    createdAt: new Date(),
  };
  try {
    const result = await req.db.collection('notes').insertOne(newNote);
    res.status(201).json(result.ops[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a note
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  const updatedFields = {};
  if (title) updatedFields.title = title;
  if (content) updatedFields.content = content;

  try {
    const result = await req.db.collection('notes').updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: updatedFields }
    );
    if (result.matchedCount === 0) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note updated' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a note
router.delete('/:id', async (req, res) => {
  try {
    const result = await req.db.collection('notes').deleteOne({ _id: new ObjectId(req.params.id) });
    if (result.deletedCount === 0) return res.status(404).json({ message: 'Note not found' });
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;