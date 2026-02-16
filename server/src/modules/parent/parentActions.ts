import type { RequestHandler } from "express";
import parentRepository from "./parentRepository";

const browseBySchool: RequestHandler = async (req, res, next) => {
  try {
    const schoolId = Number(req.auth.sub);

    const parents = await parentRepository.readAllBySchool(schoolId);
    res.json(parents);
  } catch (err) {
    next(err);
  }
};

export default { browseBySchool };
