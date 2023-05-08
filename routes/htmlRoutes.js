const path = require('path');
const express = require('express');

const htmlRouter = express.Router();

// Serve the notes page
htmlRouter.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Serve the homepage for all other routes
htmlRouter.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = htmlRouter;
