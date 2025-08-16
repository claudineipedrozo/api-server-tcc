-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Coleta" (
    "id" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "local" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pendente',
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Coleta_pkey" PRIMARY KEY ("id")
);
