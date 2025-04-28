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

export const POST = async (request: Request): Promise<NextResponse<CardType[] | unknown> | NextResponse<{ message: string, status: number}>>=> {
  try {



    const { title, name, phone, tgid, typeproduct, otherproduct, promotion, typework, target, viewer, effect, description, voiceover, timing, place, technicalspecification, deadline, prioryty, status, comment  } = await request.json()



    await prisma.card.create({
      data: {
        title,
        name,
        phone,
        tgid,
        typeproduct,
        otherproduct,
        promotion,
        typework,
        target,
        viewer,
        effect,
        description,
        voiceover,
        timing,
        place,
        technicalspecification,
        deadline,
        prioryty,
        status,
        comment
      }
    })




    return NextResponse.json({ message: 'Карточка добавлена' }, { status: 200 })

  } catch (error: Error | any) {
    return new NextResponse(`Ошибка добавления новой карточки ${error.message}`, {status: 500 })
  }
}


