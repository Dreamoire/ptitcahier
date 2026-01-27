import type { RequestHandler } from "express";

const newAnnouncementValidation: RequestHandler = async (req, res, next) => {
  const { title, content } = req.body as {
    title: unknown;
    content: unknown;
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

export default newAnnouncementValidation;
