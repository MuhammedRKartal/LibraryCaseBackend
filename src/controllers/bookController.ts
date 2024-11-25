import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await prisma.book.findMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch books" });
  }
};

export const getBookDetails = async (req: Request, res: Response) => {
  const bookId = parseInt(req.params.id);

  try {
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        borrows: {
          include: { member: true },
        },
      },
    });

    if (!book) {
      res.status(404).json({ error: "Book not found" });
      return;
    }

    const currentOwner =
      book.borrows.find((borrow) => !borrow.returned)?.member || null;

    res.json({
      id: book.id,
      name: book.name,
      author: book.author,
      publisher: book.publisher,
      publishYear: book.publishYear,
      rating: book.rating,
      currentOwner,
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch book details" });
  }
};
