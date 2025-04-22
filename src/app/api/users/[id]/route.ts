import { NextResponse } from "next/server"

//

import db from '@/database/users/db.json'

//

export const GET = async (request: Request, context: any) => {
  try {
    const { id } = await context.params
    if(!id) return NextResponse.json({message: 'No user id provided'}, {status: 400})

    const user = db.users.find((user: any) => user.id == id)

    if(!user) return NextResponse.json({message: 'User not found'}, {status: 404})

    return NextResponse.json({message: 'User found', user: user.username}, {status: 200})

  } catch (error: Error | any) {

    return NextResponse.json({message: 'Error'}, {status: 500})

  }
}