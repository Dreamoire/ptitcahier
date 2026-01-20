import type { RequestHandler } from "express";
import ticketRepository from "./ticketRepository";

const addTicket: RequestHandler = async (req, res, next) => {
  try {
    const newTicket = {
      content: req.body.content,
      parent_id: req.body.parent_id,
      ticket_category_id: req.body.ticket_category_id,
      student_ids: req.body.student_ids,
    };

    console.log(newTicket);
    console.log(newTicket.student_ids);
    // à supprimer

    const newInsertedTicketId = await ticketRepository.createTicket(newTicket);

    res.status(201).json({ newInsertedTicketId });
  } catch (err) {
    next(err);
  }
};

export default { addTicket };
