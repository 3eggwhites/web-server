const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (evt) => {
    messageOne.textContent = '';
    messageTwo.textContent = '';
    messageOne.textContent = 'Loading...';
    const location = search.value;
    const queryUrl = '/weather?address='+location;
    fetch(queryUrl).then((response) => {
    response.json().then(({error, forecast, location}) => {
        if (error) {
            return messageOne.textContent = error;
        }
        messageOne.textContent = forecast;
        messageTwo.textContent = location;
    });
});
    evt.preventDefault();
});
// test heroku github pipeline