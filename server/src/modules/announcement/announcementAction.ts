import type { RequestHandler } from "express";
import {
  createAnnouncement,
  createStudentAnnouncement,
} from "./announcementRepository";

const browseBySchool: RequestHandler = async (req, res) => {
  res.status(501).json({ message: "Not Implemented yet" });
};

const add: RequestHandler = async (req, res) => {
  try {
    const { title, content, categoryId, studentIds } = req.body as {
      title: string;
      content: string;
      categoryId: number;
      studentIds: number[];
    };

    const SCHOOL_ID = 1; // Assuming a fixed school ID for action purposes

    const announcementId = await createAnnouncement({
      schoolId: SCHOOL_ID,
      title: title.trim(),
      content: content.trim(),
      categoryId: categoryId,
    });

    await createStudentAnnouncement(announcementId, studentIds);

    res.status(201).json({
      id: announcementId,
      schoolId: SCHOOL_ID,
      title: title.trim(),
      content: content.trim(),
      categoryId: categoryId,
      studentIds: studentIds,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default { browseBySchool, add };
