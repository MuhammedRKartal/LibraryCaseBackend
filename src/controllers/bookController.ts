import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import logger from "../logger";

export const getAllBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const books = await prisma.book.findMany();

    if (!books.length) {
      logger.info("No books found in the database.");
      res.status(200).json({ books });
      return;
    }

    logger.info(`Fetched ${books.length} book(s) successfully.`);
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      const error = new Error(`Book with ${bookId} ID isn't found.`);
      (error as any).statusCode = 404;
      throw error;
    }

    const currentOwner =
      book?.borrows.find((borrow) => !borrow.returned)?.member || null;

    logger.info(
      `Fetched ${bookId} successfully ${
        currentOwner ? `, the current owner is ${currentOwner}` : "."
      }`
    );

    res.status(200).json({
      id: book?.id,
      name: book?.name,
      author: book?.author,
      publisher: book?.publisher,
      publishYear: book?.publishYear,
      rating: book?.rating,
      currentOwner,
    });
  } catch (error) {
    next(error);
  }
};
