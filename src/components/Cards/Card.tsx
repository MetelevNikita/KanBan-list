'use client'

import { FC, useState } from 'react'
import Image from 'next/image'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// img

import agreetIcon from '@/asset/card/agreet.svg'
import rejectedIcon from '@/asset/card/rejected.svg'
import commentIcon from '@/asset/card/comments.svg'
import timeIcon from '@/asset/card/deadline.svg'
import deleteIcon from '@/asset/card/delete.svg'

// css

import styles from '@/components/Cards/Card.module.css'

// components

import CardButton from '@/components/UI/Card_Button/CardButton'

// types

import { CardType } from '@/types/type'

interface CardProps {
  card: CardType
  deleteCardHandler: (id: string) => void
  idCard: any
}

const Card: FC<CardProps> = ({ card, deleteCardHandler, idCard }) => {


  const {activeId, setActiveId} = idCard


  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({id: card.id})


  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    border: isDragging ? '3px solid white' : '3px solid transparent'
  };


  const shortDescription = card.description.length > 100 ? `${card.description.slice(0, 100)}...` : card.description
  const date = new Date(card.dateCreated).toLocaleDateString()








  return (

    <div className={styles.card_container} ref={setNodeRef} style={style} {...attributes}>

        <div className={styles.card_box} {...listeners}>

          <div>

              <div className={styles.card_theme_box}>
                <div className={styles.card_title}>{card.title}</div>
                <div className={styles.card_date_create}>{date}</div>
              </div>


              <div className={styles.card_description}>{shortDescription}</div>

          </div>


          <hr className={styles.card_line}/>

        </div>


        <div>

        <div className={`${styles.card_info_container} ${styles.card_box}`}>

            {
              (card.status === 'agreed') && <div className={styles.card_info_box}><Image src={agreetIcon} alt="Agreet Icon" /><div className={styles.card_info_text}>Согласовано</div></div>
            }

            {
              (card.status === 'rejected') && <div className={styles.card_info_box}><Image src={rejectedIcon} alt="Rejected Icon" /><div className={styles.card_info_text}>Отказано</div></div>
            }

            {
              (card.status === 'Agreed with comments') && <div className={styles.card_info_box}><Image src={commentIcon} alt="Rejected Icon" /><div className={styles.card_info_text}>Замечания</div></div>
            }



            <div className={styles.card_info_box}>
              <Image src={timeIcon} alt="Agreet Icon" />
              <div className={styles.card_info_text}>02.02.2025</div>
            </div>

            <div className={styles.card_info_box}>
              <Image src={deleteIcon} alt="Delete Icon" onClick={(e) => {
                e.stopPropagation()
                deleteCardHandler(card.id.toString())
                }
                }/>
            </div>

        </div>



        <div className={styles.card_button_container}>

                <CardButton type={'button'} text={'открыть'}  onClick={() => {setActiveId(card.id)}}/>
                <CardButton type={'button'} text={'открыть'}  onClick={() => {console.log('открыть')}}/>
        </div>



        </div>





    </div>
  )
}

export default Card