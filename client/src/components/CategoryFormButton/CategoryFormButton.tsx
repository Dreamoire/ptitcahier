import {
  CalendarCheck,
  NotebookPen,
  OctagonAlert,
  ShieldUser,
} from "lucide-react";
import type { JSX } from "react";
import type { TicketCategory } from "../../types/TicketCategoryType";
import styles from "./CategoryFormButton.module.css";

interface CategoryFormButtonProps {
  category: TicketCategory;
  formName: string;
  defaultChecked?: boolean;
}

const categoryButtonIcons: Record<string, JSX.Element> = {
  Urgence: <OctagonAlert />,
  Absence: <CalendarCheck />,
  Divers: <NotebookPen />,
  Autorisation: <ShieldUser />,
};

function CategoryFormButton({
  category,
  formName,
  defaultChecked,
}: CategoryFormButtonProps) {
  const { id, name, description } = category;

  return (
    <>
      <input
        type="radio"
        id={name}
        name={formName}
        value={id}
        className={styles.radio_button}
        defaultChecked={defaultChecked}
      />
      <label htmlFor={name} className={styles.radio_button_label}>
        <span className={`${styles.icon} ${styles[`icon_${name}`]}`}>
          {categoryButtonIcons[name]}
        </span>
        <div>
          <h3>{name}</h3>

          <p>{description}</p>
        </div>
      </label>
    </>
  );
}

export default CategoryFormButton;
