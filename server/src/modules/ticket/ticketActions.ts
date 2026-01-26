import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import joi from "joi";
import type { Ticket } from "../../types/express/Ticket";
import studentRepository from "../student/studentRepository";
import ticketCategoryRepository from "../ticketCategory/ticketCategoryRepository";
import ticketRepository from "./ticketRepository";

const validate: RequestHandler = async (req, res, next) => {
  try {
    const newTicket = joi.object({
      content: joi.string().max(1000).required(),
      ticketCategoryId: joi.number().integer().positive().required(),
      studentIds: joi
        .array()
        .items(joi.number().integer().positive())
        .min(1)
        .required(),
    });

    const { error } = newTicket.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Les données envoyées sont invalides" });
      return;
    }

    const currentTicketCategory = await ticketCategoryRepository.readById(
      req.body.ticketCategoryId,
    );

    if (!currentTicketCategory) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "Categorie introuvable" });
      return;
    }

    const parentId = 1;
    // parent Id hard coded for now
    const studentIds = req.body.studentIds;

    for (const studentId of studentIds) {
      const currentStudent = await studentRepository.readById(studentId);

      if (!currentStudent) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Étudiant introuvable" });
        return;
      }

      if (currentStudent.parentId !== parentId) {
        res
          .status(StatusCodes.UNPROCESSABLE_ENTITY)
          .json({ error: "L'étudiant n'appartient pas à ce parent" });
        return;
      }
    }

    next();
  } catch (err) {
    next(err);
  }
};

const addTicket: RequestHandler = async (req, res, next) => {
  try {
    const newTicket: Ticket = {
      content: req.body.content,
      ticketCategoryId: req.body.ticketCategoryId,
      studentIds: req.body.studentIds,
    };

    const parentId = 1;
    //parent Id hard coded for now

    const newInsertedTicketId = await ticketRepository.createTicket(
      newTicket,
      parentId,
    );

    res.status(StatusCodes.CREATED).json({ newInsertedTicketId });
  } catch (err) {
    next(err);
  }
};

export default {
  addTicket,
  validate,
};
