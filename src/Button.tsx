export interface ButtonProps {
  title: string
}

export const Button = ({ title }: ButtonProps) => {
  return <button type={'button'}>{title}</button>
}
