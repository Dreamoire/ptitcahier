import type { RequestHandler } from "express";

const newAnnouncementTypageValidation: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { studentIds, classroomIds, classroomId, categoryId } = req.body as {
    studentIds: unknown;
    classroomId: unknown;
    classroomIds: unknown;
    categoryId: unknown;
  };

  if (!Array.isArray(studentIds) || studentIds.length === 0) {
    res.status(400).json({
      message: "studentIds must be an array of integers not empty",
    });
    return;
  }

  if (!studentIds.every((id: unknown) => Number.isInteger(id))) {
    res.status(400).json({
      message: "studentIds must contain only integers.",
    });
    return;
  }

  if (!Number.isInteger(categoryId)) {
    res.status(400).json({ message: "categoryId must be an integer." });
    return;
  }

  next();
};

const newAnnouncementContentValidation: RequestHandler = async (
  req,
  res,
  next,
) => {
  const { title, content, categoryId } = req.body as {
    title: unknown;
    content: unknown;
    categoryId: unknown;
  };

  const TITLE_MAX_LENGTH = 80;
  const CONTENT_MAX_LENGTH = 2000;

  if (typeof title !== "string" || title.trim().length === 0) {
    res.status(400).json({ message: "title is required" });
    return;
  }

  if (typeof content !== "string" || content.trim().length === 0) {
    res.status(400).json({ message: "content is required" });
    return;
  }

  if (title.length > TITLE_MAX_LENGTH) {
    res.status(400).json({
      message: `title must not exceed ${TITLE_MAX_LENGTH} characters.`,
    });
    return;
  }

  if (content.length > CONTENT_MAX_LENGTH) {
    res.status(400).json({
      message: `content must not exceed ${CONTENT_MAX_LENGTH} characters.`,
    });
    return;
  }

  next();
};

export { newAnnouncementTypageValidation, newAnnouncementContentValidation };
