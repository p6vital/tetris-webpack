const express = require('express');
const path = require('path');

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.use('/static', express.static(path.join(__dirname, 'static')));
app.use('/js', express.static(path.join(__dirname, 'dist', 'js')));

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
