import axios from 'axios';
import type { Note, FetchNotesParams, FetchNotesResponse, CreateNoteDto } from '../lib/types';

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api',
});

api.interceptors.request.use((config) => {
  const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export async function fetchNotes(params: FetchNotesParams): Promise<FetchNotesResponse> {
  const res = await api.get('/notes', { params });
  return res.data;
}

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const res = await api.post('/notes', note);
  return res.data;
};

export async function deleteNote(id: string): Promise<void> {
  const res = await api.delete(`/notes/${id}`);
  return res.data;
}

export async function fetchNoteById(id: string) {
  const res = await api.get(`/notes/${id}`);
  return res.data;
}
