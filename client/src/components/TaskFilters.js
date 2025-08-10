import React from 'react';
import '../styles/TaskFilters.css';

const TaskFilters = ({ filter, setFilter }) => {
  const handleFilterChange = (type, value) => {
    setFilter(prev => ({ ...prev, [type]: value }));
  };

  return (
    <div className="task-filters">
      <h3>Filters</h3>
      
      <div className="filter-group">
        <label>Status:</label>
        <select 
          value={filter.status} 
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label>Priority:</label>
        <select 
          value={filter.priority} 
          onChange={(e) => handleFilterChange('priority', e.target.value)}
          className="filter-select"
        >
          <option value="all">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilters;
