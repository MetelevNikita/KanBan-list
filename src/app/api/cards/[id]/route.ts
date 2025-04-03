import { NextResponse } from "next/server";
import fs from 'fs'
import path from 'path'

// database

import db from '@/database/db.json'

// types

import { CardType } from "@/types/type";

//


const pathToFile = path.join(process.cwd(), `src/database/db.json`)


// GET

export const GET = async (request: Request, context: {params: {id: string}}): Promise<NextResponse<CardType | {message: string}>> => {

  try {

    const cards: CardType[] = db.cards
    const { id } = await context.params


    const singleCard = cards.find((card: CardType) => card.id === parseInt(id))

    if (!singleCard) {
      return NextResponse.json({message: `Карточка не найдена`}, {status: 404})
    }
    return await NextResponse.json(singleCard, {status: 200})

  } catch (error: Error | any) {

    return await NextResponse.json({message: `Ошибка получения карточки ${error.message}`}, {status: 500})
  }
}


// DELETE


export const DELETE = async (request: Request, context: {params: {id: string}}): Promise<NextResponse<{message: string}>> => {
  try {
   const cards: CardType[] = db.cards
   const { id } = await context.params
   const filteredCards = cards.filter((card: CardType) => card.id !== parseInt(id))

   fs.writeFileSync(pathToFile, JSON.stringify({cards: filteredCards}, null, 3))

   return await NextResponse.json({message: `Карточка удалена`}, {status: 200})

  } catch (error: Error | any) {

    return NextResponse.json({message: `Ошибка удаления карточки ${error.message}`}, {status: 500})

  }

}