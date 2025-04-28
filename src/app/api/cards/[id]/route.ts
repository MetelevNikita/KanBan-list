import { NextResponse } from "next/server";

// prisma

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


// types

import { CardType, UsersType } from "@/types/type";

//





// GET

export const GET = async (request: Request, context: {params: {id: string}}): Promise<NextResponse<CardType | {message: string}>> => {

  try {




    const { id } = await context.params

    const singleCard: CardType | any = await prisma.card.findUnique({
      where: {
        id: parseInt(id)
      },
      include: {
        comment: true
      }
    })






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

    const { id } = await context.params


    if(!id) {
      return NextResponse.json({message: `Ошибка удаления карточки - нет Id c таким номером`}, {status: 404})
    }

    const deleteCard = await prisma.card.delete({
      where: {id: parseInt(id)}
    })

    console.log(deleteCard)

   return NextResponse.json({message: `Карточка удалена`}, {status: 200})

  } catch (error: Error | any) {

    return NextResponse.json({message: `Ошибка удаления карточки ${error.message}`}, {status: 500})

  }

}


// PUT


export const PUT = async (request: Request, context: any) => {
  try {



    const { id } = await context.params
    console.log(id)
    const body = await request.json()
    console.log(body)


    // const newCard = await prisma.card.update({
    //   where: {id: parseInt(id)},
    //   data: {status: }
    // })



    return NextResponse.json({ message: `Карточка изменена ${body}` }, { status: 200 })


  } catch (error: Error | any) {
    return NextResponse.json({ message: `Ошибка изменения карточки ${error.message}`, status: 500 })
  }
}