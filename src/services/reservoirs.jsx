import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const getReservoirs = async () => {
  const { data } = await axios.get(`${API_URL}/reservoirs/`)
  return data
}

export const addReservoir = async (reservoir) => {
  const { data } = await axios.post(`${API_URL}/reservoirs/`, reservoir)
  return data
}

export const updateReservoir = async (id, reservoir) => {
  const { data } = await axios.put(`${API_URL}/reservoirs/${id}`, reservoir)
  return data
}

export const deleteReservoir = async (id) => {
  await axios.delete(`${API_URL}/reservoirs/${id}`)
}

export const toggleLockReservoir = async (id) => {
  const { data } = await axios.patch(`${API_URL}/reservoirs/${id}/toggle-lock`)
  return data
}