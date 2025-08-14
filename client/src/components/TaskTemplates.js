import React, { useState, useEffect } from 'react';
import { FaSave, FaPlus, FaTrash } from 'react-icons/fa';
import { taskAPI } from '../services/enhancedTaskAPI';
import '../styles/TaskTemplates.css';

const TaskTemplates = ({ onCreateTaskFromTemplate }) => {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTemplate, setNewTemplate] = useState({
    title: '',
    description: '',
    priority: 'medium',
    tags: [],
    subtasks: []
  });

  useEffect(() => {
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      const data = await taskAPI.getTaskTemplates();
      setTemplates(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching templates:', error);
      setLoading(false);
    }
  };

  const handleCreateTemplate = async () => {
    if (!newTemplate.title.trim()) return;

    try {
      const template = await taskAPI.createTaskFromTemplate({
        ...newTemplate,
        template: true,
        templateName: newTemplate.title
      });
      
      setTemplates([...templates, template]);
      setNewTemplate({
        title: '',
        description: '',
        priority: 'medium',
        tags: [],
        subtasks: []
      });
    } catch (error) {
      console.error('Error creating template:', error);
    }
  };

  const handleDeleteTemplate = async (templateId) => {
    try {
      await taskAPI.deleteTask(templateId);
      setTemplates(templates.filter(t => t._id !== templateId));
    } catch (error) {
      console.error('Error deleting template:', error);
    }
  };

  const handleUseTemplate = (template) => {
    onCreateTaskFromTemplate(template);
  };

  if (loading) {
    return <div className="templates-loading">Loading templates...</div>;
  }

  return (
    <div className="task-templates">
      <h2>Task Templates</h2>
      
      <div className="template-form">
        <h3>Create New Template</h3>
        <input
          type="text"
          placeholder="Template name"
          value={newTemplate.title}
          onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
        />
        <textarea
          placeholder="Description"
          value={newTemplate.description}
          onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
        />
        <select
          value={newTemplate.priority}
          onChange={(e) => setNewTemplate({ ...newTemplate, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>
        <button onClick={handleCreateTemplate}>
          <FaSave /> Save Template
        </button>
      </div>

      <div className="templates-list">
        {templates.map(template => (
          <div key={template._id} className="template-item">
            <h4>{template.title}</h4>
            <p>{template.description}</p>
            <div className="template-meta">
              <span>Priority: {template.priority}</span>
              <span>Tags: {template.tags?.join(', ')}</span>
            </div>
            <div className="template-actions">
              <button onClick={() => handleUseTemplate(template)}>
                <FaPlus /> Use Template
              </button>
              <button onClick={() => handleDeleteTemplate(template._id)}>
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskTemplates;
