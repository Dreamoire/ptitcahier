import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import joi from "joi";
import userRepository from "../user/userRepository";
import schoolRepository from "./schoolRepository";

const validate: RequestHandler = async (req, res, next) => {
  try {
    const newUser = joi.object({
      schoolName: joi.string().max(120).required(),
      email: joi.string().email().max(255).lowercase().required(),
      password: joi.string().min(8).max(120).required(),
      role: joi.string().valid("school").required(),
    });

    const { error, value } = newUser.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Les données envoyées sont invalides" });
      return;
    }

    const currentEmail = await userRepository.readByEmail(value.email);

    if (currentEmail) {
      res
        .status(StatusCodes.CONFLICT)
        .json({ error: "Adresse mail déjà enregistrée" });
      return;
    }

    req.body = value;

    next();
  } catch (err) {
    next(err);
  }
};

const add: RequestHandler = async (req, res, next) => {
  try {
    const newSchoolId = await schoolRepository.create(
      req.body.schoolName,
      req.userId,
    );

    res.status(StatusCodes.CREATED).json({ newSchoolId });
  } catch (err) {
    next(err);
  }
};

const browseByParent: RequestHandler = async (req, res, next) => {
  try {
    const parentId = req.auth.sub;

    const school = await schoolRepository.readByParent(parentId);
    res.json(school);
  } catch (err) {
    next(err);
  }
};

export default { validate, add, browseByParent };
