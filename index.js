const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
async function connect() {
  try {
    await mongoose.connect('mongodb+srv://admin:admin@cluster0.vkoabpr.mongodb.net/fiton?retryWrites=true&w=majority&appName=Cluster0')
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

connect();
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Use routes
app.use('/api', routes);

// Start the server
const port = process.env.PORT || 5000;
app.listen(3000, () => {
  console.log(`Server running on port ${port}`);
});
