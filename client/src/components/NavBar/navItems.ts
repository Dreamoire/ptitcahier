import type { LucideIcon } from "lucide-react";
import { CalendarDays, Home, Mail, Newspaper } from "lucide-react";

export type NavItem = {
  to: string;
  label: string;
  Icon: LucideIcon;
};

export const parentNavItems: NavItem[] = [
  {
    to: "/",
    label: "Accueil",
    Icon: Home,
  },
  {
    to: "/parent/fil-actualite",
    label: "Fil d'actualité",
    Icon: Newspaper,
  },
  {
    to: "/parent/demande-ecole",
    label: "Demande à l'école",
    Icon: Mail,
  },
  {
    to: "/parent/agenda",
    label: "Agenda",
    Icon: CalendarDays,
  },
];

export const schoolNavItems: NavItem[] = [
  {
    to: "/",
    label: "Accueil",
    Icon: Home,
  },
  {
    to: "/school/fil-actualite",
    label: "Fil d'actualité",
    Icon: Newspaper,
  },
  {
    to: "/school/tickets",
    label: "Gestion des tickets",
    Icon: Mail,
  },
  {
    to: "/school/agenda",
    label: "Agenda",
    Icon: CalendarDays,
  },
];
