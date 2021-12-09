console.log('Client side js file loaded');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');

msg1.textContent= '';
msg2.textContent='';
weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const location=search.value;
    msg1.textContent='Loading...';
    msg2.textContent='';
    fetch(`http://localhost:3000/weather?address=${location}`)
        .then(res => res.json())
        .then(result => {
            if (result.error) {
                msg1.textContent=result.error;
            }
            else {
                msg1.textContent=result.location;
                msg2.textContent=result.forecast;
            }
        }
        ); 
})
