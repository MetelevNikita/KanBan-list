import { NextResponse} from 'next/server'
import jwt from 'jsonwebtoken'
import {cookies} from 'next/headers';


//

import db from '@/database/users/db.json'
import { redirect } from 'next/navigation';



export const POST = async (request: Request,) => {
  try {

    const requestData = await request.json();
    const {email, password} = requestData;

    const user = db.users.find(user => user.email === email && user.password === password);

    if(!user) {
      return NextResponse.json({message: 'Пользователь не найден'})
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET as string, {expiresIn: '1h'});
    (await cookies()).set('token', token)


    return NextResponse.json({message: 'success'})


  } catch (error) {
    return NextResponse.json({message: 'error'})
  }
}
