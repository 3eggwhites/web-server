const httpClient = require('postman-request');

const currentWeather = (lattitude,longitude,callback) => {
    const weatherUrl = 'http://api.weatherstack.com/current?access_key=4452811edc6bdb2f04ac6734efba18bb&query=' +longitude+ ',' +lattitude;

    httpClient.get(weatherUrl, {json:true}, (error, {body} = {}) => { // passing {body} extracts body from the response object and added default value in case fo any failure
        if (error) {
            callback('Unable to connect to WeatherStack api',undefined);
        } else if (body.error) {
            callback('Please enter a proper location',undefined);
        } else {
            const currentWeatherData = body.current;
            callback(undefined,currentWeatherData.weather_descriptions[0] + '. Its is currently '+currentWeatherData.temperature+' degrees out. But feels like '+currentWeatherData.feelslike+' degrees.');
        }
    });
};

module.exports = {
    forecast: currentWeather
};