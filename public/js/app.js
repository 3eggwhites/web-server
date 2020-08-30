fetch('http://localhost:4200/weather?address=!').then((response) => {
    response.json().then(({error, forecast, location}) => {
        if (error) {
            return console.log(error);
        }
        console.log(forecast);
        console.log(location);
    });
});

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    const location = search.value;
    const queryUrl = 'http://localhost:4200/weather?address='+location;
    fetch(queryUrl).then((response) => {
    response.json().then(({error, forecast, location}) => {
        if (error) {
            return console.log(error);
        }
        console.log(forecast);
        console.log(location);
    });
});
    e.preventDefault();
});