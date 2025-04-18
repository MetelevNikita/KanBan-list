import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// database

import db from '@/database/cards/db.json'

// types

import { CardType } from "@/types/type";

//

const pathToFile = path.join(process.cwd(), `src/database/cards/db.json`)


export const GET =  (): NextResponse<CardType[] | {message: string}>   => {
  try {

    const cards: CardType[] = db.cards

    if (cards.length < 1) return NextResponse.json([])
    if(!cards) return NextResponse.json({ message: 'No Cards' }, { status: 200 })

    return NextResponse.json(cards, { status: 200 })

  } catch (error: Error | any) {
    return NextResponse.json({ message: `Ошибка получения карточек ${error.message}`, status: 500 })
  }
}



// POST

export const POST = async (resquest: Request, context: any) => {
  try {

    const newCards = await resquest.json()
    fs.writeFileSync(pathToFile, JSON.stringify({cards: newCards}, null, 2))

    return NextResponse.json({ message: 'Порядок карточек успешно изменен' }, { status: 200 })


  } catch (error: Error | any) {
    return NextResponse.json({ message: `Ошибка добавления новой карточки ${error.message}`, status: 500 })
  }
}


export const PUT = async (request: Request, context: any) => {
  try {

    const body = await request.json()
    console.log(body)

    return NextResponse.json({ message: `Карточка изменена ${body}` }, { status: 200 })


  } catch (error: Error | any) {
    return NextResponse.json({ message: `Ошибка изменения карточки ${error.message}`, status: 500 })
  }
}