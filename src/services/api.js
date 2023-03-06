import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export async function logout() {
  try {
    await api.post('/oauth/logout');
    return true;
  } catch (error) {
    return false;
  }
}
