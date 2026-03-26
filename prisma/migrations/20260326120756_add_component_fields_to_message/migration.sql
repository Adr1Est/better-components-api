-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "componentCode" TEXT,
ADD COLUMN     "dependencies" JSONB;
