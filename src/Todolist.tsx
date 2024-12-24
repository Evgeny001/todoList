import { useRef } from 'react'

import { FilterValues, Task } from '@/App'
import { Button } from '@/Button'

interface TodolistProps {
  addTask: (title: string) => void
  changeFilter: (filter: FilterValues) => void
  removeTask: (taskId: string) => void
  tasks: Array<Task>
  title: string
}
export const Todolist = ({ addTask, changeFilter, removeTask, tasks, title }: TodolistProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input ref={inputRef} />
        <Button
          onClick={() => {
            if (inputRef.current) {
              addTask(inputRef.current.value)
              inputRef.current.value = ''
            }
          }}
          title={'+'}
        />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(el => (
            <li key={el.id}>
              <Button onClick={() => removeTask(el.id)} title={'X'} />
              <input checked={el.isDone} type={'checkbox'} /> <span>{el.title}</span>
            </li>
          ))}
        </ul>
      )}
      <div>
        <Button onClick={() => changeFilter('all')} title={'All'} />
        <Button onClick={() => changeFilter('active')} title={'Active'} />
        <Button onClick={() => changeFilter('completed')} title={'Completed'} />
      </div>
    </div>
  )
}
