import {
  CalendarCheck,
  NotebookPen,
  OctagonAlert,
  ShieldUser,
} from "lucide-react";
import type { JSX } from "react";
import type { TicketCategory } from "../../types/TicketCategoryType";
import styles from "./CategoryFormButton.module.css";

type CategoryFormButtonProps = {
  category: TicketCategory;
  formName: string;
};

const categoryButtonIcons: Record<string, JSX.Element> = {
  Urgence: <OctagonAlert />,
  Absence: <CalendarCheck />,
  Divers: <NotebookPen />,
  Autorisation: <ShieldUser />,
};

function CategoryFormButton({ category, formName }: CategoryFormButtonProps) {
  const { id, name } = category;

  return (
    <>
      <input
        type="radio"
        id={name}
        name={formName}
        value={id}
        className={styles.radio_button}
        aria-required="true"
      />
      <label htmlFor={name} className={styles.radio_button_label}>
        <div
          className={`${styles.icon_wrapper} ${styles[`icon_wrapper_${name}`]}`}
        >
          <span className={styles.icon}>{categoryButtonIcons[name]}</span>
        </div>

        <h2>{name}</h2>
      </label>
    </>
  );
}

export default CategoryFormButton;
