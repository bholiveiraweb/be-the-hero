import axios from 'axios';

const api = axios.create({
    baseURL: (process.env.NODE_ENV == 'production' ? 'https://be-the-hero-omnistack11.herokuapp.com' : 'http://localhost:3333')
});

export default api;