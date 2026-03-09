const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Allow frontend to fetch from this backend
app.use(express.json());

// Path to our JSON database
const dataPath = path.join(__dirname, 'data.json');

// Route to get all F1 teams
app.get('/api/teams', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Failed to read database' });
        }
        res.json(JSON.parse(data));
    });
});

// Route to serve the frontend files (assuming they are in the same directory)
app.use(express.static(__dirname));

app.listen(PORT, () => {
    console.log(`F1 Backend Server is running on http://localhost:${PORT}`);
});
