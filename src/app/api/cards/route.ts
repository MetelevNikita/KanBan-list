import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// prisma

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// types

import { CardType } from "@/types/type";

//


export const GET = async (): Promise<NextResponse<CardType[] | unknown> | NextResponse<{ message: string, status: number}>>   => {
  try {

    const cards = await prisma.card.findMany()

    if (cards.length < 1) return NextResponse.json([])
    if(!cards) return NextResponse.json({ message: 'Список карточек пуст', status: 200 })

    return NextResponse.json(cards)

  } catch (error: Error | any) {
    return new NextResponse(`Ошибка получения карточек ${error.message}`, {status: 500 })
  }
}



// POST

export const POST = async (resquest: Request): Promise<NextResponse<CardType[] | unknown> | NextResponse<{ message: string, status: number}>>=> {
  try {


    const newCard = await resquest.json()
    const cards = await prisma.$transaction(async (tx) => {
      const currentCards = await tx.card.findMany()

      tx.card.deleteMany({
        where: {NOT: {id: {in: newCard.id}}}
      })

      for (const card of newCard) {
        await tx.card.upsert({
          where: { id: card.id },
          update: card,
          create: card
        })
      }

    })

    return NextResponse.json({ message: 'Порядок карточек успешно изменен' }, { status: 200 })

  } catch (error: Error | any) {
    return new NextResponse(`Ошибка добавления новой карточки ${error.message}`, {status: 500 })
  }
}


