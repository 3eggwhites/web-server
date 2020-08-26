const express = require('express');

const app = express();

app.get('', (req,res) => {
    res.send('Hello express!');
});

app.get('/help', (req,res) => {
    res.send('Help Page');
})

app.get('/about', (req,res) => {
    res.send('About Page');
});

app.get('/weather', (req,res) => {
    res.send("Today's forecast");
});

app.listen(4200, () => {
    console.log('server is running');
});