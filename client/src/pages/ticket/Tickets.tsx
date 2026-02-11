import { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router";

import TicketCard from "../../components/TicketCard/TicketCard";
import TicketModalViewSchool from "../../components/TicketModalViewSchool/TicketModalViewSchool";
import type { Ticket } from "../../types/Ticket";

import styles from "./Tickets.module.css";

function Tickets() {
  const location = useLocation();
  const isSchoolView = location.pathname.startsWith("/school");

  const headingId = useId();
  const lastActiveElementRef = useRef<HTMLElement | null>(null);

  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    const endpoint = isSchoolView
      ? "/api/schools/me/tickets"
      : "/api/parents/me/tickets";

    setIsLoading(true);
    setHasError(false);

    fetch(`${import.meta.env.VITE_API_URL}${endpoint}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json() as Promise<Ticket[]>;
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
  }, [isSchoolView]);

  const openTicket = (ticket: Ticket) => {
    lastActiveElementRef.current = document.activeElement as HTMLElement | null;
    setSelectedTicket(ticket);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    requestAnimationFrame(() => {
      lastActiveElementRef.current?.focus();
    });
  };

  return (
    <main className={styles.page} aria-labelledby={headingId}>
      <div className={styles.container}>
        <h1 id={headingId} className="primary-title">
          Tickets
        </h1>

        <section
          className={styles.contentArea}
          aria-label="Liste des tickets"
          aria-busy={isLoading}
        >
          {isLoading ? (
            <output className="text-body" aria-live="polite">
              Chargement en cours...
            </output>
          ) : null}

          {hasError ? (
            <p className="text-body" role="alert">
              Erreur lors du chargement des tickets.
            </p>
          ) : null}

          {!isLoading && !hasError ? (
            <ul className={styles.list} aria-label="Tickets">
              {tickets.map((ticket) => (
                <li key={ticket.id} className={styles.listItem}>
                  <TicketCard ticket={ticket} onClick={openTicket} />
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </div>

      {isSchoolView && selectedTicket ? (
        <TicketModalViewSchool
          ticket={selectedTicket}
          onCloseComplete={closeModal}
        />
      ) : null}
    </main>
  );
}

export default Tickets;
