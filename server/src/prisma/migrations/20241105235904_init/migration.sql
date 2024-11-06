-- DropForeignKey
ALTER TABLE "Quest" DROP CONSTRAINT "Quest_bountyTargetId_fkey";

-- AlterTable
ALTER TABLE "Quest" ALTER COLUMN "bountyTargetId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Quest" ADD CONSTRAINT "Quest_bountyTargetId_fkey" FOREIGN KEY ("bountyTargetId") REFERENCES "Player"("id") ON DELETE SET NULL ON UPDATE CASCADE;
