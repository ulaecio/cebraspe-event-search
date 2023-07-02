import axios from 'axios';

const API_URL = axios.post('https://extranet.cebraspe.org.br/AvaliacaoCSA/BackEnd', { /* Your request payload goes here */ })
  .then(response => {
    // Handle the response data
    console.log(response.data);
  })
  .catch(error => {
    // Handle any errors
    console.error(error);
  });