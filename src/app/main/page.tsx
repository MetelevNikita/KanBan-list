'use client'


import { FC, useState, useEffect } from 'react'

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



  return (
    <Container fluid>
      <Row>

        <Col className='d-flex justify-content-center'>

          {boardArr.map((item: BoardType, index: number): React.ReactNode => {
            return <Board key={index+1} boardArr={item} card={{cards, setCards}}/>
          })}

        </Col>

      </Row>
    </Container>
  )
}

export default page