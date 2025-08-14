import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import TaskItem from '../TaskItem'
import { TaskProvider } from '../../context/TaskContext'

describe('TaskItem Component', () => {
  const mockTask = {
    _id: '1',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    priority: 'high',
    dueDate: '2024-12-31',
    tags: ['work', 'urgent']
  }

  const mockOnUpdate = jest.fn()
  const mockOnDelete = jest.fn()

  test('renders task information correctly', () => {
    render(
      <TaskProvider>
        <TaskItem task={mockTask} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />
      </TaskProvider>
    )

    expect(screen.getByText('Test Task')).toBeInTheDocument()
    expect(screen.getByText('Test Description')).toBeInTheDocument()
    expect(screen.getByText('high')).toBeInTheDocument()
    expect(screen.getByText('work')).toBeInTheDocument()
    expect(screen.getByText('urgent')).toBeInTheDocument()
  })

  test('displays completed state correctly', () => {
    const completedTask = { ...mockTask, completed: true }
    
    render(
      <TaskProvider>
        <TaskItem task={completedTask} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />
      </TaskProvider>
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeChecked()
  })

  test('calls onUpdate when checkbox is clicked', () => {
    render(
      <TaskProvider>
        <TaskItem task={mockTask} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />
      </TaskProvider>
    )

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)
    
    expect(mockOnUpdate).toHaveBeenCalledWith('1', { completed: true })
  })

  test('calls onDelete when delete button is clicked', () => {
    render(
      <TaskProvider>
        <TaskItem task={mockTask} onUpdate={mockOnUpdate} onDelete={mockOnDelete} />
      </TaskProvider>
    )

    const deleteButton = screen.getByLabelText(/delete task/i)
    fireEvent.click(deleteButton)
    
    expect(mockOnDelete).toHaveBeenCalledWith('1')
  })
})
