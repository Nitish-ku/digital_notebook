const mongoose = require('mongoose');

const notebookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  chapters: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Notebook', notebookSchema);
