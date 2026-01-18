import type { RequestHandler } from "express";

const newAnnouncementValidation: RequestHandler = (req, res, next) => {
  const { studentIds, classroomIds, classroomId } = req.body as {
    studentIds?: unknown;
    classroomId?: unknown;
    classroomIds?: unknown;
  };

  if (classroomIds !== undefined || classroomId !== undefined) {
    res.status(400).json({
      message:
        "Send only studentIds. Classroom targeting must be resolved on the frontend.",
    });
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
