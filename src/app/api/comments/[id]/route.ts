import { NextResponse } from "next/server";

//

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

//

import { CardType } from "@/types/type";


export const POST = async (req: Request, context: any) => {
  try {


    const { id } = await context.params;
    console.log(id)
    const body = await req.json();
    console.log(body)


    await prisma.card.update({
      where: { id: parseInt(id) },
      data: {
        comment: {create: {
          text: body
        }}
      }
    })


    return NextResponse.json({ msg: `update user ${id}` }, { status: 200 });

  } catch (error: Error | any) {

    return NextResponse.json({ error: error.message }, { status: 500 });

  }
}