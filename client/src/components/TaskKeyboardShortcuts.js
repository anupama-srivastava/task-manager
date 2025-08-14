import React, { useEffect } from 'react';

const TaskKeyboardShortcuts = ({ onCreateTask, onToggleTask, onDeleteTask }) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Only handle shortcuts when not typing in input fields
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
      }

      switch (e.key) {
        case 'n':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onCreateTask();
          }
          break;
        case 't':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onToggleTask();
          }
          break;
        case 'd':
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            onDeleteTask();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [onCreateTask, onToggleTask, onDeleteTask]);

  return null;
};

export default TaskKeyboardShortcuts;
