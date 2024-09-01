// server.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Error Handling Middleware
function errorHandler(err, req, res, next) {
    res.status(err.status || 400).json({
        error: {
            message: err.message || 'An unknown error occurred.',
        },
    });
}

// Use the error handling middleware
app.use(errorHandler);