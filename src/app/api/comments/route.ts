import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";



//

const pathToFile = path.join(process.cwd(), "src/database/cards/db.json");


export const DELETE = async (request: Request, context: { params: { id: string } }) => {
  try {

    const { id } = context.params;

    const db = fs.readFileSync(pathToFile, "utf-8");
    const dbData = JSON.parse(db);

    const newDB = dbData.cards.filter((card: any, index: number) => index+1 !== parseInt(id));
    fs.writeFileSync(pathToFile, JSON.stringify({ cards: newDB }, null, 3));

    return NextResponse.json({ message: `Карточка удалена ${id}` }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ message: "Ошибка удаления комментария" }, { status: 500 });
  }
}

