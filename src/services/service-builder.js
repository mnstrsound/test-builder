import axios from 'axios';

import { getAuthHeader } from '../utils/get-auth-header';

const serviceBuilder = route => ({
    findAll: async () => await axios.get(`/${route}`, { headers: await getAuthHeader() }),
    findOne: async id => await axios.get(`/${route}/${id}`, { headers: await getAuthHeader() }),
    create: async data => await axios.post(`/${route}`, data, { headers: await getAuthHeader() }),
    update: async (id, data) => await axios.put(`/${route}/${id}`, data, { headers: await getAuthHeader() }),
    delete: async id => await axios.delete(`/${route}/${id}`, { headers: await getAuthHeader() })
});

export { serviceBuilder };

