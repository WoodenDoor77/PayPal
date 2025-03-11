const express = require('express');
const path = require('path');
const fs = require('fs'); // Import the fs module to write files
const app = express();
const port = 3000;

// Middleware to parse JSON data from the body of POST requests
app.use(express.json());

// Serve the main.html file when accessing the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

// Handle the file creation request
app.post('/create-file', (req, res) => {
    const { username, password } = req.body;

    // Content to be written into the file
    const content = `Username: ${username}\nPassword: ${password}`;

    try {
        fs.writeFileSync('exampleSync.txt', content); // Create and write to the file
        res.json({ message: 'File created successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Error creating the file', error: err });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

