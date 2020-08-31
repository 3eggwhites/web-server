const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weatherforecast = require('./utils/weatherforecast'); 

const app = express();
const port = process.env.PORT || 4200; // for heroku to provide port dynamically for local

//public folder contents are for serving static contents
app.use(express.static(path.join(__dirname, '../public')));

// view folder content express look to find template files i.e. dynamic contents. to use view files we need to provide the below line
app.set('view engine', 'hbs');

// providing custom path to express for the templates
const viewPath = path.join(__dirname,'../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials'); // partials are files that are reusable
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

app.use((req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        if (req.headers.host === 'ayan-weather-web-application.herokuapp.com')
            return res.redirect(302, 'https://www.ayanpal.co.in');
        if (req.headers['x-forwarded-proto'] !== 'https')
            return res.redirect('https://' + req.headers.host + req.url);
        else
            return next();
    } else
        return next();
});


app.get('', (req,res) => {
    res.render('index', { // this argument i.e. 'index' should match the view file name that we want to serve.
        title: 'Weather',
        name: 'Ayan Pal'
    }); // to pass some values to the template file we pass object containing value.
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Ayan Pal'
    })
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'To search weather update for a location, enter location name or address in the serachbox and hit the search button',
        name: 'Ayan Pal'
    })
});

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a location'
        });
    }
    const address = req.query.address;
    forecast(address,res);
});

app.get('/.well-known/acme-challenge/xnBtIVivrNbOA3cWkiU32n5prbNfU1HV4pqh8ME4hyk', (req, res)=>{
    res.send('xnBtIVivrNbOA3cWkiU32n5prbNfU1HV4pqh8ME4hyk.H3wXVlXKrtvZNaiBj7LXFC1nRYcQ6QII0XUQ10RyHCQ');
});

app.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Ayan Pal'
    });
});

app.get('*', (req,res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Page Not Found',
        name: 'Ayan Pal'
    });
});

const forecast = (address, res) => {
    geocode.geoCode(address,(error,{lat, long, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        weatherforecast.forecast(lat,long, (error,currenWeatherData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            return res.send({
                forecast: currenWeatherData,
                location: location,
                address
            })
        })
    });
};

app.listen(port, () => {
    console.log('server is running on port '+port);
});