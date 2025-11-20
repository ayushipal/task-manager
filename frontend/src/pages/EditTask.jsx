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
      <div style={{ display: 'flex', gap: '0rem', marginTop: '0rem'}}>
        <button
          type="button"
          onClick={() => navigate('/')}
          style={{
            padding: '0.3rem 0.6rem',
            fontSize: '0.9rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: '#2563eb',
            cursor: 'pointer',
            marginTop: '0'
          }}
        >
          &larr; Back
        </button>
      </div>
    </div>
  )
}