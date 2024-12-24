import { ChangeEvent, KeyboardEvent, useState } from 'react'

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
  const [taskTitle, setTaskTitle] = useState<string>('')

  const addTaskHandler = () => {
    addTask(taskTitle)
    setTaskTitle('')
  }

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }

  const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask(taskTitle)
    }
  }

  const changeFilterTasksHandler = (filter: FilterValues) => {
    changeFilter(filter)
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          onChange={changeTaskTitleHandler}
          onKeyDown={addTaskOnKeyUpHandler}
          value={taskTitle}
        />
        <Button onClick={addTaskHandler} title={'+'} />
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            const removeTaskHandler = () => {
              removeTask(task.id)
            }

            return (
              <li key={task.id}>
                <input checked={task.isDone} type={'checkbox'} />
                <span>{task.title}</span>
                <Button onClick={removeTaskHandler} title={'x'} />
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Button onClick={() => changeFilterTasksHandler('all')} title={'All'} />
        <Button onClick={() => changeFilterTasksHandler('active')} title={'Active'} />
        <Button onClick={() => changeFilterTasksHandler('completed')} title={'Completed'} />
      </div>
    </div>
  )
}
