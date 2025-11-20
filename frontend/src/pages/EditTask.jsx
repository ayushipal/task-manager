import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import TaskForm from '../components/TaskForm'
import { fetchTask, updateTask } from '../services/taskService'

export default function EditTask() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [task, setTask] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const res = await fetchTask(id)
        setTask(res.data)
      } catch (err) {
        setError('Failed to load task')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleUpdate = async (payload) => {
    try {
      await updateTask(id, payload)
      navigate('/')
    } catch (err) {
      setError(err?.response?.data?.message || 'Failed to update')
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <div className="error">{error}</div>
  if (!task) return null

  return (
    <div className="container">
      <h2>Edit Task</h2>
      <TaskForm initial={task} onSubmit={handleUpdate} submitLabel="Update Task" />
    </div>
  )
}