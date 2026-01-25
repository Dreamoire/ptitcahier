import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import type { Ticket } from "../../types/express/Ticket";
import ticketRepository from "./ticketRepository";

// import joi from "joi";

// const validateTicketFormat: RequestHandler = async (req, res, next) => {
//   const newTicket = joi.object({
//     content: joi.string().max(1000).required(),
//     ticketCategoryId: joi.number().integer().positive().required(),
//     studentIds: joi
//       .array()
//       .items(joi.number().integer().positive())
//       .min(1)
//       .required(),
//   });

//   const { error } = newTicket.validate(req.body, { abortEarly: false });

//   if (error == null) {
//     next();
//   } else {
//     res.status(400).json({ validationErrors: error.details });
//   }

// if dont find parent id with correct student id(s), refuse ticket
//   const result = await ticketRepository.readStudentsByParent(
//     parent_id,
//     student_ids,
//   );

//   const students = await studentRepository.readAllByParent(parentId);

// [
//   {id: 1, first_name: "n"},
//   {id: 1, first_name: "n"}
// ]

// studentIds:[1 , 2]

//   if()

// if dont find tik_cat between 1 and 4, refuse ticket
// const result = await ticketRepository....(
//   ticketCategoryId
// );

// if (result.length === 0) {
//   res.sendStatus(422);
//   return;
// }
// next();
// };

const addTicket: RequestHandler = async (req, res, next) => {
  try {
    const newTicket: Ticket = {
      content: req.body.content,
      ticketCategoryId: req.body.ticketCategoryId,
      studentIds: req.body.studentIds,
    };

    const parentId = 1;
    //parent Id hard coded for now

    console.log(newTicket);
    // à supprimer

    const newInsertedTicketId = await ticketRepository.createTicket(
      newTicket,
      parentId,
    );

    res.status(StatusCodes.CREATED).json({ newInsertedTicketId });
  } catch (err) {
    next(err);
  }
};

export default { addTicket };
