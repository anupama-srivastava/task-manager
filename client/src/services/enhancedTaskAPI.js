import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const enhancedTaskAPI = {
  // Get all tasks with filtering and pagination
  getAllTasks: (params = {}) => api.get('/enhanced/tasks', { params }),
  
  // Get task templates
  getTaskTemplates: () => api.get('/enhanced/tasks/templates'),
  
  // Create task from template
  createTaskFromTemplate: (templateId) => api.post(`/enhanced/tasks/from-template/${templateId}`),
  
  // Get task analytics
  getAnalytics: (startDate, endDate) => api.get('/enhanced/tasks/analytics', {
    params: { startDate, endDate }
  }),
  
  // Bulk operations
  bulkOperations: (operation, taskIds, data) => api.post('/enhanced/tasks/bulk', {
    operation,
    taskIds,
    data
  }),
  
  // Subtask operations
  addSubtask: (taskId, subtask) => api.post(`/enhanced/tasks/${taskId}/subtasks`, subtask),
  updateSubtask: (taskId, subtaskId, data) => api.patch(`/enhanced/tasks/${taskId}/subtasks/${subtaskId}`, data),
  deleteSubtask: (taskId, subtaskId) => api.delete(`/enhanced/tasks/${taskId}/subtasks/${subtaskId}`),
  
  // Comment operations
  addComment: (taskId, comment) => api.post(`/enhanced/tasks/${taskId}/comments`, comment),
  updateComment: (taskId, commentId, data) => api.patch(`/enhanced/tasks/${taskId}/comments/${commentId}`, data),
  deleteComment: (taskId, commentId) => api.delete(`/enhanced/tasks/${taskId}/comments/${commentId}`)
};
