import type { RequestHandler } from "express";

const browse: RequestHandler = (req, res) => {
  res.status(501).json({ message: "not implemented yet" });
};

const add: RequestHandler = (req, res) => {
  res.status(501).json({ message: "not implemented yet" });
};

export default { browse, add };
