import React, { useState } from 'react';
import { FaPlus, FaTrash, FaCheck } from 'react-icons/fa';
import '../styles/SubtaskManager.css';

const SubtaskManager = ({ subtasks, onAddSubtask, onUpdateSubtask, onDeleteSubtask }) => {
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      onAddSubtask(newSubtaskTitle.trim());
      setNewSubtaskTitle('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSubtask();
    }
  };

  return (
    <div className="subtask-manager">
      <h4>Subtasks ({subtasks?.length || 0})</h4>
      
      <div className="subtask-list">
        {subtasks?.map((subtask) => (
          <div key={subtask.id} className={`subtask-item ${subtask.completed ? 'completed' : ''}`}>
            <button
              className="subtask-toggle"
              onClick={() => onUpdateSubtask(subtask.id, { completed: !subtask.completed })}
            >
              <FaCheck />
            </button>
            
            <span className="subtask-title">{subtask.title}</span>
            
            <button
              className="subtask-delete"
              onClick={() => onDeleteSubtask(subtask.id)}
            >
              <FaTrash />
            </button>
          </div>
        ))}
      </div>

      <div className="subtask-input-container">
        <input
          type="text"
          value={newSubtaskTitle}
          onChange={(e) => setNewSubtaskTitle(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a subtask..."
          className="subtask-input"
        />
        <button onClick={handleAddSubtask} className="subtask-add-btn">
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default SubtaskManager;
