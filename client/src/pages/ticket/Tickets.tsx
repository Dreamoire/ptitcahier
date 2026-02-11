import { useEffect, useState } from "react";
import { useLocation } from "react-router";

import TicketCard from "../../components/TicketCard/TicketCard";
import TicketModalViewSchool from "../../components/TicketModalViewSchool/TicketModalViewSchool";
import type { Ticket } from "../../types/Ticket";

import styles from "./Tickets.module.css";

function Tickets() {
  const location = useLocation();
  const isSchoolView = location.pathname.startsWith("/school");

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const endpoint = isSchoolView
      ? "/api/schools/me/tickets"
      : "/api/parents/me/tickets";

    setIsLoading(true);
    setHasError(false);

    fetch(`${import.meta.env.VITE_API_URL}${endpoint}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json() as Promise<Ticket[]>;
      })
      .then(setTickets)
      .catch(() => setHasError(true))
      .finally(() => setIsLoading(false));
  }, [isSchoolView]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className="primary-title">Tickets</h1>

        <section className={styles.contentArea} aria-label="Liste des tickets">
          {isLoading && <p className="text-body">Chargement en cours...</p>}
          {hasError && (
            <p className="text-body">Erreur lors du chargement des tickets.</p>
          )}

          {!isLoading && !hasError && (
            <ul className={styles.list}>
              {tickets.map((ticket) => (
                <li key={ticket.id} className={styles.listItem}>
                  <TicketCard ticket={ticket} onClick={setSelectedTicket} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      {isSchoolView && selectedTicket && (
        <TicketModalViewSchool
          ticket={selectedTicket}
          onCloseComplete={() => setSelectedTicket(null)}
        />
      )}
    </main>
  );
}

export default Tickets;
