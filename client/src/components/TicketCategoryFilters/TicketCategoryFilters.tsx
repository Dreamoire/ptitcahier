import styles from "./TicketCategoryFilters.module.css";

export type TicketCategory = "Absence" | "Autorisation" | "Urgence" | "Divers";

type TicketCategoryFiltersProps = {
  selectedCategories: TicketCategory[];
  onToggleCategory: (category: TicketCategory) => void;
};

const categories: TicketCategory[] = [
  "Absence",
  "Autorisation",
  "Urgence",
  "Divers",
];

function TicketCategoryFilters({
  selectedCategories,
  onToggleCategory,
}: TicketCategoryFiltersProps) {
  return (
    <div className={styles.row} aria-label="Filtres par catégorie">
      {categories.map((category) => {
        const isActive = selectedCategories.includes(category);

        return (
          <button
            key={category}
            className={`${styles.pill} ${isActive ? styles.pillActive : ""}`}
            type="button"
            aria-pressed={isActive}
            onClick={() => {
              onToggleCategory(category);
            }}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default TicketCategoryFilters;
