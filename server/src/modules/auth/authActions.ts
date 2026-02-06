import type { RequestHandler } from "express";

import argon2 from "argon2";
import jwt from "jsonwebtoken";

import { StatusCodes } from "http-status-codes";
import type { JwtPayload } from "jsonwebtoken";

export interface MyPayload extends JwtPayload {
  sub: string;
}

type LoginRepository = {
  readByEmailWithPassword(email: string): Promise<{
    id: number;
    hashed_password: string;
    [key: string]: unknown;
  } | null>;
};

const login =
  (role: "parent" | "school", repository: LoginRepository): RequestHandler =>
  async (req, res, next) => {
    try {
      const user = await repository.readByEmailWithPassword(req.body.email);

      if (!user) {
        res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
        return;
      }

      const verified = await argon2.verify(
        user.hashed_password,
        req.body.password,
      );

      if (verified) {
        const { hashed_password, ...userWithoutHashedPassword } = user;

        const myPayload: MyPayload = {
          sub: user.id.toString(),
        };

        const token = await jwt.sign(
          myPayload,
          process.env.APP_SECRET as string,
          {
            expiresIn: "1h",
          },
        );

        res.json({
          token,
          user: userWithoutHashedPassword,
          role,
        });
      } else {
        res.sendStatus(StatusCodes.UNPROCESSABLE_ENTITY);
      }
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
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    // Vérifier la validité du token (son authenticité et sa date d'expériation)
    // En cas de succès, le payload est extrait et décodé
    // req.auth = jwt.verify(token, process.env.APP_SECRET as string) as MyPayload;

    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

export default { login, verifyToken };
