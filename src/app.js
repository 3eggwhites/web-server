const express = require('express');

const app = express();

app.get('', (req,res) => {
    res.send('<h1>Weather</h1>');
});

app.get('/help', (req,res) => {
    res.send([{
        name: 'Ayan'
    },
    {
        name: 'Ananya'
    }]);
})

app.get('/about', (req,res) => {
    res.send('<h1>About</h1>');
});

app.get('/weather', (req,res) => {
    res.send({
        location: 'Howrah',
        forecast: 'Rainy'
    });
});

app.listen(4200, () => {
    console.log('server is running');
});