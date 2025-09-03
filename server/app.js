const express = require('express');
const cors = require('cors');

const costRoutes = require('./routes/costRoute');
const userRoutes = require('./routes/userRoute');
const aboutRoute = require('./routes/aboutRoute');
const reportRouter = require('./routes/reportRoute');


const app = express();

/**
 * @file app.js
 * @description  Main Express app file.
 *               Adds basic settings and connects all API routes.
 *               Also includes a test route to see if the server works.
 * @routes
 *  GET /                 - Returns a simple server status message
 *  POST /api/add         - Adds a new cost item
 *  GET /api/users/:id    - Gets user info by ID
 *  GET /api/about        - Returns developers names
 *  GET /api/report       - Returns monthly cost report
 */

app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const message = await Promise.resolve('Server is up and running!');
    res.send(message);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

// Set up API routes under the '/api' prefix
app.use('/api', costRoutes);
app.use('/api', userRoutes);
app.use('/api', aboutRoute);
app.use('/api', reportRouter);

module.exports = app;
