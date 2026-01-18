import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";

import ticketRepository from "./ticketRepository";

const browseBySchool: RequestHandler = async (req, res, next) => {
  try {
    const schoolId = 999;

    const tickets = await ticketRepository.readAllBySchool(schoolId);

    if (tickets.length === 0) {
      res.sendStatus(StatusCodes.NOT_FOUND);
      return;
    }

    res.status(StatusCodes.OK).json(tickets);
  } catch (err) {
    next(err);
  }
};

export default { browseBySchool };
