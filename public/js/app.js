fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});

fetch('http://localhost:4200/weather?address=!').then((response) => {
    response.json().then(({error, forecast, location}) => {
        if (error) {
            return console.log(error);
        }
        console.log(forecast);
        console.log(location);
    });
});