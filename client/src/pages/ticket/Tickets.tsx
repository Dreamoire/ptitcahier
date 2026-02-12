import { useEffect, useState } from "react";

import TicketCard from "../../components/TicketCard/TicketCard";
import TicketModalViewSchool from "../../components/TicketModalViewSchool/TicketModalViewSchool";
import type { Ticket } from "../../types/Ticket";

import styles from "./Tickets.module.css";

function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    fetch(`${import.meta.env.VITE_API_URL}/api/schools/me/tickets`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json() as Promise<Ticket[]>;
      })
      .then((fetchedTickets) => {
        setTickets(fetchedTickets);
      })
      .catch(() => {
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const processTicket = async (ticketId: number, processed: boolean) => {
    const updateProcessedStatus = (lastStatus: boolean) => {
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === ticketId
            ? { ...ticket, processed: lastStatus }
            : ticket,
        ),
      );

      setSelectedTicket((prevTicket) =>
        prevTicket && prevTicket.id === ticketId
          ? { ...prevTicket, processed: lastStatus }
          : prevTicket,
      );
    };

    fetch(`${import.meta.env.VITE_API_URL}/api/tickets/${ticketId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ processed }),
    })
      .then(
        (response) =>
          response.json() as Promise<{ id: number; processed: boolean }>,
      )
      .then((ticket) => {
        updateProcessedStatus(ticket.processed);
      });
  };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className="primary-title">Tickets</h1>

        <section className={styles.contentArea} aria-label="Liste des tickets">
          {isLoading ? (
            <p className="text-body">Chargement en cours...</p>
          ) : null}

          {hasError ? (
            <p className="text-body">Erreur lors du chargement des tickets.</p>
          ) : null}

          {!isLoading && !hasError ? (
            <ul className={styles.list}>
              {tickets.map((ticket) => (
                <li key={ticket.id} className={styles.listItem}>
                  <TicketCard
                    ticket={ticket}
                    onClick={setSelectedTicket}
                    showStatusBadge
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </div>

      {selectedTicket ? (
        <TicketModalViewSchool
          ticket={selectedTicket}
          onCloseComplete={() => setSelectedTicket(null)}
          processTicket={processTicket}
        />
      ) : null}
    </main>
  );
}

export default Tickets;
