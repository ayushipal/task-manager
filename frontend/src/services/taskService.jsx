import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'https://task-manager-yct0.onrender.com/api'

const client = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

export const fetchTasks = () => client.get('/tasks')
export const fetchTask = (id) => client.get(`/tasks/${id}`)
export const createTask = (data) => client.post('/tasks', data)
export const updateTask = (id, data) => client.put(`/tasks/${id}`, data)
export const deleteTask = (id) => client.delete(`/tasks/${id}`)