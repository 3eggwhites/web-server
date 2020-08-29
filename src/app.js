const path = require('path');
const express = require('express');
const { Server } = require('http');

const app = express();

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, '../public'))); // this the root page now //public folder contents are for serving static contents
// view folder content express look to find template files i.e. dynamic contents. to use view files we need to provide the below line

app.get('', (req,res) => {
    res.render('index', { // this argument i.e. 'index' should match the view file name that we want to serve.
        title: 'Weather',
        name: 'Ayan Pal'
    }); // to pass some values to the template file we pass object containing value.
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ayan Pal'
    })
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'Help yourself'
    })
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