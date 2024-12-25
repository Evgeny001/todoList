import { ChangeEvent, KeyboardEvent, useState } from 'react'

import { FilterValues, Task } from '@/App'
import { Button } from '@/Button'

interface TodolistProps {
  addTask: (title: string) => void
  changeFilter: (filter: FilterValues) => void
  changeTaskStatus: (taskId: string, taskStatus: boolean) => void
  removeTask: (taskId: string) => void
  tasks: Array<Task>
  title: string
}
export const Todolist = ({
  addTask,
  changeFilter,
  changeTaskStatus,
  removeTask,
  tasks,
  title,
}: TodolistProps) => {
  const [taskTitle, setTaskTitle] = useState<string>('')
  const [error, setError] = useState<null | string>(null)

  const addTaskHandler = () => {
    if (taskTitle.trim() !== '') {
      addTask(taskTitle.trim())
      setTaskTitle('')
    } else {
      setError('Title is required')
    }
  }

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }

  const addTaskOnKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      addTaskHandler()
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
          className={error ? 'error' : ''}
          onChange={changeTaskTitleHandler}
          onKeyDown={addTaskOnKeyUpHandler}
          value={taskTitle}
        />
        <Button onClick={addTaskHandler} title={'+'} />
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            const removeTaskHandler = () => {
              removeTask(task.id)
            }
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              changeTaskStatus(task.id, e.currentTarget.checked)
            }

            return (
              <li key={task.id}>
                <input checked={task.isDone} onChange={changeTaskStatusHandler} type={'checkbox'} />
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
