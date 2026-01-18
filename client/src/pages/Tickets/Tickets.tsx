import { useEffect, useState } from "react";

import TicketCard from "../../components/TicketCard/TicketCard";
import TicketCategoryFilters, {
  type TicketCategory,
} from "../../components/TicketCategoryFilters/TicketCategoryFilters";
import type { Ticket } from "../../types/ticket";

import styles from "./Tickets.module.css";

function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<
    TicketCategory[]
  >(["Absence", "Autorisation", "Urgence", "Divers"]);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    fetch(`${apiUrl}/api/tickets`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json() as Promise<Ticket[]>;
      })
      .then((data) => {
        setTickets(data);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleToggleCategory = (category: TicketCategory) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category);
      }

      return [...prev, category];
    });
  };

  const filteredTickets = tickets.filter((ticket) =>
    selectedCategories.includes(ticket.category_name as TicketCategory),
  );

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className="secondary-title">Tickets</h1>

        <section className={styles.statusRow} aria-label="Statuts des tickets">
          <button
            className={`${styles.statusPill} ${styles.statusPillActive}`}
            type="button"
          >
            <span className={styles.statusLabel}>Total</span>
            <span className={styles.statusDivider} aria-hidden="true" />
            <span className={styles.statusCount}>{tickets.length}</span>
          </button>

          <button className={styles.statusPill} type="button">
            <span className={styles.statusLabel}>Traité</span>
            <span className={styles.statusDivider} aria-hidden="true" />
            <span className={styles.statusCount}>0</span>
          </button>

          <button className={styles.statusPill} type="button">
            <span className={styles.statusLabel}>Non traité</span>
            <span className={styles.statusDivider} aria-hidden="true" />
            <span className={styles.statusCount}>0</span>
          </button>
        </section>

        <TicketCategoryFilters
          selectedCategories={selectedCategories}
          onToggleCategory={handleToggleCategory}
        />

        <section className={styles.contentArea} aria-label="Liste des tickets">
          {isLoading ? <p className="text-body">Chargement...</p> : null}
          {hasError ? (
            <p className="text-body">Erreur lors du chargement des tickets.</p>
          ) : null}

          {!isLoading && !hasError ? (
            <ul className={styles.list}>
              {filteredTickets.map((ticket) => (
                <li key={ticket.id} className={styles.listItem}>
                  <TicketCard ticket={ticket} />
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </div>
    </main>
  );
}

export default Tickets;
