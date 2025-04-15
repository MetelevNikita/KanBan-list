import { FC } from "react"

// css

import styles from '@/components/UI/Card_Button/CardButton.module.css'

interface CardButtonProps {
  type: 'button' | 'submit' | 'reset'
  text: string
  onClick?: () => void

}

const CardButton:FC<CardButtonProps>  = ({ type, text, onClick }) => {
  return (
    <button className={styles.card_button} type={type} onClick={onClick}>{text}</button>
  )
}

export default CardButton
