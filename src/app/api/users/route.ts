import { NextResponse } from "next/server";

// db

import db from '@/database/users/db.json'

//

import { UsersType } from "@/types/type";




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