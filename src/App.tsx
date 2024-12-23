import { useState } from 'react'

import { Todolist } from '@/Todolist'

import './App.css'

export interface Task {
  id: number
  isDone: boolean
  title: string
}

export type FilterValues = 'active' | 'all' | 'completed'

export function App() {
  const [tasks, setTasks] = useState<Array<Task>>([
    { id: 1, isDone: true, title: 'HTML&CSS' },
    { id: 2, isDone: true, title: 'JS' },
    { id: 3, isDone: false, title: 'ReactJS' },
  ])
  const [filter, setFilter] = useState<FilterValues>('all')

  let tasksForTodolist = tasks

  if (filter === 'active') {
    tasksForTodolist = tasks.filter(el => !el.isDone)
  }
  if (filter === 'completed') {
    tasksForTodolist = tasks.filter(el => el.isDone)
  }

  const removeTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const changeFilter = (filter: FilterValues) => {
    setFilter(filter)
  }

  return (
    <div className={'App'}>
      <Todolist
        changeFilter={changeFilter}
        removeTask={removeTask}
        tasks={tasksForTodolist}
        title={'What to learn'}
      />
    </div>
  )
}
