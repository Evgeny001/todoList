import { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  title: string
}

export const Button = ({ className, title, ...otherProps }: ButtonProps) => {
  return (
    <button type={'button'} {...otherProps} className={className}>
      {title}
    </button>
  )
}
