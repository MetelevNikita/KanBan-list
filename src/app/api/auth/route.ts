import { NextResponse} from 'next/server'
import jwt from 'jsonwebtoken'
import {cookies} from 'next/headers';
import bcrypt from 'bcryptjs'

// types

import { UsersType } from '@/types/type';

// prisma

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

//

import db from '@/database/users/db.json'



export const POST = async (request: Request,) => {
  try {

    const requestData = await request.json();
    const {email, password} = requestData;




    const user: UsersType | any = await prisma.user.findFirst({
      where: {email: email}
    })

    if(!user) {
      return NextResponse.json({message: 'Неправильно указан email'})
    }

    const passwordHash = bcrypt.compareSync(password, user.password);
    console.log(passwordHash)

    if(!passwordHash) {
      return NextResponse.json({message: 'Пароль неверный'})
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET as string, {expiresIn: '1h'});
    (await cookies()).set('token', token)


    return NextResponse.json({message: 'Вход выполнен успешно', id: user.id})


  } catch (error) {
    return NextResponse.json({message: 'error'})
  }
}
