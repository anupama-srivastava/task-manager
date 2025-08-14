import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { FixedSizeList } from 'react-window';
import { motion, AnimatePresence } from 'framer-motion';
import TaskItem from './TaskItem';
import socketService from '../services/socketService';
import enhancedTaskAPI from '../services/enhancedTaskAPI';

const OptimizedTaskList = React.memo(({ tasks, onTaskUpdate, filters }) => {
  const [localTasks, setLocalTasks] = useState(tasks);
  const [isConnected, setIsConnected] = useState(false);

  // Memoize filtered tasks
  const filteredTasks = useMemo(() => {
    if (!filters) return localTasks;
    
    return localTasks.filter(task => {
      if (filters.status && task.status !== filters.status) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    });
  }, [localTasks, filters]);

  // Connect to Socket.io
  useEffect(() => {
    socketService.connect();
    setIsConnected(true);

    // Set up real-time listeners
    socketService.on('task-created', (newTask) => {
      setLocalTasks(prev => [...prev, newTask]);
    });

    socketService.on('task-updated', (updatedTask) => {
      setLocalTasks(prev => prev.map(task => 
        task._id === updatedTask._id ? updatedTask : task
      ));
    });

    socketService.on('task-deleted', ({ id }) => {
      setLocalTasks(prev => prev.filter(task => task._id !== id));
    });

    socketService.on('task-toggled', (toggledTask) => {
      setLocalTasks(prev => prev.map(task => 
        task._id === toggledTask._id ? toggledTask : task
      ));
    });

    return () => {
      socketService.disconnect();
    };
  }, []);

  // Update local tasks when props change
  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  // Optimistic update handler
  const handleTaskUpdate = useCallback(async (taskId, updates) => {
    try {
      // Optimistic update
      setLocalTasks(prev => prev.map(task => 
        task._id === taskId ? { ...task, ...updates } : task
      ));

      // Send to server
      await enhancedTaskAPI.optimisticUpdate(taskId, updates);
      
      // Notify parent
      if (onTaskUpdate) {
        onTaskUpdate(taskId, updates);
      }
    } catch (error) {
      // Rollback on error
      console.error('Task update failed:', error);
      // In a real app, you might want to show a toast notification
    }
  }, [onTaskUpdate]);

  // Virtual scrolling item renderer
  const Row = useCallback(({ index, style }) => {
    const task = filteredTasks[index];
    return (
      <div style={style}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
        >
          <TaskItem
            task={task}
            onUpdate={handleTaskUpdate}
            isRealTime={isConnected}
          />
        </motion.div>
      </div>
    );
  }, [filteredTasks, handleTaskUpdate, isConnected]);

  // Empty state
  if (filteredTasks.length === 0) {
    return (
      <div className="text-center py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-gray-500"
        >
          <p className="text-xl mb-2">No tasks found</p>
          <p className="text-sm">Create your first task to get started!</p>
        </motion.div>
      </div>
    );
  }

  // Connection indicator
  const ConnectionIndicator = () => (
    <div className={`fixed top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
      isConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
    }`}>
      {isConnected ? '● Live' : '● Offline'}
    </div>
  );

  return (
    <div className="relative">
      <ConnectionIndicator />
      
      {filteredTasks.length > 10 ? (
        <FixedSizeList
          height={600}
          itemCount={filteredTasks.length}
          itemSize={80}
          width="100%"
          className="task-list"
        >
          {Row}
        </FixedSizeList>
      ) : (
        <AnimatePresence>
          {filteredTasks.map(task => (
            <motion.div
              key={task._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <TaskItem
                task={task}
                onUpdate={handleTaskUpdate}
                isRealTime={isConnected}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
});

OptimizedTaskList.displayName = 'OptimizedTaskList';

export default OptimizedTaskList;
