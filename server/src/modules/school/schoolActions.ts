import type { RequestHandler } from "express";
import schoolRepository from "./schoolRepository";

const browseByParent: RequestHandler = async (req, res, next) => {
  try {
    const parentId = 1;
    const schoolData = await schoolRepository.findSchoolByParent(parentId);
    res.json(schoolData);
  } catch (err) {
    next(err);
  }
};

const browseBySchool: RequestHandler = async (req, res, next) => {
  try {
    const schoolId = 1;
    const dashboardData = await schoolRepository.getDashboardData(schoolId);
    res.json(dashboardData);
  } catch (err) {
    next(err);
  }
};

export default { browseByParent, browseBySchool };
