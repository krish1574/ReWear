const app = require('./src/app');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: 'http://localhost:5173', // React dev server
  credentials: true
}));

// Your other middlewares like:
app.use(express.json());

// Example route
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' });
});

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

const connectDB = require('./src/config/db');
connectDB();