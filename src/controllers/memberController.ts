import { Request, Response } from "express";
import prisma from "../prisma/client";

export const getAllMembers = async (req: Request, res: Response) => {
  try {
    const members = await prisma.member.findMany();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch members" });
  }
};

export const getMemberDetails = async (req: Request, res: Response) => {
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
      res.status(400).json({ error: "Member not found!" });
      return;
    }

    const previousBorrows = member.borrows.filter((b: any) => b.returned);
    const presentBorrows = member.borrows.filter((b: any) => !b.returned);
    const borrows = {
      past: previousBorrows,
      present: presentBorrows,
    };

    res.json({
      id: member.id,
      name: member.name,
      age: member.age,
      gender: member.gender,
      country: member.country,
      borrows,
    });
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch member details" });
  }
};
