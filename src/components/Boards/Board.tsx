'use client'


import { FC, useState } from "react"
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"


// type

import { CardType, BoardType } from "@/types/type"

// css

import styles from '@/components/Boards/Board.module.css'


// components

import Card from "@/components/Cards/Card"


interface BoardProps {
  boardArr: BoardType
  card: any
  deleteCardHandler: (id: string | number) => void
  idCard: any
}

const Board: FC<BoardProps> = ({ boardArr, card, deleteCardHandler, idCard }) => {


  const { setNodeRef, isOver } = useDroppable({
    id: boardArr.label,
  })





  return (
    <div className={styles.board_container} ref={setNodeRef}>

      <div className={styles.board_title} style={{backgroundColor: `${boardArr.color}`}}>{boardArr.title}

      </div>

      <div className={styles.board_content}>


          <SortableContext items={card.map((item: CardType) => item.id)}>

              {card.filter((item: CardType): Boolean => {
                return item.status === boardArr.label
              }).map((item: CardType, index: number): React.ReactNode => {

                return <Card key={index} card={item} deleteCardHandler={deleteCardHandler} idCard={idCard}/>
              })}

          </SortableContext>

      </div>


    </div>
  )
}

export default Board