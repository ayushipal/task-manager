import PropTypes from 'prop-types'
import TaskItem from './TaskItem'

export default function TaskList({ tasks, onDelete, onToggleStatus }) {
  if (!tasks || tasks.length === 0) return <p>No tasks yet.</p>

  return (
    <div className="task-list">
      {tasks.map(t => (
        <TaskItem
          key={t._id}
          task={t}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </div>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleStatus: PropTypes.func.isRequired
}