const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../server')
const Task = require('../models/Task')

describe('Tasks API', () => {
  beforeAll(async () => {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/taskflow_test'
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  })

  afterAll(async () => {
    await mongoose.connection.close()
  })

  beforeEach(async () => {
    await Task.deleteMany({})
  })

  describe('GET /api/tasks', () => {
    test('should return all tasks', async () => {
      const task = new Task({
        title: 'Test Task',
        description: 'Test Description',
        completed: false
      })
      await task.save()

      const response = await request(app)
        .get('/api/tasks')
        .expect(200)

      expect(response.body).toHaveLength(1)
      expect(response.body[0].title).toBe('Test Task')
    })

    test('should return empty array when no tasks', async () => {
      const response = await request(app)
        .get('/api/tasks')
        .expect(200)

      expect(response.body).toEqual([])
    })
  })

  describe('POST /api/tasks', () => {
    test('should create a new task', async () => {
      const taskData = {
        title: 'New Task',
        description: 'New Description',
        priority: 'high'
      }

      const response = await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(201)

      expect(response.body.title).toBe('New Task')
      expect(response.body.description).toBe('New Description')
      expect(response.body.priority).toBe('high')
    })

    test('should return 400 when title is missing', async () => {
      const taskData = {
        description: 'Task without title'
      }

      await request(app)
        .post('/api/tasks')
        .send(taskData)
        .expect(400)
    })
  })

  describe('PUT /api/tasks/:id', () => {
    test('should update an existing task', async () => {
      const task = new Task({
        title: 'Original Title',
        description: 'Original Description'
      })
      await task.save()

      const updateData = {
        title: 'Updated Title',
        completed: true
      }

      const response = await request(app)
        .put(`/api/tasks/${task._id}`)
        .send(updateData)
        .expect(200)

      expect(response.body.title).toBe('Updated Title')
      expect(response.body.completed).toBe(true)
    })

    test('should return 404 when task not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId()
      
      await request(app)
        .put(`/api/tasks/${nonExistentId}`)
        .send({ title: 'Updated' })
        .expect(404)
    })
  })

  describe('DELETE /api/tasks/:id', () => {
    test('should delete a task', async () => {
      const task = new Task({
        title: 'Task to delete',
        description: 'This will be deleted'
      })
      await task.save()

      await request(app)
        .delete(`/api/tasks/${task._id}`)
        .expect(200)

      const deletedTask = await Task.findById(task._id)
      expect(deletedTask).toBeNull()
    })

    test('should return 404 when task not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId()
      
      await request(app)
        .delete(`/api/tasks/${nonExistentId}`)
        .expect(404)
    })
  })
})
