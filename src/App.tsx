import { useState } from 'react'

import { TodolistItem } from '@/Todolist'
import { v1 } from 'uuid'

import './App.css'

export type Todolist = {
  filter: FilterValues
  id: string
  title: string
}

export type Task = {
  id: string
  isDone: boolean
  title: string
}

export type FilterValues = 'active' | 'all' | 'completed'

export type TasksState = Record<string, Task[]>

export const App = () => {
  const todolistId1 = v1()
  const todolistId2 = v1()

  const [todolists, setTodolists] = useState<Todolist[]>([
    { filter: 'all', id: todolistId1, title: 'What to learn' },
    { filter: 'all', id: todolistId2, title: 'What to buy' },
  ])

  const [tasks, setTasks] = useState<TasksState>({
    [todolistId1]: [
      { id: v1(), isDone: true, title: 'HTML&CSS' },
      { id: v1(), isDone: true, title: 'JS' },
      { id: v1(), isDone: false, title: 'ReactJS' },
    ],
    [todolistId2]: [
      { id: v1(), isDone: true, title: 'Rest API' },
      { id: v1(), isDone: false, title: 'GraphQL' },
    ],
  })

  const changeFilter = (todolistId: string, filter: FilterValues) => {
    setTodolists(
      todolists.map(todolist => (todolist.id === todolistId ? { ...todolist, filter } : todolist))
    )
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }

  const deleteTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== taskId) })
  }

  const createTask = (todolistId: string, title: string) => {
    const newTask = { id: v1(), isDone: false, title }

    setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] })
  }

  const changeTaskStatus = (todolistId: string, taskId: string, isDone: boolean) => {
    setTasks({
      ...tasks,
      [todolistId]: tasks[todolistId].map(task => (task.id == taskId ? { ...task, isDone } : task)),
    })
  }

  return (
    <div className={'App'}>
      {todolists.map(todolist => {
        const todolistTasks = tasks[todolist.id]
        let filteredTasks = todolistTasks

        if (todolist.filter === 'active') {
          filteredTasks = todolistTasks.filter(task => !task.isDone)
        }
        if (todolist.filter === 'completed') {
          filteredTasks = todolistTasks.filter(task => task.isDone)
        }

        return (
          <TodolistItem
            changeFilter={changeFilter}
            changeTaskStatus={changeTaskStatus}
            createTask={createTask}
            deleteTask={deleteTask}
            deleteTodolist={deleteTodolist}
            key={todolist.id}
            tasks={filteredTasks}
            todolist={todolist}
          />
        )
      })}
    </div>
  )
}
