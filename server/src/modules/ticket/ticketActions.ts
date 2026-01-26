import type { RequestHandler } from "express";

import ticketRepository from "./ticketRepository";

const browseBySchool: RequestHandler = async (req, res, next) => {
  try {
    const schoolId = 1;

    const tickets = await ticketRepository.readAllBySchool(schoolId);

    res.json(tickets);
  } catch (err) {
    next(err);
  }
};

export default { browseBySchool };
