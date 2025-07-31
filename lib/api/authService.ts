import axios from 'axios';

const BASE_URL = 'https://notehub-public.goit.study/api';
const TOKEN_KEY = 'accessToken';

export async function authenticate(email: string): Promise<string> {
  const res = await axios.post(`${BASE_URL}/auth`, { email });
  const token = res.data.token;
  localStorage.setItem(TOKEN_KEY, token);
  return token;
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}
