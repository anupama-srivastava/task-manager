import React from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask, onToggleTask }) => {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks found</h3>
        <p>Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      <h2>Your Tasks ({tasks.length})</h2>
      <div className="tasks-container">
        {tasks.map(task => (
          <TaskItem
            key={task._id}
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
            onToggle={onToggleTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
