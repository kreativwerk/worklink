-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('NEU', 'ZAV_ANFRAGE', 'VORABZUSTIMMUNG', 'VERTRAG_EZB', 'ONBOARDED', 'SCHEDULED_TRAINING', 'EINGESTELLT', 'REJECTED');

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'NEU',
    "lang" TEXT,
    "employment" TEXT,
    "truckLicense" TEXT,
    "field" TEXT,
    "amazonExperience" TEXT,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dob" TEXT,
    "placeOfBirth" TEXT,
    "nationality" TEXT,
    "countryOfBirth" TEXT,
    "street" TEXT,
    "postalCode" TEXT,
    "city" TEXT,
    "livingSince" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "tshirtSize" TEXT,
    "shoeSize" TEXT,
    "dsgvoConsent" BOOLEAN NOT NULL DEFAULT false,
    "dsgvoConsentAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" TEXT NOT NULL,
    "applicationId" TEXT NOT NULL,
    "slot" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "storedName" TEXT NOT NULL,
    "mime" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanyInquiry" (
    "id" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "industry" TEXT NOT NULL,
    "headcount" INTEGER,
    "message" TEXT NOT NULL,
    "handled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CompanyInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Application_status_idx" ON "Application"("status");

-- CreateIndex
CREATE INDEX "Application_createdAt_idx" ON "Application"("createdAt");

-- CreateIndex
CREATE INDEX "Document_applicationId_idx" ON "Document"("applicationId");

-- CreateIndex
CREATE INDEX "CompanyInquiry_createdAt_idx" ON "CompanyInquiry"("createdAt");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_applicationId_fkey" FOREIGN KEY ("applicationId") REFERENCES "Application"("id") ON DELETE CASCADE ON UPDATE CASCADE;
