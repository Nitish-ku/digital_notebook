const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  pages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Page',
  }],
  notebook: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notebook',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Chapter', chapterSchema);
