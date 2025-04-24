import { NextResponse } from "next/server";

// prisma

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//

import { UsersType } from "@/types/type";

//


export const GET = async (): Promise<NextResponse<UsersType[] | unknown> | NextResponse<{ message: string, status: number}>>  => {
  try {

    const users: UsersType[] = await prisma.user.findMany()

    if (!users) return NextResponse.json({message: "Пользователи не найдены", status: 404})
    if (!users.length) return NextResponse.json({message: "Списоак пользователей пуст", status: 404})

    return NextResponse.json(users, {status: 200})


  } catch (error: Error | any) {
    return new NextResponse(`Ошибка получения пользователей: ${error.message}`)

  }
}
