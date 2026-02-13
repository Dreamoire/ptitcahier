import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import joi from "joi";
import type { TicketNew } from "../../types/express/TicketNew";
import studentRepository from "../student/studentRepository";
import ticketCategoryRepository from "../ticketCategory/ticketCategoryRepository";
import ticketRepository from "./ticketRepository";

const browseBySchool: RequestHandler = async (req, res, next) => {
  try {
    const schoolId = 1;
    //school Id hard coded for now

    const tickets = await ticketRepository.readAllBySchool(schoolId);

    res.json(tickets);
  } catch (err) {
    next(err);
  }
};

const browseRecentByParent: RequestHandler = async (req, res, next) => {
  try {
    const parentId = 2;
    const tickets = await ticketRepository.readLastThreeByParent(parentId);
    res.json(tickets);
  } catch (err) {
    next(err);
  }
};

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

    const parentId = 2;
    // parent Id hard coded for now
    const studentIds = req.body.studentIds;

    for (const studentId of studentIds) {
      const currentStudent = await studentRepository.read(studentId);

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

const add: RequestHandler = async (req, res, next) => {
  try {
    const newTicket: TicketNew = {
      content: req.body.content,
      ticketCategoryId: req.body.ticketCategoryId,
      studentIds: req.body.studentIds,
    };

    const parentId = 1;
    //parent Id hard coded for now

    const newInsertedTicketId = await ticketRepository.create(
      newTicket,
      parentId,
    );

    res.status(StatusCodes.CREATED).json({ newInsertedTicketId });
  } catch (err) {
    next(err);
  }
};

export default {
  browseBySchool,
  add,
  validate,
  browseRecentByParent,
};
