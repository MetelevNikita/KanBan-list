'use client'


import { FC, useState } from "react"
import { DndContext, useSensors, useSensor, PointerSensor, KeyboardSensor, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable"

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
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )



  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id);
  }




  const handleDragEnd = (event: any) => {
    const {active, over} = event

    if(over && active.id !== over.id) {

      // setCards((items: CardType | any) => {
      //   const oldIndex = items.findIndex((item: any) => item.id == active.id)
      //   const newIndex = items.findIndex((item: any) => item.id == over.id)

      //   return arrayMove(items, oldIndex, newIndex);
      // })



      setCards(() => cards.map((card) => card.id === active.id ? {...card, status: boardArr.label} : card))
    }
  }




  return (
    <div className={styles.board_container}>

      <div className={styles.board_title} style={{backgroundColor: `${boardArr.color}`}}>{boardArr.title}

      </div>

      <div className={styles.board_content}>


        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <SortableContext items={cards}>

            {cards.filter((item): Boolean => {
              return item.status === boardArr.label
            }).map((item, index): React.ReactNode => {

              return <Card key={index} card={item}/>
            })}

          </SortableContext>




        </DndContext>

      </div>

    </div>
  )
}

export default Board