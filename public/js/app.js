const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
    messageOne.textContent = '';
    messageOne.textContent = 'Loading...';
    const location = search.value;
    const queryUrl = 'http://localhost:4200/weather?address='+location;
    fetch(queryUrl).then((response) => {
    response.json().then(({error, forecast, location}) => {
        messageTwo.textContent = ''
        if (error) {
            return messageOne.textContent = error;
        }
        messageOne.textContent = forecast;
        messageTwo.textContent = location;
    });
});
    e.preventDefault();
});