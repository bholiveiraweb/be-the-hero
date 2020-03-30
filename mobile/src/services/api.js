import axios from 'axios';

const apiUrl = 'https://be-the-hero-omnistack11.herokuapp.com';
// const apiUrl = 'http://192.168.15.12:3333';

const api = axios.create({
    baseURL: (apiUrl)
});

export default api;