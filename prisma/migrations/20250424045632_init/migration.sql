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
    "comment" TEXT NOT NULL,

    CONSTRAINT "card_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);
