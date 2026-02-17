import type { LucideIcon } from "lucide-react";
import { BookUser, Home, Mail, Newspaper, School } from "lucide-react";
import type { OutletAuthContext } from "../../types/OutletAuthContext";

export type NavItem = {
  to: string;
  label: string;
  Icon: LucideIcon;
};

export const getNavItems = (auth: OutletAuthContext["auth"]): NavItem[] => [
  {
    to: `/${auth?.role}/home`,
    label: "Accueil",
    Icon: Home,
  },
  {
    to: `/${auth?.role}/announcements`,
    label: "Fil d'actualité",
    Icon: Newspaper,
  },
  {
    to: `/${auth?.role}/tickets`,
    label:
      auth?.role === "parent" ? "Demande à l'école" : "Gestion des tickets",
    Icon: Mail,
  },
  ...(auth?.role === "school"
    ? [
        {
          to: "/school/students",
          label: "Gestion des élèves",
          Icon: School,
        },
        {
          to: "/school/parents",
          label: "Gestion des parents",
          Icon: BookUser,
        },
      ]
    : []),
];
