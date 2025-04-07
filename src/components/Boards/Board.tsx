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
  card: {cards: CardType[], setCards: any}
}

const Board: FC<BoardProps> = ({ boardArr, card }) => {


  const {cards, setCards} = card




  return (
    <div className={styles.board_container}>

      <div className={styles.board_title} style={{backgroundColor: `${boardArr.color}`}}>{boardArr.title}

      </div>

      <div className={styles.board_content}>


          <SortableContext items={cards.map((item) => item.id)} strategy={verticalListSortingStrategy}>

              {cards.filter((item): Boolean => {
                return item.status === boardArr.label
              }).map((item, index): React.ReactNode => {

                return <Card key={index} card={item}/>
              })}

          </SortableContext>

      </div>
    </div>
  )
}

export default Board