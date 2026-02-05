// import type { RequestHandler } from "express";

// import argon2 from "argon2";
// import jwt from "jsonwebtoken";

// import type { JwtPayload } from "jsonwebtoken";

// export interface MyPayload extends JwtPayload {
//   sub: string;
//   role: "parent" | "school";
// }

// type LoginRepository = {
//   readByEmailWithPassword(email: string): Promise<{
//     id: number;
//     hashed_password: string;
//     [key: string]: unknown;
//   } | null>;
// };

// const login =
//   (role: "parent" | "school", repository: LoginRepository): RequestHandler =>
//   async (req, res, next) => {
//     try {
//       const entity = await repository.readByEmailWithPassword(req.body.email);
//       if (!entity) {
//         res.sendStatus(422);
//         return;
//       }

//       const verified = await argon2.verify(
//         entity.hashed_password,
//         req.body.password,
//       );
//       if (!verified) {
//         res.sendStatus(422);
//         return;
//       }

//       const { hashed_password, ...entityWithoutHashedPassword } = entity;

//       const token = jwt.sign(
//         { sub: entity.id.toString(), role },
//         process.env.APP_SECRET as string,
//         { expiresIn: "1h" },
//       );

//       res.json({ token, [role]: entityWithoutHashedPassword });
//     } catch (err) {
//       next(err);
//     }
//   };

// export default { login };
