import axios from 'axios';

const serviceBuilder = route => ({
    findAll: async () => await axios.get(`/${route}`),
    findLike: async data => await axios.get(`/${route}/like${Object.keys(data).reduce((acc, key, index) => `${index === 0 ? '?' : '&'}${key}=${data[key]}`, '')}`),
    findOne: async id => await axios.get(`/${route}/${id}`),
    create: async data => await axios.post(`/${route}`, data),
    update: async (id, data) => await axios.put(`/${route}/${id}`, data),
    delete: async id => await axios.delete(`/${route}/${id}`)
});

export { serviceBuilder };

