import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCheck, FiAlertCircle, FiInfo, FiX } from 'react-icons/fi';
import socketService from '../services/socketService';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: notification.type || 'info',
      message: notification.message,
      title: notification.title,
      duration: notification.duration || 5000,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-remove notification after duration
    setTimeout(() => {
      removeNotification(id);
    }, newNotification.duration);
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  // Listen for real-time notifications
  useEffect(() => {
    const handleTaskCreated = (task) => {
      addNotification({
        type: 'success',
        title: 'Task Created',
        message: `New task "${task.title}" was created`,
        duration: 3000,
      });
    };

    const handleTaskUpdated = (task) => {
      addNotification({
        type: 'info',
        title: 'Task Updated',
        message: `Task "${task.title}" was updated`,
        duration: 3000,
      });
    };

    const handleTaskDeleted = ({ id }) => {
      addNotification({
        type: 'warning',
        title: 'Task Deleted',
        message: 'A task was deleted',
        duration: 3000,
      });
    };

    const handleTaskToggled = (task) => {
      addNotification({
        type: 'success',
        title: 'Task Status Changed',
        message: `Task "${task.title}" is now ${task.completed ? 'completed' : 'pending'}`,
        duration: 3000,
      });
    };

    socketService.on('task-created', handleTaskCreated);
    socketService.on('task-updated', handleTaskUpdated);
    socketService.on('task-deleted', handleTaskDeleted);
    socketService.on('task-toggled', handleTaskToggled);

    return () => {
      socketService.off('task-created', handleTaskCreated);
      socketService.off('task-updated', handleTaskUpdated);
      socketService.off('task-deleted', handleTaskDeleted);
      socketService.off('task-toggled', handleTaskToggled);
    };
  }, [addNotification]);

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <FiCheck className="w-5 h-5" />;
      case 'error':
        return <FiAlertCircle className="w-5 h-5" />;
      case 'warning':
        return <FiAlertCircle className="w-5 h-5" />;
      default:
        return <FiInfo className="w-5 h-5" />;
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${getStyles(notification.type)}`}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {getIcon(notification.type)}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="mt-1 text-sm opacity-90">{notification.message}</p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    onClick={() => removeNotification(notification.id)}
                    className="rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <FiX className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem;
