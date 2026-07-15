-- AlterTable
ALTER TABLE "CompanyInquiry" ADD COLUMN     "accommodation" TEXT,
ADD COLUMN     "city" TEXT,
ADD COLUMN     "commuteMinutes" TEXT,
ADD COLUMN     "rentWarm" TEXT,
ADD COLUMN     "roomType" TEXT,
ADD COLUMN     "startDate" TEXT,
ALTER COLUMN "headcount" SET DATA TYPE TEXT,
ALTER COLUMN "message" DROP NOT NULL;

-- CreateTable
CREATE TABLE "InquiryPhoto" (
    "id" TEXT NOT NULL,
    "inquiryId" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "storedName" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InquiryPhoto_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InquiryPhoto_inquiryId_idx" ON "InquiryPhoto"("inquiryId");

-- AddForeignKey
ALTER TABLE "InquiryPhoto" ADD CONSTRAINT "InquiryPhoto_inquiryId_fkey" FOREIGN KEY ("inquiryId") REFERENCES "CompanyInquiry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
