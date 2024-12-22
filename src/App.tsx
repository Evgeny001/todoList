import { Todolist } from '@/Todolist'

import './App.css'

export interface Task {
  id: number
  isDone: boolean
  title: string
}
export function App() {
  const tasks1: Array<Task> = [
    { id: 1, isDone: true, title: 'HTML&CSS' },
    { id: 2, isDone: true, title: 'JS' },
    { id: 3, isDone: false, title: 'ReactJS' },
  ]

  const tasks2: Array<Task> = [
    { id: 1, isDone: true, title: 'Hello world' },
    { id: 2, isDone: false, title: 'I am Happy' },
    { id: 3, isDone: false, title: 'Yo' },
  ]

  return (
    <div className={'App'}>
      <Todolist tasks={tasks1} title={'What to learn'} />
      <Todolist tasks={tasks2} title={'Songs'} />
    </div>
  )
}
