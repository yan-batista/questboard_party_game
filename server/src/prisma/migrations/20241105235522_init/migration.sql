/*
  Warnings:

  - You are about to drop the column `challengerId` on the `Quest` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `Quest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[bountyTargetId]` on the table `Quest` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bountyTargetId` to the `Quest` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_challengerId_fkey";

-- DropForeignKey
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_targetId_fkey";

-- AlterTable
ALTER TABLE "Quest" DROP COLUMN "challengerId",
DROP COLUMN "targetId",
ADD COLUMN     "bountyTargetId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_PlayerToQuest" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PlayerToQuest_AB_unique" ON "_PlayerToQuest"("A", "B");

-- CreateIndex
CREATE INDEX "_PlayerToQuest_B_index" ON "_PlayerToQuest"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Quest_bountyTargetId_key" ON "Quest"("bountyTargetId");

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_bountyTargetId_fkey" FOREIGN KEY ("bountyTargetId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToQuest" ADD CONSTRAINT "_PlayerToQuest_A_fkey" FOREIGN KEY ("A") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PlayerToQuest" ADD CONSTRAINT "_PlayerToQuest_B_fkey" FOREIGN KEY ("B") REFERENCES "Quest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
