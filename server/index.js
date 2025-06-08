const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase').then(() => {
  console.log('Connected to MongoDB ✅');
}).catch(err => {
  console.error('MongoDB connection error ❌:', err);
});

app.get('/', (req, res) => {
  res.send('YO');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT} 🚀`);
});