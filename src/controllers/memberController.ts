import { NextFunction, Request, Response } from "express";
import prisma from "../prisma/client";
import logger from "../logger";

export const getAllMembers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const members = await prisma.member.findMany();

    if (!members.length) {
      logger.info("No members found in the database.");
      res.status(200).json({ members });
      return;
    }

    logger.info(`Fetched ${members.length} member(s) successfully.`);
    res.status(200).json(members);
  } catch (error) {
    next(error);
  }
};

export const getMemberDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const memberId = parseInt(req.params.id);

    const member = await prisma.member.findUnique({
      where: { id: memberId },
      include: {
        borrows: {
          include: { book: true },
        },
      },
    });

    if (!member) {
      const error = new Error(`Member with ${memberId} ID isn't found.`);
      (error as any).statusCode = 404;
      throw error;
    }

    const previousBorrows = member?.borrows.filter((b: any) => b.returned);
    const presentBorrows = member?.borrows.filter((b: any) => !b.returned);
    const borrows = {
      past: previousBorrows,
      present: presentBorrows,
    };

    logger.info(`Fetched ${memberId} successfully.`);
    res.json({
      id: member?.id,
      name: member?.name,
      age: member?.age,
      gender: member?.gender,
      country: member?.country,
      borrows,
    });
  } catch (error) {
    next(error);
  }
};
