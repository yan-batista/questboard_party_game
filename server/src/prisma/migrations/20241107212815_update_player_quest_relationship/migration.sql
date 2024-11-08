/*
  Warnings:

  - You are about to drop the column `bountyTargetId` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the `_PlayerToQuest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_bountyTargetId_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerToQuest" DROP CONSTRAINT "_PlayerToQuest_A_fkey";

-- DropForeignKey
ALTER TABLE "_PlayerToQuest" DROP CONSTRAINT "_PlayerToQuest_B_fkey";

-- DropIndex
DROP INDEX "Quest_bountyTargetId_key";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "activeQuestId" INTEGER,
ALTER COLUMN "coins" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "bountyTargetId";

-- DropTable
DROP TABLE "_PlayerToQuest";

-- CreateTable
CREATE TABLE "Bounty" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "reward" INTEGER NOT NULL DEFAULT 0,
    "creatorId" INTEGER NOT NULL,
    "targetId" INTEGER NOT NULL,

    CONSTRAINT "Bounty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bounty_creatorId_key" ON "Bounty"("creatorId");

-- CreateIndex
CREATE UNIQUE INDEX "Bounty_targetId_key" ON "Bounty"("targetId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_activeQuestId_fkey" FOREIGN KEY ("activeQuestId") REFERENCES "Quest"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bounty" ADD CONSTRAINT "Bounty_targetId_fkey" FOREIGN KEY ("targetId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
