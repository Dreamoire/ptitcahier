import type { RequestHandler } from "express";

import argon2 from "argon2";
import jwt from "jsonwebtoken";

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
        res.sendStatus(422);
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
        res.sendStatus(422);
      }
    } catch (err) {
      next(err);
    }
  };

export default { login };
