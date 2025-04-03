import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// database

import db from '@/database/db.json'

// types

import { CardType } from "@/types/type";

//

const pathToFile = path.join(process.cwd(), `src/database/db.json`)


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

export const POST = () => {
  try {

    return NextResponse.json({ message: 'POST' }, { status: 200 })

  } catch (error: Error | any) {
    return NextResponse.json({ message: `Ошибка добавления новой карточки ${error.message}`, status: 500 })
  }
}