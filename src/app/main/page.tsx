'use client'


import { FC, useState, useEffect } from 'react'
import { DndContext, useSensors, useSensor, PointerSensor, KeyboardSensor, closestCenter } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { restrictToVerticalAxis, restrictToWindowEdges } from '@dnd-kit/modifiers';

//

import { Container, Row, Col } from 'react-bootstrap'

// types

import { BoardType, CardType } from '@/types/type'

// components

import Board from '@/components/Boards/Board'


const page = () => {


  const [cards, setCards] = useState<CardType[]>([])

  //

  useEffect(() => {
    getCards()
  }, [])





  const getCards = async (): Promise<CardType[]> => {
    try {
      const responce = await fetch('/api/cards', {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })

      const data = await responce.json()
      setCards(data)
      return data

    } catch (error: Error | any) {
      console.log(error.message)
      return []

    }
  }


  const boardArr: BoardType[] = [
    {
      title: 'Входящие',
      label: 'inbox',
      color: '#679CAB'
    },

    {
      title: 'Согласовано',
      label: 'agreed',
      color: '#6CAB67'
    },

    {
      title: 'Отклонено',
      label: 'rejected',
      color: '#AB6767'
    },

    {
      title: 'Согласовано с замечаниями',
      label: 'Agreed with comments',
      color: '#AB8767'
    },



  ]



  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )


  const handleDragEnd = (event: any) => {
    const {active, over} = event

    if(!over) return

    const activeId = active.id
    const overId = over?.id

    if(activeId === overId) return

    const activeCard = cards.find((item: CardType) => item.id == active.id);
    const overCard = cards.find((item: CardType) => item.id == over.id);


    if(!activeCard || !overCard) return

    if (activeCard.status !== overCard.status) {
      setCards(cards.map((card: CardType) => {
        if(card.id === activeId) {
          return {...card, status: overCard.status}
        }

        return card
      }))

      return
    }

    //

    setCards((items: CardType | any) => {
      const oldIndex = items.findIndex((item: any) => item.id == active.id)
      const newIndex = items.findIndex((item: any) => item.id == over.id)

      return arrayMove(items, oldIndex, newIndex);
    })

  }

  const handleDragOver = (event: any) => {
    const { active, over } = event;

    if(!over) return;

    const activeId = active.id;
    const overId = over.id;

    if(activeId === overId) return;

    console.log(over.data.current?.type)
    const isOverAColumn = over.data.current?.type === 'column';

    if(isOverAColumn) {
      const activeTask = cards.find((item: CardType) => item.id === activeId);
      const overColumnId = over.id;

      console.log(activeTask)
      console.log(overColumnId)


      if(!activeTask || activeTask.status === overColumnId) return;

      setCards(cards.map((card: CardType) => {
        if(card.id === activeId) {
          return {...card, status: overColumnId}
        }

        return card
      }))
      return
    }

  }



  return (
    <Container fluid>
      <Row>


        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>

            <Col className='d-flex justify-content-center'>

              {boardArr.map((item: BoardType, index: number): React.ReactNode => {
                return <Board key={index+1} boardArr={item} card={{cards, setCards}}/>
              })}

            </Col>

        </DndContext>

      </Row>
    </Container>
  )
}

export default page