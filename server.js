const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON body
app.use(express.json());

// Middleware to parse URL encoded body
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static('public'));

// Routes for APIs
app.use('/api', apiRoutes);

// Routes for HTML pages
app.use('/', htmlRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
