import { NextResponse } from "next/server"

// prisma

import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

// types

import { UsersType } from "@/types/type"


export const GET = async (request: Request, context: any) => {
  try {
    const { id } = await context.params
    const user: UsersType | null = await prisma.user.findUnique({where: {id: parseInt(id)}})

    if(!user) return NextResponse.json({message: 'Пользователь не найден'}, {status: 404})

    return NextResponse.json({message: 'Пользователь найден', user: user.username}, {status: 200})

  } catch (error: Error | any) {

    return NextResponse.json({message: `Ошибка ${error.message}`}, {status: 500})

  }
}