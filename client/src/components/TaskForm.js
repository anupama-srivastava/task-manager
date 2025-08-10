import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import '../styles/TaskForm.css';

const TaskForm = ({ onCreateTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    dueDate: ''
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onCreateTask(formData);
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      status: 'pending',
      dueDate: ''
    });
    setIsExpanded(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="task-form-container">
      <button 
        className="add-task-btn"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <FaPlus /> Add New Task
      </button>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="task-form">
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Task title"
            required
            className="form-input"
          />
          
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description (optional)"
            rows="3"
            className="form-textarea"
          />
          
          <div className="form-row">
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="form-select"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
            
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="form-select"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="form-input"
          />
          
          <button type="submit" className="btn-submit">Create Task</button>
        </form>
      )}
    </div>
  );
};

export default TaskForm;
