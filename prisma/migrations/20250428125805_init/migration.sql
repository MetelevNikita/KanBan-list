-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "company" TEXT NOT NULL,
    "colorBoard" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "tgid" INTEGER NOT NULL,
    "typeproduct" TEXT NOT NULL,
    "otherproduct" TEXT NOT NULL,
    "promotion" TEXT NOT NULL,
    "typework" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "viewer" TEXT NOT NULL,
    "effect" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "voiceover" TEXT NOT NULL,
    "timing" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "technicalspecification" TEXT NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "prioryty" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "dateCreated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comments" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cardId" INTEGER NOT NULL,

    CONSTRAINT "comments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "card"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
