const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const weatherRoutes = require('./routes/weather');
const favoritesRoutes = require('./routes/favorites');
const userRoutes = require('./routes/user');

app.use('/api/weather', weatherRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/user', userRoutes);

module.exports = app; 