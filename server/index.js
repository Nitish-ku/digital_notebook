const express = require('express');
const cors = require('cors');
const pool = require('./db');


const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Notebooks API

// Create a notebook
app.post('/notebooks', async (req, res) => {
  try {
    const { title } = req.body;
    const newNotebook = await pool.query(
      'INSERT INTO notebooks (title) VALUES($1) RETURNING *',
      [title]
    );
    res.json(newNotebook.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all notebooks
app.get('/notebooks', async (req, res) => {
  try {
    const allNotebooks = await pool.query('SELECT * FROM notebooks');
    res.json(allNotebooks.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a notebook
app.get('/notebooks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const notebook = await pool.query('SELECT * FROM notebooks WHERE id = $1', [
      id,
    ]);
    res.json(notebook.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a notebook
app.put('/notebooks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const updateNotebook = await pool.query(
      'UPDATE notebooks SET title = $1 WHERE id = $2',
      [title, id]
    );
    res.json('Notebook was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a notebook
app.delete('/notebooks/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteNotebook = await pool.query('DELETE FROM notebooks WHERE id = $1', [
      id,
    ]);
    res.json('Notebook was deleted!');
  } catch (err) {
    console.error(err.message);
  }
});

// Chapters API

// Create a chapter
app.post('/notebooks/:notebook_id/chapters', async (req, res) => {
  try {
    const { notebook_id } = req.params;
    const { title, content } = req.body;
    const newChapter = await pool.query(
      'INSERT INTO chapters (notebook_id, title, content) VALUES($1, $2, $3) RETURNING *',
      [notebook_id, title, content]
    );
    res.json(newChapter.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Get all chapters for a notebook
app.get('/notebooks/:notebook_id/chapters', async (req, res) => {
  try {
    const { notebook_id } = req.params;
    const allChapters = await pool.query(
      'SELECT * FROM chapters WHERE notebook_id = $1',
      [notebook_id]
    );
    res.json(allChapters.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// Get a chapter
app.get('/chapters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const chapter = await pool.query('SELECT * FROM chapters WHERE id = $1', [id]);
    res.json(chapter.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// Update a chapter
app.put('/chapters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const updateChapter = await pool.query(
      'UPDATE chapters SET title = $1, content = $2 WHERE id = $3',
      [title, content, id]
    );
    res.json('Chapter was updated!');
  } catch (err) {
    console.error(err.message);
  }
});

// Delete a chapter
app.delete('/chapters/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteChapter = await pool.query('DELETE FROM chapters WHERE id = $1', [
      id,
    ]);
    res.json('Chapter was deleted!');
  } catch (err) {
    console.error(err.message);
  }
});

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
