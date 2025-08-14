# TaskFlow - Professional Task Management Application

A full-stack task management application built with React, Node.js, and MongoDB. Features a clean, modern interface inspired by professional productivity tools with real-time updates, performance optimizations, and advanced task management capabilities.

## 🚀 Features

### ✅ Core Features
- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks by status, priority, and search
- ✅ Responsive design for all devices
- ✅ Real-time updates with Socket.io
- ✅ Clean, modern UI/UX with animations
- ✅ RESTful API architecture
- ✅ MongoDB database with Mongoose ODM

### ⚡ Advanced Features
- ⚡ **Real-time Notifications** - Instant updates across all connected clients
- ⚡ **Performance Optimization** - Virtual scrolling for large task lists
- ⚡ **Optimistic Updates** - Instant UI updates with rollback on failure
- ⚡ **Subtask Management** - Break tasks into smaller subtasks
- ⚡ **Task Templates** - Pre-defined templates for common tasks
- ⚡ **Task Analytics** - Insights and statistics on task completion
- ⚡ **Keyboard Shortcuts** - Power-user productivity features
- ⚡ **Bulk Operations** - Efficient batch task management
- ⚡ **Comments System** - Collaborative task discussions

## 🛠️ Tech Stack

### **Frontend:**
- React 18 with Hooks & Context API
- React Router v6 for navigation
- Axios for API calls with interceptors
- Framer Motion for animations
- Socket.io-client for real-time features
- React-window for virtual scrolling
- CSS Modules for styling
- React Icons for icons
- Jest & React Testing Library for testing

### **Backend:**
- Node.js with Express
- MongoDB with Mongoose ODM
- Socket.io for real-time communication
- JWT authentication & authorization
- Express-validator for input validation
- Helmet for security headers
- Rate limiting & CORS protection
- MongoDB sanitization & XSS protection
- Compression & performance optimization

### **DevOps:**
- Docker & Docker Compose
- Nginx reverse proxy
- SSL/TLS support
- Environment-based configuration
- Hot reload for development

## 📁 Project Structure

```
task-manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── styles/         # CSS styles
│   │   └── App.js          # Main application component
├── server/                 # Node.js backend
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── middleware/         # Custom middleware
│   ├── config/             # Configuration files
│   └── server.js           # Main server file
├── docker-compose.yml      # Docker configuration
├── Dockerfile             # Docker build instructions
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn
- Docker (optional, for containerized setup)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd task-manager
   ```

2. **Install server dependencies**
   ```bash
   cd server && npm install
   ```

3. **Install client dependencies**
   ```bash
   cd client && npm install
   ```

4. **Set up environment variables**
   Create a `.env` file in the server directory:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/taskflow
   JWT_SECRET=your-secret-key-here
   ```

5. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

### Docker Setup (Alternative)

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MongoDB: localhost:27017

## 📡 API Endpoints

### **Authentication**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### **Tasks**
- `GET /api/tasks` - Get all tasks (with filtering and pagination)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion
- `POST /api/tasks/bulk` - Bulk operations on tasks

### **Enhanced Features**
- `GET /api/enhanced/tasks/analytics` - Get task analytics
- `GET /api/enhanced/tasks/templates` - Get task templates
- `POST /api/enhanced/tasks/from-template/:id` - Create task from template
- `POST /api/tasks/:id/subtasks` - Add subtask
- `POST /api/tasks/:id/comments` - Add comment

## 🧪 Testing

### **Frontend Testing**
```bash
cd client
npm test                    # Run all tests
npm run test:watch         # Watch mode
npm run test:coverage      # Coverage report
```

### **Backend Testing**
```bash
cd server
npm test                   # Run all tests
npm run test:watch        # Watch mode
npm run test:coverage     # Coverage report
```

### **Integration Testing**
```bash
cd server
npm run test:integration  # Integration tests
```

## 📊 Performance Features

### **Real-time Updates**
- Instant synchronization across all connected clients
- Optimistic UI updates for immediate feedback
- Automatic reconnection on network issues

### **Performance Optimizations**
- Virtual scrolling for large task lists (10,000+ tasks)
- Debounced search functionality (300ms delay)
- Memoized components to prevent unnecessary re-renders
- Lazy loading of heavy components
- Image optimization and compression

### **Caching Strategy**
- API response caching
- Client-side state management
- Efficient database queries with indexes

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Input validation and sanitization
- Rate limiting to prevent abuse
- CORS configuration
- Security headers with Helmet
- MongoDB injection prevention
- XSS protection

## 📝 Documentation & Examples

### **Real-time Features Usage**
```javascript
// Listen for real-time task updates
socketService.on('task-updated', (updatedTask) => {
  console.log('Task updated:', updatedTask);
});
```

### **Performance Optimization**
```javascript
// Use virtual scrolling for large lists
<OptimizedTaskList 
  tasks={tasks} 
  filters={filters}
  onTaskUpdate={handleTaskUpdate}
/>
```

### **Task Templates**
```javascript
// Create task from template
const newTask = await enhancedTaskAPI.createTaskFromTemplate('template-id');
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

##It seems there was an error while attempting to update the README.md file. I will manually create the necessary changes in a structured format to ensure they are applied correctly.

Here’s the plan for updating the README.md file:

### Update Plan for README.md

