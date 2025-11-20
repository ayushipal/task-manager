import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export default function TaskItem({ task, onDelete, onToggleStatus }) {
  const [busy, setBusy] = useState(false)

  const toggle = async () => {
    if (busy) return
    setBusy(true)
    await onToggleStatus(task._id, { status: task.status === 'completed' ? 'pending' : 'completed' })
    setBusy(false)
  }

  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      {task.description && <p>{task.description}</p>}
      <div className="task-meta">Status: {task.status} • Created: {new Date(task.createdAt).toLocaleString()}</div>

      <div className="controls">
        <Link to={`/edit/${task._id}`}><button className="ghost">Edit</button></Link>
        <button className="secondary" onClick={() => onDelete(task._id)}>Delete</button>
        <button onClick={toggle}>{busy ? '...' : (task.status === 'completed' ? 'Mark Pending' : 'Mark Completed')}</button>
      </div>
    </div>
  )
}

TaskItem.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    createdAt: PropTypes.string
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired
}