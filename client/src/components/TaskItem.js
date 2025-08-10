import React, { useState } from 'react';
import { FaCheck, FaEdit, FaTrash, FaCalendar } from 'react-icons/fa';
import { format } from 'date-fns';
import '../styles/TaskItem.css';

const TaskItem = ({ task, onUpdate, onDelete, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(task);

  const handleSave = () => {
    onUpdate(task._id, editedTask);
    setIsEditing(false);
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  const getStatusClass = (status) => {
    return `status-${status}`;
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <input
          type="text"
          value={editedTask.title}
          onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
          className="edit-input"
        />
        <textarea
          value={editedTask.description || ''}
          onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
          className="edit-textarea"
          placeholder="Description (optional)"
        />
        <div className="edit-actions">
          <button onClick={handleSave} className="btn-save">Save</button>
          <button onClick={() => setIsEditing(false)} className="btn-cancel">Cancel</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <div className="task-meta">
            <span className={`priority ${getPriorityClass(task.priority)}`}>
              {task.priority}
            </span>
            <span className={`status ${getStatusClass(task.status)}`}>
              {task.status}
            </span>
          </div>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        {task.dueDate && (
          <div className="task-due-date">
            <FaCalendar /> {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </div>
        )}
      </div>

      <div className="task-actions">
        <button 
          onClick={() => onToggle(task._id)} 
          className={`btn-toggle ${task.completed ? 'completed' : ''}`}
          title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <FaCheck />
        </button>
        <button 
          onClick={() => setIsEditing(true)} 
          className="btn-edit"
          title="Edit task"
        >
          <FaEdit />
        </button>
        <button 
          onClick={() => onDelete(task._id)} 
          className="btn-delete"
          title="Delete task"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
