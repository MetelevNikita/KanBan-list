import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";


//

import { CardType } from "@/types/type";

//



const pathToFile = path.join(process.cwd(), "/src/database/cards/db.json");



export const PUT = async (request: Request, context: any) => {
  try {

    const db = fs.readFileSync(pathToFile, "utf-8");
    const dbData: {cards: CardType[]} = JSON.parse(db)
    const { id } = await context.params;
    const data = await request.json();

    if (!data) {
      throw new Error("No data");
    }


    const commentToCard = dbData.cards.find((comment: CardType) => comment.id === id);

    if(!commentToCard) {
      return NextResponse.json({ error: "Card not found" }, { status: 404 });
    }

    commentToCard.comment.push(data)

    const newDatabase = dbData.cards.filter((item: CardType) => item.id !== id)
    newDatabase.push(commentToCard)

    fs.writeFileSync(pathToFile, JSON.stringify({ cards: newDatabase }, null, 3));


    return NextResponse.json({ commentToCard }, { status: 200 });


  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}





export const DELETE = async (request: Request, context: { params: { id: string } }) => {
  try {

    const { id } = context.params;

    const db = fs.readFileSync(pathToFile, "utf-8");
    const dbData = JSON.parse(db);



    return NextResponse.json({ message: `Карточка удалена ${id}` }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Ошибка удаления комментария" }, { status: 500 });
  }
}

