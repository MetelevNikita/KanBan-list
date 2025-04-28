import { NextResponse } from 'next/server';

//

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// types

import { CommentCardTypes } from '@/types/type';

//


export const GET = async (req: Request) => {
  try {

    const comment = await prisma.comments.findMany();

    return NextResponse.json(comment, { status: 200 });

  } catch (error: Error | any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}