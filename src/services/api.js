import axios from 'axios';

export const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
export const hasConfiguredApi = Boolean(apiBaseUrl) && !apiBaseUrl.includes('your-laravel-api.com');

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    Accept: 'application/json',
  },
});

export default api;
