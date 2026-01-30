import {
  CalendarCheck,
  NotebookPen,
  OctagonAlert,
  ShieldUser,
} from "lucide-react";
import type { TicketCategory } from "../../types/TicketCategory";
import styles from "./CategoryIcon.module.css";

type CategoryIconProps = {
  category: TicketCategory;
};

const ICON_MAP = {
  OctagonAlert,
  CalendarCheck,
  NotebookPen,
  ShieldUser,
} as const;

type IconName = keyof typeof ICON_MAP;

function CategoryIcon({ category }: CategoryIconProps) {
  const IconComponent = ICON_MAP[category.icon as IconName] ?? NotebookPen;

  return <IconComponent className={styles.icon} />;
}

export default CategoryIcon;
