import { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export const Button = ({ title, ...otherProps }: ButtonProps) => {
  return (
    <button type={'button'} {...otherProps}>
      {title}
    </button>
  )
}
