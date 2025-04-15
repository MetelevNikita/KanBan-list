import { FC, CSSProperties } from 'react'

// css

import styles from '@/components/UI/Button/Mybutton.module.css'


interface MyButtonProps {
  style?: CSSSProperties
  text: string
  onClick?: any
  type: 'button' | 'submit' | 'reset'
  name: string
}

const MyButton: FC<MyButtonProps> = ({ text, onClick, type, name, style }) => {
  return (
    <button style={style} className={styles.mybtn} name={name} onClick={onClick} type={type}>{text}</button>
  )
}

export default MyButton
