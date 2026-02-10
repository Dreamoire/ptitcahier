import type { RequestHandler } from "express";
import schoolRepository from "./schoolRepository";

const browseByParent: RequestHandler = async (req, res, next) => {
  try {
    const parentId = req.auth.sub;

    const school = await schoolRepository.readByParent(parentId);
    res.json(school);
  } catch (err) {
    next(err);
  }
};

export default { browseByParent };
