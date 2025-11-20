import React, { useEffect, useState } from 'react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { fetchTasks, createTask, deleteTask, updateTask } from '../services/taskService'

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const res = await fetchTasks()
      setTasks(res.data)
    } catch (err) {
      console.error(err)
      setMessage('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const handleCreate = async (payload) => {
    setMessage('')
    try {
      await createTask(payload)
      setMessage('Task added successfully')
      load()
    } catch (err) {
      console.error(err)
      setMessage(err?.response?.data?.message || 'Failed to create task')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return
    try {
      await deleteTask(id)
      setMessage('Task deleted')
      load()
    } catch (err) {
      console.error(err)
      setMessage('Failed to delete task')
    }
  }

  const handleToggleStatus = async (id, data) => {
    try {
      await updateTask(id, data)
      load()
    } catch (err) {
      console.error(err)
      setMessage('Failed to update status')
    }
  }

  return (
    <div className="container">
      <h2>New Task</h2>
      <TaskForm onSubmit={handleCreate} submitLabel="Add Task" />

      <h2>All Tasks</h2>
      {message && <div className="success">{message}</div>}
      {loading ? <p>Loading tasks...</p> : <TaskList tasks={tasks} onDelete={handleDelete} onToggleStatus={handleToggleStatus} />}
    </div>
  )
}