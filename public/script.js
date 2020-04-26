//this file is for interacting with the index.html file

const fetchButton = document.getElementById('fetch-button');
const outputContainer = document.getElementById('output-container');


const reset = () => {
  outputContainer.innerHTML = '';
}

const renderError = response => {
  outputContainer.innerHTML = `<p>Your request returned an error from the server: </p>
  <p>Code: ${response.status}</p>
  <p>${response.statusText}</p>`;
}

const renderResponse = () => {
  reset();
  outputContainer.innerHTML = '<p>You clicked the input button.</p>';
}

fetchButton.addEventListener('click', () => {
  const input = document.getElementById('input').value;
  fetch(`/api?input=${input}`)
   .then(response => {
     if (!response.ok) {
       renderError(response);
     }
   })
   .then(response => {
     renderResponse();
   });
});
