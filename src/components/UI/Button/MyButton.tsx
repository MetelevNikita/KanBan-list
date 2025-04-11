import { FC } from 'react'

// css

import styles from '@/components/UI/Button/Mybutton.module.css'


interface MyButtonProps {
  text: string
  onClick?: () => void
  type: 'button' | 'submit' | 'reset'
  name: string
}

const MyButton: FC<MyButtonProps> = ({ text, onClick, type, name }) => {
  return (
    <button className={styles.mybtn} name={name} onClick={onClick} type={type}>{text}</button>
  )
}

export default MyButton
