import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

export default function TaskForm({ initial, onSubmit, submitLabel = 'Save' }) {
  const [task, setTask] = useState({ title: '', description: '', status: 'pending' })
  const [error, setError] = useState('')

  useEffect(() => {
    if (initial) setTask({ ...initial })
  }, [initial])

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!task.title || task.title.trim() === '') {
      setError('Title cannot be empty')
      return
    }
    onSubmit({
      title: task.title.trim(),
      description: task.description?.trim() || '',
      status: task.status
    })
  }

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      {error && <div className="error">{error}</div>}

      <input
        type="text"
        placeholder="Task Title"
        value={task.title}
        onChange={(e) => setTask({ ...task, title: e.target.value })}
      />

      <textarea
        placeholder="Description (optional)"
        value={task.description}
        onChange={(e) => setTask({ ...task, description: e.target.value })}
      />

      <select value={task.status} onChange={(e) => setTask({ ...task, status: e.target.value })}>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <div className="actions">
        <button type="submit">{submitLabel}</button>
      </div>
    </form>
  )
}

TaskForm.propTypes = {
  initial: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  submitLabel: PropTypes.string
}