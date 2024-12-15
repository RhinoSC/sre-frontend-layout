import { Configschema } from '@sre-frontend-layout/types/schemas';
import { get } from '../nodecg';
import axios from 'axios';
import { apiToken } from '../replicants';
import { loginResponse } from '@sre-frontend-layout/types/Api';

const nodecg = get();
const config = nodecg.bundleConfig as Configschema;

export const api = axios.create({
  baseURL: config.API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = apiToken.value
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {

    if (error.response?.status === 401) {
      // Token ha expirado o no es válido
      const response = await login(config.API_USERNAME, config.API_PASSWORD)
      apiToken.value = response.data.token
    }

    return Promise.reject(error);
  }
);

export const login = async (username: string, password: string) => {
  const response = await api.post('/admins/login', { username, password }, {
    headers: {
      "Content-Type": "application/json"
    }
  });

  const data: loginResponse = response.data
  apiToken.value = data.data.token
  setAuthToken(data.data.token)
  return data;
};

// Función para actualizar el token en el encabezado
export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers['Authorization'] = `Bearer ${token}`;
    nodecg.log.info('[Axios] set api authorization header')
  } else {
    delete api.defaults.headers['Authorization'];
  }
  // console.log(apiClient.defaults.headers['Authorization'])
};