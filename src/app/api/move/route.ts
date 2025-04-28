import { NextResponse } from "next/server"

//

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient()

// type

import { CardType } from '../../../types/type'

// 


export const POST = async (resquest: Request): Promise<NextResponse<CardType[] | unknown> | NextResponse<{ message: string, status: number}>>=> {
  try {


    const newCard = await resquest.json()
    const cards = await prisma.$transaction(async (tx) => {
      const currentCards = await tx.card.findMany()

      tx.card.deleteMany({
        where: {NOT: {id: { notIn: newCard.map((card: CardType) => card.id)}}}
      })

      const results = await Promise.all(
        newCard.map((card: CardType | any) =>
          tx.card.upsert({
            where: { id: card.id },
            update: card,
            create: card
          })
        )
      );
      return results;
    })

    return NextResponse.json({ message: 'Порядок карточек успешно изменен' }, { status: 200 })

  } catch (error: Error | any) {
    return new NextResponse(`Ошибка добавления новой карточки ${error.message}`, {status: 500 })
  }
}






