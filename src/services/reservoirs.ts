import axios from 'axios';
import { Reservoir } from '../types';

const API_URL = import.meta.env.VITE_API_URL;

export const getReservoirs = async (): Promise<Reservoir[]> => {
  const { data } = await axios.get(`${API_URL}/reservoirs/`);
  return data;
};

export const addReservoir = async (reservoir: Reservoir): Promise<Reservoir> => {
  const { data } = await axios.post(`${API_URL}/reservoirs/`, reservoir);
  return data;
};

export const updateReservoir = async (id: string, reservoir: Reservoir): Promise<Reservoir> => {
  const { data } = await axios.put(`${API_URL}/reservoirs/${id}`, reservoir);
  return data;
};

export const deleteReservoir = async (id: string): Promise<void> => {
  await axios.delete(`${API_URL}/reservoirs/${id}`);
};

export const toggleLockReservoir = async (id: string): Promise<Reservoir> => {
  const { data } = await axios.patch(`${API_URL}/reservoirs/${id}/toggle-lock`);
  return data;
};

export const getProducts = async (): Promise<{ id: number; name: string }[]> => {
  const { data } = await axios.get(`${API_URL}/products/`);
  return data;
};