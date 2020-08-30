const path = require('path');
const express = require('express');
const http = require('http');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weatherforecast = require('./utils/weatherforecast');


const contextPath = '/weatherapp'
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

const router = express.Router();

router.get('', (req,res) => {
    res.render('index', { // this argument i.e. 'index' should match the view file name that we want to serve.
        title: 'Weather',
        name: 'Ayan Pal'
    }); // to pass some values to the template file we pass object containing value.
});

router.get('/about', (req,res) => {
    res.render('about', {
        title: 'About',
        name: 'Ayan Pal'
    })
});

router.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        helpMessage: 'To search weather update for a location, enter location name or address in the serachbox and hit the search button',
        name: 'Ayan Pal'
    })
});

router.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please provide a location'
        });
    }
    const address = req.query.address;
    forecast(address,res);
});

router.get('/help/*', (req,res) => {
    res.render('error', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Ayan Pal'
    });
});

router.get('*', (req,res) => {
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

app.use(contextPath,router);

const httpServer = http.createServer(app);
httpServer.listen(port, () => {
    console.log('server is running on port '+port);
});
// app.listen(port, () => {
//     console.log('server is running on port '+port);
// });