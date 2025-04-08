import { NextResponse } from "next/server";

// db

import db from '@/database/users/db.json'




export const GET = async () => {
  try {

    if (!db) return NextResponse.json({message: "not found"}, {status: 404})
    if(db.users.length < 1) return NextResponse.json({message: "users list is empty"}, {status: 300})

    return await NextResponse.json(db, {status: 200})


  } catch (error) {

  }
}