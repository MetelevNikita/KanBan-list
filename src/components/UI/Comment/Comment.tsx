import { FC } from 'react'

// css

import styles from '@/components/UI/Comment/Comment.module.css'

// components

import CardButton from '@/components/UI/Card_Button/CardButton'

interface CommentProps {
  author: string
  date: string
  comment: string;
  number: number
 }

const Comment: FC<CommentProps> = ({ author, date, comment, number}) => {
  return (
    <div className={styles.comment_container}>

      <div className={styles.comment_box}>
        <div className={styles.comment_number}>{number}</div>
        <div className={styles.comment_author}>{author}</div>
        <div className={styles.comment_date}>{date}</div>
      </div>


      <hr className={styles.comment_line}/>


      <div className={styles.comment_text}>{comment}</div>
      <CardButton type={'button'} text={'Удалить'} onClick={() => {console.log('asd')}}/>



    </div>
  )
}

export default Comment
