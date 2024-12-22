import { Task } from '@/App'
import { Button } from '@/Button'

interface TodolistProps {
  tasks: Array<Task>
  title: string
}
export const Todolist = ({ tasks, title }: TodolistProps) => {
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
              <input checked={el.isDone} type={'checkbox'} /> <span>{el.title}</span>
            </li>
          ))}
        </ul>
      )}
      <div>
        <Button title={'All'} />
        <Button title={'Active'} />
        <Button title={'Completed'} />
      </div>
    </div>
  )
}
