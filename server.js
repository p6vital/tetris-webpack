const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use('/assets', express.static(path.join(__dirname, 'dist')));

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
