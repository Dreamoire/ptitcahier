import type { TicketCategory } from "../../types/TicketCategory";
import CategoryIcon from "../CategoryIcon/CategoryIcon";
import styles from "./CategoryFormButton.module.css";

type CategoryFormButtonProps = {
  category: TicketCategory;
  formName: string;
  onChange: () => void;
};

function CategoryFormButton({
  category,
  formName,
  onChange,
}: CategoryFormButtonProps) {
  const { id, name, description, color } = category;

  return (
    <>
      <input
        type="radio"
        id={name}
        name={formName}
        value={id}
        aria-required="true"
        className={styles.radio_button}
        onChange={onChange}
      />
      <label htmlFor={name} className={styles.radio_button_label}>
        <div
          className={styles.icon_wrapper}
          style={{ backgroundColor: `#${color}` }}
        >
          <CategoryIcon category={category} />
        </div>
        <div className={styles.text_wrapper}>
          <h2 className={styles.ticket_category_name}>{name}</h2>
          <p className={styles.ticket_category_description}>{description}</p>
        </div>
      </label>
    </>
  );
}

export default CategoryFormButton;
