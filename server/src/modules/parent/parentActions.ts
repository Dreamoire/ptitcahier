import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import joi from "joi";
import userRepository from "../user/userRepository";
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

const destroy: RequestHandler = async (req, res, next) => {
  try {
    const parentId = Number(req.params.id);

    if (!Number.isInteger(parentId)) {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: "Identifiant de parent invalide",
      });
      return;
    }

    const parent = await parentRepository.readById(parentId);

    if (!parent) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: "Parent introuvable",
      });
      return;
    }

    const affectedRows = await userRepository.delete(parent.user_id);

    if (affectedRows === 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        error: "Utilisateur introuvable",
      });
      return;
    }

    res.sendStatus(StatusCodes.NO_CONTENT);
  } catch (err) {
    next(err);
  }
};

const validate: RequestHandler = async (req, res, next) => {
  try {
    const updatedParent = joi.object({
      firstName: joi.string().max(120).required(),
      lastName: joi.string().max(120).required(),
      // email: joi.string().email().max(255).lowercase().required(),
      genre: joi.string().valid("M", "F").required(),
    });

    const { error, value } = updatedParent.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Les données envoyées sont invalides" });
      return;
    }

    req.body = value;

    next();
  } catch (err) {
    next(err);
  }
};

const update: RequestHandler = async (req, res, next) => {
  try {
    const parentId = Number(req.params.id);

    const { firstName, lastName, genre } = req.body;

    const updatedParent = await parentRepository.update(parentId, {
      firstName,
      lastName,
      genre,
    });

    if (!updatedParent) {
      res.status(StatusCodes.NOT_FOUND).json({ error: "Parent introuvable" });
      return;
    }

    res.status(StatusCodes.OK).json(updatedParent);
  } catch (err) {
    next(err);
  }
};

export default { browseBySchool, destroy, validate, update };
