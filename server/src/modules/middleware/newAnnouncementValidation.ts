import type { RequestHandler } from "express";

const newAnnouncementValidation: RequestHandler = async (req, res, next) => {
  const { studentIds, classroomIds, classroomId, categoryId } = req.body as {
    studentIds?: unknown;
    classroomId?: unknown;
    classroomIds?: unknown;
    categoryId?: unknown;
  };

  if (classroomIds !== undefined || classroomId !== undefined) {
    res.status(400).json({
      message:
        "Send only studentIds. Classroom targeting must be resolved on the frontend.",
    });
    return;
  }

  if (!Number.isInteger(categoryId)) {
    res.status(400).json({ message: "categoryId must be an integer." });
    return;
  }

  if (!Array.isArray(studentIds)) {
    res.status(400).json({
      message: "studentIds must be an array of integers.",
    });
    return;
  }

  if (studentIds.length === 0) {
    res.status(400).json({
      message: "studentIds must not be empty.",
    });
    return;
  }

  if (!studentIds.every((id: unknown) => Number.isInteger(id))) {
    res.status(400).json({
      message: "studentIds must contain only integers.",
    });
    return;
  }

  next();
};

export default newAnnouncementValidation;
