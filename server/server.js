require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const noteRoutes = require('./routes/noteRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware
app.use(cors({
  origin: 'https://digital-notebook-59e2.onrender.com',
  credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api', noteRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
