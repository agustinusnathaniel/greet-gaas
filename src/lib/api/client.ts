import ky from 'ky';

export const api = ky.create({
  retry: 0,
  timeout: 10000,
});

export default api;
