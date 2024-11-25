import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import logger from "../logger";

export const returnBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const memberId = parseInt(req.params.memberId);
  const bookId = parseInt(req.params.bookId);
  const { rating } = req.body;

  try {
    const borrow = await prisma.borrowRecord.findFirst({
      where: {
        memberId: memberId,
        bookId: bookId,
        returned: false,
      },
    });

    if (!borrow) {
      const error = new Error(
        `Member doesn't have the book with ${bookId} ID.`
      );
      (error as any).statusCode = 404;
      throw error;
    }

    const returned = await prisma.borrowRecord.update({
      where: {
        id: borrow.id,
      },
      data: { returned: true, returnedAt: new Date(), rating: rating },
    });

    if (!returned) {
      const error = new Error(
        `Member couldn't returned the book ${bookId} ID.`
      );
      (error as any).statusCode = 404;

      throw error;
    }

    logger.info(
      `Member ${returned.memberId} ID successfully returned the book ${returned.bookId} ID.`
    );

    const ratings = await prisma.borrowRecord.findMany({
      where: { bookId: borrow.bookId, rating: { not: null } },
    });

    if (!ratings) {
      const error = new Error(
        `Server couldn't calculate the previous ratings of book ${bookId} ID.`
      );
      (error as any).statusCode = 404;

      throw error;
    }

    const score = (
      ratings.reduce((sum: any, r: any) => sum + (r.rating ?? 0), 0) /
      ratings.length
    ).toFixed(2);

    const updatedBook = await prisma.book.update({
      where: { id: returned.bookId },
      data: { rating: parseFloat(score) },
    });

    if (!updatedBook) {
      const error = new Error(
        `Server couldn't update the rating of the book ${bookId} ID.`
      );
      (error as any).statusCode = 404;

      throw error;
    }

    logger.info(
      `Server succesfully updated the rating of the book ${bookId} ID.`
    );

    res.status(200).json(returned);
  } catch (error) {
    next(error);
  }
};

export const borrowBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const memberId = parseInt(req.params.memberId);
  const bookId = parseInt(req.params.bookId);

  try {
    const alreadyBorrowed = await prisma.borrowRecord.findFirst({
      where: {
        bookId: bookId,
        returned: false,
      },
    });

    if (!alreadyBorrowed) {
      const borrow = await prisma.borrowRecord.create({
        data: { memberId, bookId },
      });

      logger.info(
        `Book with ${bookId} ID is borrowed successfully by ${memberId}.`
      );

      res.json(borrow);
    } else {
      const error = new Error(
        `Book with ${bookId} ID is already has an owner.`
      );
      (error as any).statusCode = 404;

      throw error;
    }
  } catch (error) {
    next(error);
  }
};
