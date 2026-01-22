import type { RequestHandler } from "express";
import {
  announcementCategoryExists,
  countStudentsBelongingToSchool,
} from "../announcement/announcementRepository";

const SCHOOL_ID = 1; // Assuming a fixed school ID for validation purposes

const newAnnouncementDataBaseValidation: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { categoryId, studentIds } = req.body as {
    categoryId: number;
    studentIds: number[];
  };

  const categoryExists = await announcementCategoryExists(categoryId);
  if (!categoryExists) {
    res.status(400).json({ message: "Invalid categoryId." });
    return;
  }

  const validStudentCount = await countStudentsBelongingToSchool(
    SCHOOL_ID,
    studentIds,
  );
  if (validStudentCount !== studentIds.length) {
    res
      .status(400)
      .json({ message: "All studentIds must belong to the same school." });
    return;
  }

  next();
};

export default newAnnouncementDataBaseValidation;
