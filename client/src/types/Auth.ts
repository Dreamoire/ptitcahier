import type { School } from "./School.ts";

export type Auth = {
  token: string;
  profile: Parent | School;
  role: "parent" | "school";
};

export type Parent = {
  id: number;
  lastName: string;
  firstName: string;
  genre: string;
  photoUrl: string;
};
