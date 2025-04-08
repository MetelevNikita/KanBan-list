'use client'


import { FC, useState, useEffect } from 'react'
import { DndContext, useSensors, useSensor, PointerSensor, KeyboardSensor, closestCenter, DragOverlay } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { restrictToWindowEdges, restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers';

//

import { Container, Row, Col } from 'react-bootstrap'

// types

import { BoardType, CardType } from '@/types/type'

// components

import Board from '@/components/Boards/Board'
import Card from '@/components/Cards/Card'


const page = () => {


  const [cards, setCards] = useState<CardType[]>([])
  const [activeCard, setActiveCard] = useState<CardType | any>()

  //

  useEffect(() => {
    getCards()
  }, [])


  useEffect(() => {
    postCards(cards)
  }, [cards])



  // api

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

  const postCards = async (cards: CardType[]): Promise<void> => {


    try {
      const responce = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(cards)
      })

      const data = await responce.json()
      return data
    } catch (error : Error | any) {
      console.log(`Ошибка сохранения карточек: ${error.message}`)
      return

    }
  }


  const deleteCard = async (id: string | number) => {
    try {

      const responce = await fetch(`/api/cards/${id}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json'
        }
      })

      const data = await responce.json()

      console.log(id)
      const cardsAfterDelete = cards.filter((item: CardType) => Number(item.id) !== Number(id))
      console.log(cardsAfterDelete)
      setCards(cardsAfterDelete)

    } catch (error: Error | any ) {
      console.log(`Ошибка удления карточки: ${error.message}`)
      return
    }
  }


  // DND



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


  const handleDragStart = (event: any) => {
    const {active} = event
    const card = cards.find((item: CardType) => item.id == active.id)
    setActiveCard(card)
  }


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
    }

    //

    setCards((items: CardType | any) => {
      const oldIndex = items.findIndex((item: any) => item.id == active.id)
      const newIndex = items.findIndex((item: any) => item.id == over.id)

      console.log(oldIndex, newIndex)

      return arrayMove(items, oldIndex, newIndex);
    })

  }

  const handleDragOver = (event: any) => {
    const { active, over } = event;

    if(!over) return;

    const activeId = active.id;
    const overId = over.id;

    if(activeId === overId) return;

    const isOverAColumn = boardArr.some((item: BoardType) => item.label === overId)

    if(isOverAColumn) {
      const activeTask = cards.find((item: CardType) => item.id === activeId);
      const overColumnId = over.id;


      if(!activeTask || activeTask.status === overColumnId) return;

      setCards(cards.map((card: CardType) => {
        if(card.id === activeId) {
          return {...card, status: overColumnId}
        }

        return card
      }))

    }
    return
  }





  return (
    <Container fluid>
      <Row>


        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragStart={handleDragStart}>

            <Col className='d-flex justify-content-center'>

              {boardArr.map((item: BoardType, index: number): React.ReactNode => {
                return <Board key={index+1} boardArr={item} card={cards.filter((card: CardType) => card.status === item.label)} deleteCardHandler={deleteCard} />
              })}

            </Col>


            <DragOverlay>

              {activeCard ? <Card card={activeCard} deleteCardHandler={deleteCard}/> : null}

            </DragOverlay>



        </DndContext>

      </Row>
    </Container>
  )
}

export default page