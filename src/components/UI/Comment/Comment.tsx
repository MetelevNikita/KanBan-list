import { FC } from 'react'

// css

import styles from '@/components/UI/Comment/Comment.module.css'

// components

import CardButton from '@/components/UI/Card_Button/CardButton'

// types

import { CommentCardTypes } from '@/types/type'

interface CommentProps {
  comment: CommentCardTypes
  author: string | null
  deleteHandler: any
 }

const Comment: FC<CommentProps> = ({ comment, author, deleteHandler}) => {
  return (
    <div className={styles.comment_container}>

      <div className={styles.comment_box}>
        <div className={styles.comment_number}>{comment.id}</div>
        <div className={styles.comment_author}>{author}</div>
        <div className={styles.comment_date}>{comment.date}</div>
      </div>


      <hr className={styles.comment_line}/>

      <div className={styles.comment_text}>{comment.text}</div>
      <CardButton type={'button'} text={'Удалить'} onClick={() => {deleteHandler(comment.id)}}/>



    </div>
  )
}

export default Comment
