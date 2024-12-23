import { FilterValues, Task } from '@/App'
import { Button } from '@/Button'

interface TodolistProps {
  changeFilter: (filter: FilterValues) => void
  removeTask: (taskId: number) => void
  tasks: Array<Task>
  title: string
}
export const Todolist = ({ changeFilter, removeTask, tasks, title }: TodolistProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input />
        <button type={'button'}>+</button>
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
