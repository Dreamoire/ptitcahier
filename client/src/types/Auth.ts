export type Auth = {
  token: string;
  user: Parent;
  role: "parent" | "school";
};

type Parent = {
  id: number;
  email: string;
  last_name: string;
  first_name: string;
  genre: string;
};
