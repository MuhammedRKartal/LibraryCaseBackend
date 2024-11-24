import { Request, Response } from "express";
import prisma from "../prisma/client";

export const returnBook = async (req: Request, res: Response) => {
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
      res
        .status(404)
        .json({ error: "Book has not been borrowed or already returned." });
      return;
    }

    const returned = await prisma.borrowRecord.update({
      where: {
        id: borrow.id,
      },
      data: { returned: true, returnedAt: new Date(), rating: rating },
    });

    const ratings = await prisma.borrowRecord.findMany({
      where: { bookId: borrow.bookId, rating: { not: null } },
    });

    const score = (
      ratings.reduce((sum: any, r: any) => sum + (r.rating ?? 0), 0) /
      ratings.length
    ).toFixed(2);

    await prisma.book.update({
      where: { id: returned.bookId },
      data: { rating: parseFloat(score) },
    });

    res.json(returned);
  } catch (error) {
    res.status(500).json({ error: "Unable to return book" });
  }
};

export const borrowBook = async (req: Request, res: Response) => {
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
      res.json(borrow);
    } else {
      res.status(404).json({ error: "Book is already borrowed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Unable to borrow book" });
  }
};
