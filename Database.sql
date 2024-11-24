-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "publishYear" TEXT NOT NULL,
    "publisher" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BorrowRecord" (
    "id" SERIAL NOT NULL,
    "memberId" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,
    "returned" BOOLEAN NOT NULL DEFAULT false,
    "borrowedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "returnedAt" TIMESTAMP(3),
    "rating" DOUBLE PRECISION,

    CONSTRAINT "BorrowRecord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BorrowRecord" ADD CONSTRAINT "BorrowRecord_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "Member"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BorrowRecord" ADD CONSTRAINT "BorrowRecord_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO "Member" (name, age, gender, country) VALUES
('Muhammed Kartal', 25, 'Male', 'Turkey'),
('Behice Tasci', 22, 'Female', 'Turkey'),
('Pasa Mandilik', 4, 'Bird', 'Africa');

INSERT INTO "Book" (name, author, "publishYear", publisher) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', '2021', 'Random'),
('1984', 'George Orwell', '2022', 'Random'),
('To Kill a Mockingbird', 'Harper Lee', '2019', 'Random'),
('Birbs', 'M. Kartal', '2024', 'Eel');

-- Example of borrow_records
INSERT INTO "BorrowRecord" ("memberId", "bookId", "borrowedAt") VALUES
(1, 1, '2024-01-01'),
(2, 2, '2024-02-01'),
(1, 3, '2024-03-01');

