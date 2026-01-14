import type { RequestHandler } from "express";
import ticketRepository from "./ticketRepository";

const addTicket: RequestHandler = async (req, res, next) => {
  try {
    const newTicket = {
      content: req.body.content,
      parent_id: req.body.parent_id,
      ticket_category_id: req.body.ticket_category_id,
    };

    console.log(newTicket);

    const insertNewTicketId = await ticketRepository.createTicket(newTicket);

    res.status(201).json({ insertNewTicketId });
  } catch (err) {
    next(err);
  }
};

export default { addTicket };
