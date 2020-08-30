const httpClient = require('postman-request');

const geoCode = (address, callback) => {
    const geoLocationUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXlhbm1hcGJveDEiLCJhIjoiY2tlOHc1c2lsMDBoYTJzcDdubjMzZmV2eiJ9.ZFYvbLTL95rXMZ2p-CFcFQ&limit=1';
    httpClient.get(geoLocationUrl, {json:true}, (error, {body} = {}) => { // passing {body} extracts body from the response object and added default value in case fo any failure
        if (error) {
            callback('Unable to connect to Mapbox api',undefined);
        } else if (body.features.length === 0) {
            callback('Please provide a valid location', undefined);
        } else {
            const geolocationData = body;
            const data = {
                lat: geolocationData.features[0].center[0],
                long: geolocationData.features[0].center[1],
                location: geolocationData.features[0].place_name
            };
            callback(undefined,data);
        }
    });
};

module.exports = {
    geoCode: geoCode
}