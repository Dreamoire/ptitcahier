import { useEffect, useState } from "react";

import TicketCard from "../../components/TicketCard/TicketCard";
import type { Ticket } from "../../types/ticket";

import styles from "./Tickets.module.css";

const API_URL = import.meta.env.VITE_API_URL;

function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    fetch(`${API_URL}/api/tickets`)
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

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className="secondary-title">Tickets</h1>

        <section className={styles.contentArea} aria-label="Liste des tickets">
          {isLoading ? <p className="text-body">Chargement...</p> : null}

          {hasError ? (
            <p className="text-body">Erreur lors du chargement des tickets.</p>
          ) : null}

          {!isLoading && !hasError ? (
            <ul className={styles.list}>
              {tickets.map((ticket) => (
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
