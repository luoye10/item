import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

let baseRequest = (url, method, params) => {
    const obj = {
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
export const search = word => {
    return baseRequest('/search', 'get', {
        keywords: word
    });
};
export const getSongUrl = id => {
    return baseRequest('/song/url', 'get', {
        id
    });
};
export const getLyric = id => {
    return baseRequest('/lyric', 'get', {
        id
    });
};
