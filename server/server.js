require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;

/**
 * @file server.js
 * Establish a connection to MongoDB Atlas and start the Express server.
 * If the connection is successful, the server will listen on the specified port.
 * If the connection fails, an error will be logged.
 */

mongoose.connect(process.env.MONGO_URI, {})
    .then(() => {
        console.log('Connected to MongoDB Atlas');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`); // Start the server only after successful DB connection
        });
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
