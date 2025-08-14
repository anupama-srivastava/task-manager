const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const taskRoutes = require('./routes/tasks');
const Task = require('./models/Task');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  }
});

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Make io accessible to routes
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/tasks', taskRoutes);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join user to a room (could be user-specific in future)
  socket.join('task-updates');

  // Handle task updates
  socket.on('task-updated', (data) => {
    socket.broadcast.to('task-updates').emit('task-updated', data);
  });

  // Handle new task creation
  socket.on('task-created', (data) => {
    socket.broadcast.to('task-updates').emit('task-created', data);
  });

  // Handle task deletion
  socket.on('task-deleted', (data) => {
    socket.broadcast.to('task-updates').emit('task-deleted', data);
  });

  // Handle task status toggle
  socket.on('task-toggled', (data) => {
    socket.broadcast.to('task-updates').emit('task-toggled', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'TaskFlow API is running',
    timestamp: new Date().toISOString(),
    socket: 'Socket.io enabled'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Socket.io server ready on port ${PORT}`);
});
