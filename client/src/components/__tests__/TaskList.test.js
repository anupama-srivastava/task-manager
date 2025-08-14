import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import TaskList from '../TaskList'
import { TaskProvider } from '../../context/TaskContext'

// Mock the API service
jest.mock('../../services/api', () => ({
  getTasks: jest.fn(() => Promise.resolve([])),
  createTask: jest.fn(),
  updateTask: jest.fn(),
  deleteTask: jest.fn()
}))

describe('TaskList Component', () => {
  const mockTasks = [
    {
      _id: '1',
      title: 'Test Task 1',
      description: 'Test Description 1',
      completed: false,
      priority: 'high',
      dueDate: '2024-12-31'
    },
    {
      _id: '2',
      title: 'Test Task 2',
      description: 'Test Description 2',
      completed: true,
      priority: 'medium',
      dueDate: '2024-12-30'
    }
  ]

  test('renders loading state initially', () => {
    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    )
    
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  test('renders tasks correctly', async () => {
    const { getTasks } = require('../../services/api')
    getTasks.mockResolvedValueOnce(mockTasks)

    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Test Task 1')).toBeInTheDocument()
      expect(screen.getByText('Test Task 2')).toBeInTheDocument()
    })
  })

  test('displays empty state when no tasks', async () => {
    const { getTasks } = require('../../services/api')
    getTasks.mockResolvedValueOnce([])

    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    )

    await waitFor(() => {
      expect(screen.getByText(/no tasks found/i)).toBeInTheDocument()
    })
  })

  test('filters tasks by search term', async () => {
    const { getTasks } = require('../../services/api')
    getTasks.mockResolvedValueOnce(mockTasks)

    render(
      <TaskProvider>
        <TaskList />
      </TaskProvider>
    )

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText(/search tasks/i)
      fireEvent.change(searchInput, { target: { value: 'Test Task 1' } })
      expect(screen.getByText('Test Task 1')).toBeInTheDocument()
      expect(screen.queryByText('Test Task 2')).not.toBeInTheDocument()
    })
  })
})
