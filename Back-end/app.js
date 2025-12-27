const express= require('express');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Sample route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server
const PORT = process.env.PORT || 3021;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;   