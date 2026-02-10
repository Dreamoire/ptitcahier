import argon2 from "argon2";
import type { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import joi from "joi";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import parentRepository from "../parent/parentRepository";
import schoolRepository from "../school/schoolRepository";
import userRepository from "../user/userRepository";

interface MyPayload extends JwtPayload {
  sub: string;
  role: "parent" | "school";
}

const login: RequestHandler = async (req, res, next) => {
  try {
    const newLogin = joi.object({
      email: joi.string().email().required(),
      password: joi.string().required(),
      role: joi.string().valid("parent", "school").required(),
    });

    const { error } = newLogin.validate(req.body);

    if (error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Les données envoyées sont invalides" });
      return;
    }

    const user = await userRepository.readByEmail(req.body.email);

    if (!user || user.role !== req.body.role) {
      res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
      return;
    }

    const verified = await argon2.verify(
      user.hashed_password,
      req.body.password,
    );

    if (!verified) {
      res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
      return;
    }

    const profile =
      user.role === "parent"
        ? await parentRepository.readByUserId(user.id)
        : await schoolRepository.readByUserId(user.id);

    if (!profile) {
      res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
      return;
    }

    const myPayload: MyPayload = {
      sub: profile.id.toString(),
      role: user.role,
    };

    const token = await jwt.sign(myPayload, process.env.APP_SECRET as string, {
      expiresIn: "1000h",
    });

    res.json({
      token,
      profile,
      role: user.role,
    });
  } catch (err) {
    next(err);
  }
};

const verifyToken: RequestHandler = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header does not have the 'Bearer' type");
    }

    req.auth = jwt.verify(token, process.env.APP_SECRET as string) as MyPayload;

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(StatusCodes.UNAUTHORIZED);
  }
};

const verifyRole = (role: "parent" | "school"): RequestHandler => {
  return (req, res, next) => {
    if (!req.auth) {
      res.sendStatus(StatusCodes.UNAUTHORIZED);
      return;
    }

    if (req.auth.role !== role) {
      res.sendStatus(StatusCodes.FORBIDDEN);
      return;
    }

    next();
  };
};

export default { login, verifyToken, verifyRole };
