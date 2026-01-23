import type { RequestHandler } from "express";
import type { TicketNew } from "../../types/express/TicketNew";
import ticketRepository from "./ticketRepository";

// const validateTicket: RequestHandler = async (req, res, next) => {
//   try {
//     const newTicket = joi.object({
//       content: joi.string().max(1000).required(),
//       parent_id: joi.number().integer().positive().required(),
//       ticket_category_id: joi.number().integer().positive().required(),
//       student_ids: joi
//         .array()
//         .items(joi.number().integer().positive())
//         .min(1)
//         .required(),
//     });

//     const { error } = newTicket.validate(req.body, { abortEarly: false });

//     if (error == null) {
//       next();
//     } else {
//       res.status(400).json({ validationErrors: error.details });
//     }

//     const { parent_id, ticket_category_id, student_ids } = req.body;
//     req.parent

// if dont find parent id with correct student id(s), refuse ticket
// repo fx name?
// const result = await ticketRepository.readStudentsByParent(
//   parent_id,
//   student_ids,
// );

// if (result.length === 0) {
//   res.sendStatus(422);
//   return;
// }

// ticket cat id _ must be 1 to 4

//     next();
//   } catch (err) {
//     next(err);
//   }
// };

const addTicket: RequestHandler = async (req, res, next) => {
  try {
    const newTicket: TicketNew = {
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

    res.status(201).json({ newInsertedTicketId });
  } catch (err) {
    next(err);
  }
};

export default { addTicket };
