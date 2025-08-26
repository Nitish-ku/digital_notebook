require('dotenv').config();
const express = require('express');
const { connectDB, getDB } = require('./db');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use('/api/notes', (req, res, next) => {
      req.db = getDB();
      next();
    }, noteRoutes);

    app.get('/', (req, res) => {
      res.send('API is running...');
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
