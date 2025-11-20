import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function TaskForm({ initial, onSubmit, submitLabel = "Save" }) {
  const [task, setTask] = useState({ title: "", description: "", status: "pending" });
  const [error, setError] = useState("");

  // If editing, load initial data
  useEffect(() => {
    if (initial) {
      setTask({ ...initial });
    }
  }, [initial]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!task.title.trim()) {
      setError("Title cannot be empty");
      return;
    }

    try {
      // Call the onSubmit prop with task data
      await onSubmit({
        title: task.title.trim(),
        description: task.description?.trim() || "",
        status: task.status
      });

      // Reset form only if adding new task
      if (!initial) {
        setTask({ title: "", description: "", status: "pending" });
      }
    } catch (err) {
      setError(err.message || "Failed to save task");
    }
  };

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

      <select
        value={task.status}
        onChange={(e) => setTask({ ...task, status: e.target.value })}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      <div className="actions">
        <button type="submit">{submitLabel}</button>
      </div>
    </form>
  );
}

TaskForm.propTypes = {
  initial: PropTypes.object, // optional initial task data (for editing)
  onSubmit: PropTypes.func.isRequired, // function to call when form submits
  submitLabel: PropTypes.string // button text
};