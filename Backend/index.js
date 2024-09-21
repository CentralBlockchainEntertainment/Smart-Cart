require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Add this line
const authService = require('./services/authService');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Use CORS middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello from Dealio Shopping Assistant!');
});

app.post('/login', (req, res) => {
    const user = authService.login(req.body.username, req.body.password);
    res.json(user);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
