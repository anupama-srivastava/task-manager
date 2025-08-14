const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../server')
const User = require('../models/User')

describe('Auth API', () => {
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
    await User.deleteMany({})
  })

  describe('POST /api/auth/register', () => {
    test('should register a new user', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: 'Test123456!'
      }

      const response = await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(201)

      expect(response.body.user.username).toBe('testuser')
      expect(response.body.user.email).toBe('test@example.com')
      expect(response.body.token).toBeDefined()
    })

    test('should return 400 for invalid email', async () => {
      const userData = {
        username: 'testuser',
        email: 'invalid-email',
        password: 'Test123456!'
      }

      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400)
    })

    test('should return 400 for weak password', async () => {
      const userData = {
        username: 'testuser',
        email: 'test@example.com',
        password: '123'
      }

      await request(app)
        .post('/api/auth/register')
        .send(userData)
        .expect(400)
    })
  })

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      const user = new User({
        username: 'testuser',
        email: 'test@example.com',
        password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' // bcrypt hash for 'password'
      })
      await user.save()
    })

    test('should login with valid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'password'
      }

      const response = await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(200)

      expect(response.body.user.email).toBe('test@example.com')
      expect(response.body.token).toBeDefined()
    })

    test('should return 401 for invalid credentials', async () => {
      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      }

      await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(401)
    })

    test('should return 404 for non-existent user', async () => {
      const loginData = {
        email: 'nonexistent@example.com',
        password: 'password'
      }

      await request(app)
        .post('/api/auth/login')
        .send(loginData)
        .expect(404)
    })
  })
})
