const path = require('path');
const express = require('express');

const app = express();

app.use(express.static(path.join(__dirname, '../public'))); // this the root page now

app.get('/weather', (req,res) => {
    res.send("Today's forecast");
});

app.listen(4200, () => {
    console.log('server is running');
});