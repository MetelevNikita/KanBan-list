import { NextResponse } from "next/server";
import path from 'path';
import fs from 'fs';

// db

import db from '@/database/users/db.json'

//

import { UsersType } from "@/types/type";

//


const pathToFile = path.join(process.cwd(), `src/database/users/db.json`)


export const GET = async () => {
  try {

    const users: UsersType[] = db.users

    if (!db) return NextResponse.json({message: "not found"}, {status: 404})
    if(db.users.length < 1) return NextResponse.json({message: "users list is empty"}, {status: 300})

    return await NextResponse.json(users, {status: 200})


  } catch (error: Error | any) {
    console.log(`[USERS_GET] Error: ${error.message}`);
    return new NextResponse(`Database error: ${error.message}`, {status: 500})

  }
}




export const POST = async (req: Request): Promise<NextResponse<UsersType[] | any>>  => {
  try {

    const body = await req.json()

    if (!body) return NextResponse.json({message: "Ошибка получения данных пользователя"}, {status: 400})
    const users = await db.users

    const newUser = {
      id: Number(users.length + 1).toString(),
      username: body.username,
      name: body.name,
      lastname: body.lastname,
      email: body.email,
      password: body.password,
      dateCreated: new Date().toString(),
      company: body.company,
      colorBoard: body.colorBoard,
      role: body.role
    }

    users.push(newUser)
    fs.writeFileSync(pathToFile, JSON.stringify(db, null, 2))

    return await NextResponse.json({message: 'Пользователь успешно создан'}, {status: 200})

  } catch (error: Error | any) {
    return NextResponse.json({message: `Ошибка создания пользователя: ${error.message}`}, {status: 500})
  }
}