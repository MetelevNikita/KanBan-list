import { FC } from "react"

// type

import { CardType, BoardType } from "@/types/type"

// css

import styles from '@/components/Boards/Board.module.css'


// components

import Card from "@/components/Cards/Card"


interface BoardProps {
  boardArr: BoardType
  cards: CardType[]
}

const Board: FC<BoardProps> = ({ boardArr, cards }) => {
  return (
    <div className={styles.board_container}>

      <div className={styles.board_title} style={{backgroundColor: `${boardArr.color}`}}>{boardArr.title}

      </div>

      <div className={styles.board_content}>


        {cards.filter((status): Boolean => {
          return status.status === boardArr.label
        }).map((item, index): React.ReactNode => {
          return <Card />
        })}

      </div>

    </div>
  )
}

export default Board