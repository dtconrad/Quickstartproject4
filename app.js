require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');

const app = express();
app.use(express.json()); // Middleware to parse JSON

// Connect to Database
connectDB();

// Mount Routes
app.use('/api/auth', authRoutes); // Mount the auth routes at /api/auth

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));