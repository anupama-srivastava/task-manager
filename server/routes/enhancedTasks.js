const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

// Get all tasks with filtering and pagination
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      priority,
      tags,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const filter = {};
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (tags) filter.tags = { $in: tags.split(',') };
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    const tasks = await Task.find(filter)
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Task.countDocuments(filter);

    res.json({
      tasks,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get task templates
router.get('/templates', async (req, res) => {
  try {
    const templates = await Task.find({ template: true });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create task from template
router.post('/from-template/:templateId', async (req, res) => {
  try {
    const template = await Task.findById(req.params.templateId);
    if (!template) {
      return res.status(404).json({ message: 'Template not found' });
    }

    const taskData = {
      title: template.title,
      description: template.description,
      priority: template.priority,
      tags: template.tags,
      subtasks: template.subtasks,
      timeTracking: template.timeTracking
    };

    const task = new Task(taskData);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add subtask to task
router.post('/:id/subtasks', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const subtask = {
      title: req.body.title,
      completed: false
    };

    task.subtasks.push(subtask);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update subtask
router.patch('/:id/subtasks/:subtaskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const subtask = task.subtasks.id(req.params.subtaskId);
    if (!subtask) {
      return res.status(404).json({ message: 'Subtask not found' });
    }

    subtask.completed = req.body.completed || subtask.completed;
    subtask.title = req.body.title || subtask.title;
    
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete subtask
router.delete('/:id/subtasks/:subtaskId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.subtasks.id(req.params.subtaskId).remove();
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add comment to task
router.post('/:id/comments', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const comment = {
      text: req.body.text,
      author: req.body.author || 'User'
    };

    task.comments.push(comment);
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update comment
router.patch('/:id/comments/:commentId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const comment = task.comments.id(req.params.commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    comment.text = req.body.text || comment.text;
    
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete comment
router.delete('/:id/comments/:commentId', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.comments.id(req.params.commentId).remove();
    await task.save();
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Bulk operations
router.post('/bulk', async (req, res) => {
  try {
    const { operation, taskIds, data } = req.body;

    if (!operation || !taskIds || !Array.isArray(taskIds)) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    let result;
    switch (operation) {
      case 'update':
        result = await Task.updateMany(
          { _id: { $in: taskIds } },
          { $set: data }
        );
        break;
      case 'delete':
        result = await Task.deleteMany({ _id: { $in: taskIds } });
        break;
      case 'complete':
        result = await Task.updateMany(
          { _id: { $in: taskIds } },
          { $set: { completed: true, completedAt: new Date() } }
        );
        break;
      default:
        return res.status(400).json({ message: 'Invalid operation' });
    }

    res.json({ success: true, result });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Task analytics
router.get('/analytics', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    const dateFilter = {};
    if (startDate) dateFilter.$gte = new Date(startDate);
    if (endDate) dateFilter.$lte = new Date(endDate);

    const matchStage = Object.keys(dateFilter).length > 0 ? { createdAt: dateFilter } : {};

    const analytics = await Task.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          completedTasks: { $sum: { $cond: ['$completed', 1, 0] } },
          pendingTasks: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
          inProgressTasks: { $sum: { $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0] } },
          highPriorityTasks: { $sum: { $cond: [{ $eq: ['$priority', 'high'] }, 1, 0] } },
          tasksWithDueDate: { $sum: { $cond: [{ $ne: ['$dueDate', null] }, 1, 0] } },
          overdueTasks: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $ne: ['$completed', true] },
                    { $lt: ['$dueDate', new Date()] }
                  ]
                },
                1,
                0
              ]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          totalTasks: 1,
          completedTasks: 1,
          pendingTasks: 1,
          inProgressTasks: 1,
          highPriorityTasks: 1,
          tasksWithDueDate: 1,
          overdueTasks: 1,
          completionRate: {
            $cond: [
              { $gt: ['$totalTasks', 0] },
              { $divide: ['$completedTasks', '$totalTasks'] },
              0
            ]
          }
        }
      }
    ]);

    // Get tasks by status
    const tasksByStatus = await Task.aggregate([
      { $match: matchStage },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // Get tasks by priority
    const tasksByPriority = await Task.aggregate([
      { $match: matchStage },
      { $group: { _id: '$priority', count: { $sum: 1 } } }
    ]);

    // Get tasks by tags
    const tasksByTags = await Task.aggregate([
      { $match: matchStage },
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    res.json({
      overview: analytics[0] || {
        totalTasks: 0,
        completedTasks: 0,
        pendingTasks: 0,
        inProgressTasks: 0,
        highPriorityTasks: 0,
        tasksWithDueDate: 0,
        overdueTasks: 0,
        completionRate: 0
      },
      tasksByStatus,
      tasksByPriority,
      tasksByTags
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
