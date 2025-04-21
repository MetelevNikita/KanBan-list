import { NextResponse } from "next/server";
import fs from 'fs'
import path from 'path'

// database

import db from '@/database/cards/db.json'

// types

import { CardType, UsersType } from "@/types/type";

//


const pathToFile = path.join(process.cwd(), `src/database/cards/db.json`)


// GET

export const GET = async (request: Request, context: {params: {id: string}}): Promise<NextResponse<CardType | {message: string}>> => {

  try {

    const { id } = await context.params

    console.log(id)
    console.log(db)


    const singleCard = db.cards.find((card: CardType) => card.id === id)
    console.log(singleCard)

    if (!singleCard) {
      return NextResponse.json({message: `Карточка не найдена`}, {status: 404})
    }
    return NextResponse.json(singleCard, {status: 200})

  } catch (error: Error | any) {

    return NextResponse.json({message: `Ошибка получения карточки ${error.message}`}, {status: 500})
  }
}


// DELETE


export const DELETE = async (request: Request, context: {params: {id: string}}): Promise<NextResponse<{message: string}>> => {
  try {
   const cards: CardType[] = db.cards
   const { id } = await context.params
   const filteredCards = cards.filter((card: CardType) => card.id !== id)

   fs.writeFileSync(pathToFile, JSON.stringify({cards: filteredCards}, null, 3))

   return await NextResponse.json({message: `Карточка удалена`}, {status: 200})

  } catch (error: Error | any) {

    return NextResponse.json({message: `Ошибка удаления карточки ${error.message}`}, {status: 500})

  }

}


// PUT


export const PUT = async (request: Request, context: any) => {
  try {


    const { id } = await context.params

    const currentCard: CardType | any = db.cards.find((card: CardType) => card.id === id)


    if(!currentCard) {
      return NextResponse.json({message: `Карточка не найдена`}, {status: 404})
    }


    console.log(currentCard.comment)

    const body = await request.json()
    currentCard.comment.push(body)

    const filteredCards = db.cards.filter((card: CardType) => card.id !== id)

    filteredCards.push(currentCard)
    fs.writeFileSync(pathToFile, JSON.stringify({cards: filteredCards}, null, 3))

    return NextResponse.json({ message: `Карточка изменена ${body}` }, { status: 200 })


  } catch (error: Error | any) {
    return NextResponse.json({ message: `Ошибка изменения карточки ${error.message}`, status: 500 })
  }
}