1. **Update the Features Section:**
   - Replace the existing features with the new comprehensive list that includes real-time updates, performance optimizations, and advanced task management capabilities.

2. **Update the Project Structure Section:**
   - Ensure it accurately reflects the current structure, including the client and server directories.

3. **Update the Getting Started Section:**
   - Ensure the installation instructions are clear and include any new dependencies or setup steps.

4. **Add a Documentation & Examples Section:**
   - Include a section for usage examples of real-time features and performance optimizations.

5. **Update the API Endpoints Section:**
   - Add any new API endpoints introduced for enhanced task management.

### Proposed Changes

```markdown
# TaskFlow - Professional Task Management Application

A full-stack task management application built with React, Node.js, and MongoDB. Features a clean, modern interface inspired by professional productivity tools with real-time updates, performance optimizations, and advanced task management capabilities.

## 🚀 Features

### ✅ Core Features
- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks by status, priority, and search
- ✅ Responsive design for all devices
- ✅ Real-time updates with Socket.io
- ✅ Clean, modern UI/UX with animations
- ✅ RESTful API architecture
- ✅ MongoDB database with Mongoose ODM

### ⚡ Advanced Features
- ⚡ **Real-time Notifications** - Instant updates across all connected clients
- ⚡ **Performance Optimization** - Virtual scrolling for large task lists
- ⚡ **Optimistic Updates** - Instant UI updates with rollback on failure
- ⚡ **Subtask Management** - Break tasks into smaller subtasks
- ⚡ **Task Templates** - Pre-defined templates for common tasks
- ⚡ **Task Analytics** - Insights and statistics on task completion
- ⚡ **Keyboard Shortcuts** - Power-user productivity features
- ⚡ **Bulk Operations** - Efficient batch task management
- ⚡ **Comments System** - Collaborative task discussions

## 🛠️ Tech Stack

### **Frontend:**
- React 18 with Hooks & Context API
- React Router v6 for navigation
- Axios for API calls with interceptors
- Framer Motion for animations
- Socket.io-client for real-time features
- React-window for virtual scrolling
- CSS Modules for styling
- React Icons for icons
- Jest & React Testing Library for testing

### **Backend:**
- Node.js with Express
- MongoDB with Mongoose ODM
- Socket.io for real-time communication
- JWT authentication & authorization
- Express-validator for input validation
- Helmet for security headers
- Rate limiting & CORS protection
- MongoDB sanitization & XSS protection
- Compression & performance optimization

### **DevOps:**
- Docker & Docker Compose
- Nginx reverse proxy
- SSL/TLS support
- Environment-based configuration
- Hot reload for development

## 📁 Project Structure

```
task-manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
├── server/                 # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
└── README.md
```

## 📦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Install server dependencies:
   ```bash
   cd server && npm install
   ```
3. Install client dependencies:
   ```bash
   cd client && npm install
   ```
4. Set up environment variables
5. Start the development servers

## 📡 API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion
```


<create_file>
<path>task-manager/README.md</path>
<content>
# TaskFlow - Professional Task Management Application

A full-stack task management application built with React, Node.js, and MongoDB. Features a clean, modern interface inspired by professional productivity tools with real-time updates, performance optimizations, and advanced task management capabilities.

## 🚀 Features

### ✅ Core Features
- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks by status, priority, and search
- ✅ Responsive design for all devices
- ✅ Real-time updates with Socket.io
- ✅ Clean, modern UI/UX with animations
- ✅ RESTful API architecture
- ✅ MongoDB database with Mongoose ODM

### ⚡ Advanced Features
- ⚡ **Real-time Notifications** - Instant updates across all connected clients
- ⚡ **Performance Optimization** - Virtual scrolling for large task lists
- ⚡ **Optimistic Updates** - Instant UI updates with rollback on failure
- ⚡ **Subtask Management** - Break tasks into smaller subtasks
- ⚡ **Task Templates** - Pre-defined templates for common tasks
- ⚡ **Task Analytics** - Insights and statistics on task completion
- ⚡ **Keyboard Shortcuts** - Power-user productivity features
- ⚡ **Bulk Operations** - Efficient batch task management
- ⚡ **Comments System** - Collaborative task discussions

## 🛠️ Tech Stack

### **Frontend:**
- React 18 with Hooks & Context API
- React Router v6 for navigation
- Axios for API calls with interceptors
- Framer Motion for animations
- Socket.io-client for real-time features
- React-window for virtual scrolling
- CSS Modules for styling
- React Icons for icons
- Jest & React Testing Library for testing

### **Backend:**
- Node.js with Express
- MongoDB with Mongoose ODM
- Socket.io for real-time communication
- JWT authentication & authorization
- Express-validator for input validation
- Helmet for security headers
- Rate limiting & CORS protection
- MongoDB sanitization & XSS protection
- Compression & performance optimization

### **DevOps:**
- Docker & Docker Compose
- Nginx reverse proxy
- SSL/TLS support
- Environment-based configuration
- Hot reload for development

## 📁 Project Structure

```
task-manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/
│   │   ├── services/
│   │   └── styles/
├── server/                 # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── config/
└── README.md
```

## 📦 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. Clone the repository
2. Install server dependencies:
   ```bash
   cd server && npm install
   ```
3. Install client dependencies:
   ```bash
   cd client && npm install
   ```
4. Set up environment variables
5. Start the development servers

## 📡 API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion
