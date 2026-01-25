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
  const { id, name, color } = category;

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

        <h2>{name}</h2>
      </label>
    </>
  );
}

export default CategoryFormButton;
