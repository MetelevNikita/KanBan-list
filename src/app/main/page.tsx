'use client'


import { FC, useState, useEffect } from 'react'
import { DndContext, useSensors, useSensor, PointerSensor, KeyboardSensor, closestCenter, DragOverlay } from "@dnd-kit/core"
import { SortableContext, arrayMove, verticalListSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { restrictToWindowEdges, restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers';
import { motion, AnimatePresence } from "motion/react"

// css

import styles from '@/app/main/page.module.css'

//

import { Container, Row, Col } from 'react-bootstrap'

// types

import { BoardType, CardType, UsersType } from '@/types/type'

// components

import Board from '@/components/Boards/Board'
import Card from '@/components/Cards/Card'
import OpenCard from '@/components/OpenCard/OpenCard';



const page = () => {


  const [cards, setCards] = useState<CardType[]>([])
  const [users, setUsers] = useState<UsersType[]>([])
  const [currentUser, setCurrentUser] = useState<UsersType>()
  const [activeId, setActiveId] = useState<number | string>('')
  const [activeCard, setActiveCard] = useState<CardType | any>()

  //

  useEffect(() => {
    getCards()
    getUsers()
    getSingleUser()
  }, [])


  useEffect(() => {
    postCards(cards)
  }, [cards])



  // api cards

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


  // api users

  const getUsers = async (): Promise<UsersType[] | any> => {
    try {

      const responce = await fetch('/api/users', {
        method: "GET",
        headers: {
          'content-type': 'application/json'
        }
      })

      const data = await responce.json()
      setUsers(data)
      return data

    } catch (error: Error | any) {
      console.log(`Ошибка получения пользователей: ${error.message}`)
      return []
    }
  }


  const getSingleUser = async (): Promise<UsersType> => {

    try {
      const id = sessionStorage.getItem('userId')
      const userId = JSON.parse(id as string)

      const responce = await fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json'
        }
      })


      if(!responce.ok) {
        throw new Error('Пользователь не найден')
      }

      const data = await responce.json()
      setCurrentUser(data.user)
      return data

    } catch (error: Error | any) {
      console.log(`Ошибка получения пользователя: ${error.message}`)
    }

  }


  const newBoard = (users: UsersType[]) => {

    users.map((item) => {
      boardArr.push({
        title: `${item.name} ${item.lastname}`,
        label: item.username,
        color: item.colorBoard,
      })

    })
  }


  // DND



  let boardArr: BoardType[] = [
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

  newBoard(users)

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


  //




  const singleCard: CardType = cards.filter((item: CardType) => item.id === activeId)[0]






  return (
    <>
      <Row>


        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragStart={handleDragStart}>



            <Col md={12} className={styles.boards_container} >

              {boardArr.map((item: BoardType, index: number): React.ReactNode => {
                return <Col className={styles.boards_card} style={{width: '380px'}} md={3} key={index+1}><Board boardArr={item} card={cards.filter((card: CardType) => card.status === item.label)} deleteCardHandler={deleteCard} idCard={{activeId, setActiveId}}/></Col>
              })}

            </Col>


            <DragOverlay>

              {activeCard ? <Card card={activeCard} deleteCardHandler={deleteCard} idCard={{activeId, setActiveId}}/> : null}

            </DragOverlay>



        </DndContext>

      </Row>



      <Row>

        <Col className={styles.open_card_container} md={12}>

          <AnimatePresence initial={false}>

          {(activeId) ? <motion.div key={"box"} initial={{x: 300, y:-950}} animate={{x: 0, y:-950, transition: {duration: 0.3}}} exit={{x: 500, y:-950, transition: {duration: 0.3}}} ><OpenCard card={singleCard} id={{activeId, setActiveId}} deleteHandler={deleteCard} user={{currentUser, setCurrentUser}} /></motion.div> : null}

          </AnimatePresence>

        </Col>

      </Row>

  </>
  )
}

export default page