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
  const { id, ticket_category_name } = category;

  return (
    <div>
      <input
        type="radio"
        id={ticket_category_name}
        name={formName}
        value={id}
        className={styles.radio_button}
        defaultChecked={defaultChecked}
      />
      <label
        htmlFor={ticket_category_name}
        className={`${styles.radio_button_label} ${
          styles[`radio_button_label_${ticket_category_name}`]
        }`}
      >
        {categoryButtonIcons[ticket_category_name]}
        {ticket_category_name}
      </label>
    </div>
  );
}

export default CategoryFormButton;
