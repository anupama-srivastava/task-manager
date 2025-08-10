# TaskFlow - Professional Task Management Application

A full-stack task management application built with React, Node.js, and MongoDB. Features a clean, modern interface inspired by professional productivity tools.

## Features

- ✅ Create, read, update, and delete tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Filter tasks by status and priority
- ✅ Responsive design for all devices
- ✅ Real-time updates
- ✅ Clean, modern UI/UX
- ✅ RESTful API architecture
- ✅ MongoDB database with Mongoose ODM

## Tech Stack

**Frontend:**
- React 18 with Hooks
- React Router v6
- Axios for API calls
- CSS Modules for styling
- React Icons for icons

**Backend:**
- Node.js with Express
- MongoDB with Mongoose
- RESTful API design
- CORS enabled
- Environment variables

## Project Structure

```
task-manager/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
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

## Getting Started

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

## API Endpoints

- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `PATCH /api/tasks/:id/toggle` - Toggle task completion

## Development

Run both frontend and backend concurrently:
```bash
npm run dev
