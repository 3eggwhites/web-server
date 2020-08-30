# Weather App (Web)
A small current weather forecast application built with [Node js](https://nodejs.org/en/) and [Express.js](https://expressjs.com/). <br />
This web app can search a location based on name and provide weather data for the location.
## Features of the App
- Search weather data by location
- Basic error handling like empty location and invalid location checks are in place
## Packages and APIs used
- [Express.js](https://expressjs.com/) for webserver to serve the pages and weather http endpoint
- [hbs](https://www.npmjs.com/package/hbs) templating engine for Express.js to serve dynamic content
- [postman-request](https://www.npmjs.com/package/postman-request) http client for calling 3<sup>rd</sup> party apis
- [path](https://nodejs.org/dist/latest-v12.x/docs/api/path.html) This Node core module is used for manipulating resource path and setting up Express to serve static and dynamic content.
- [Mapbox](https://www.mapbox.com/) Mapbox api used for geolocation purpose
- [weatherstack](https://weatherstack.com/) weatherstack api used for finding out weather based on lattitude and longitude of a location
## How to run app locally
- For this app to function you need to have `node` and `npm` installed on your machine and properly set up. I have used `node@12.18.3` and `npm@6.14.6`
- Clone the repository by performing `git clone`
- Open a terminal or command prompt and go inside the root directory of the application i.e the folder named as `web-server`
- Perform `npm install` to install all the required dependencies.
- Type `node src/app.js` to start the application up. The application listens to port `4200`.
#Credits
This Weather Application was built based on the Node.js course offered by Andrew Mead on Udemy
