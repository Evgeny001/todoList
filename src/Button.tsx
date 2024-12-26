import { ButtonHTMLAttributes } from 'react'

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  title: string
}

export const Button = ({ className, title, ...otherProps }: Props) => {
  return (
    <button type={'button'} {...otherProps} className={className}>
      {title}
    </button>
  )
}
