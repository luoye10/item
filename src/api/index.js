import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

let baseRequest = (url, method, params) => {
    let obj = {
        url,
        method
    };
    if (method === 'get') {
        obj.params = params;
    }
    if (method === 'post') {
        obj.data = params;
    }
    return axios(obj);
};
export let search = word => {
    return baseRequest('search', 'get', {
        keywords: word
    });
};
