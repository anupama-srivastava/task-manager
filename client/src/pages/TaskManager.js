import React, { useState, useEffect } from 'react';
import OptimizedTaskList from '../components/OptimizedTaskList';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import NotificationSystem from '../components/NotificationSystem';
import enhancedTaskAPI from '../services/enhancedTaskAPI';
import socketService from '../services/socketService';
import '../styles/TaskManager.css';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({ 
    status: 'all', 
    priority: 'all', 
    search: '' 
  });

  useEffect(() => {
    initializeApp();
    return () => {
      socketService.disconnect();
    };
  }, []);

  const initializeApp = async () => {
    try {
      setLoading(true);
      await fetchTasks();
      socketService.connect();
      setError(null);
    } catch (err) {
      setError('Failed to initialize app');
      console.error('Error initializing app:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await enhancedTaskAPI.getAllTasks();
      setTasks(response);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    }
  };

  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await enhancedTaskAPI.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  const handleUpdateTask = async (id, taskData) => {
    try {
      const updatedTask = await enhancedTaskAPI.updateTask(id, taskData);
      setTasks(prev => prev.map(task => task._id === id ? updatedTask : task));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await enhancedTaskAPI.deleteTask(id);
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleTask = async (id) => {
    try {
      const toggledTask = await enhancedTaskAPI.toggleTask(id);
      setTasks(prev => prev.map(task => task._id === id ? toggledTask : task));
    } catch (err) {
      console.error('Error toggling task:', err);
    }
  };

  const handleTaskUpdate = async (id, updates) => {
    try {
      const updatedTask = await enhancedTaskAPI.optimisticUpdate(id, updates);
      setTasks(prev => prev.map(task => task._id === id ? updatedTask : task));
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="task-manager">
      <NotificationSystem />
      
      <header className="app-header">
        <h1>TaskFlow</h1>
        <p>Manage your tasks efficiently with real-time updates</p>
      </header>

      <div className="task-container">
        <aside className="sidebar">
          <TaskForm onCreateTask={handleCreateTask} />
          <TaskFilters filter={filter} setFilter={setFilter} />
        </aside>

        <main className="main-content">
          <OptimizedTaskList 
            tasks={tasks}
            onTaskUpdate={handleTaskUpdate}
            filters={filter}
          />
        </main>
      </div>
    </div>
  );
};

export default TaskManager;
