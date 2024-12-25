import { useState } from 'react'

import { Todolist } from '@/Todolist'
import { v1 } from 'uuid'

import './App.css'

export interface Task {
  id: string
  isDone: boolean
  title: string
}

export type FilterValues = 'active' | 'all' | 'completed'

export function App() {
  const [tasks, setTasks] = useState<Array<Task>>([
    { id: v1(), isDone: true, title: 'HTML&CSS' },
    { id: v1(), isDone: true, title: 'JS' },
    { id: v1(), isDone: false, title: 'ReactJS' },
  ])
  const [filter, setFilter] = useState<FilterValues>('all')

  let tasksForTodolist = tasks

  if (filter === 'active') {
    tasksForTodolist = tasks.filter(el => !el.isDone)
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(el => el.isDone)
  }

  const removeTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  const addTask = (title: string) => {
    const newTask: Task = {
      id: v1(),
      isDone: false,
      title,
    }

    setTasks([...tasks, newTask])
  }

  const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
    setTasks(tasks.map(task => (task.id === taskId ? { ...task, isDone: taskStatus } : task)))
  }

  return (
    <div className={'App'}>
      <Todolist
        addTask={addTask}
        changeFilter={changeFilter}
        changeTaskStatus={changeTaskStatus}
        filter={filter}
        removeTask={removeTask}
        tasks={tasksForTodolist}
        title={'What to learn'}
      />
    </div>
  )
}
