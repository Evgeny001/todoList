import { ChangeEvent, KeyboardEvent, useState } from 'react'

import { FilterValues, Task, Todolist } from '@/App'
import { Button } from '@/Button'

interface Props {
  changeFilter: (todolistId: string, filter: FilterValues) => void
  changeTaskStatus: (todolistId: string, taskId: string, isDone: boolean) => void
  createTask: (todolistId: string, title: string) => void
  deleteTask: (todolistId: string, taskId: string) => void
  deleteTodolist: (todolistId: string) => void
  tasks: Task[]
  todolist: Todolist
}
export const TodolistItem = (props: Props) => {
  const {
    changeFilter,
    changeTaskStatus,
    createTask,
    deleteTask,
    deleteTodolist,
    tasks,
    todolist: { filter, id, title },
  } = props

  const [taskTitle, setTaskTitle] = useState('')
  const [error, setError] = useState<null | string>(null)

  const createTaskHandler = () => {
    const trimmedTitle = taskTitle.trim()

    if (trimmedTitle !== '') {
      createTask(id, trimmedTitle)
      setTaskTitle('')
    } else {
      setError('Title is required')
    }
  }

  const changeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
    setError(null)
  }

  const createTaskOnEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      createTaskHandler()
    }
  }

  const changeFilterHandler = (filter: FilterValues) => {
    changeFilter(id, filter)
  }

  const deleteTodolistHandler = () => {
    deleteTodolist(id)
  }

  return (
    <div>
      <h3>{title}</h3>
      <Button onClick={deleteTodolistHandler} title={'x'} />
      <div>
        <input
          className={error ? 'error' : ''}
          onChange={changeTaskTitleHandler}
          onKeyDown={createTaskOnEnterHandler}
          value={taskTitle}
        />
        <Button onClick={createTaskHandler} title={'+'} />
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            const deleteTaskHandler = () => {
              deleteTask(id, task.id)
            }
            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              changeTaskStatus(id, task.id, e.currentTarget.checked)
            }

            return (
              <li className={task.isDone ? 'is-done' : ''} key={task.id}>
                <input checked={task.isDone} onChange={changeTaskStatusHandler} type={'checkbox'} />
                <span>{task.title}</span>
                <Button onClick={deleteTaskHandler} title={'x'} />
              </li>
            )
          })}
        </ul>
      )}
      <div>
        <Button
          className={filter === 'all' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('all')}
          title={'All'}
        />
        <Button
          className={filter === 'active' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('active')}
          title={'Active'}
        />
        <Button
          className={filter === 'completed' ? 'active-filter' : ''}
          onClick={() => changeFilterHandler('completed')}
          title={'Completed'}
        />
      </div>
    </div>
  )
}
