BEGIN;

-- Add citext extension
CREATE EXTENSION IF NOT EXISTS citext;

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL DEFAULT gen_random_uuid (),
    "name" VARCHAR(100) NOT NULL,
    "email" CITEXT NOT NULL,
    "password_hash" TEXT,
    "is_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "last_sign_in_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users" ("uuid");

-- CreateIndex
CREATE INDEX "activeUser" ON "users" ("is_deleted", "is_confirmed");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users" ("email");

COMMIT;
