import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TicketCard from "../../components/TicketCard/TicketCard";
import TicketModalViewSchool from "../../components/TicketModalViewSchool/TicketModalViewSchool";
import type { Ticket } from "../../types/Ticket";
import styles from "./Tickets.module.css";

type UserRole = "parent" | "school";

interface TicketsProps {
  userRole: UserRole;
}

function Tickets({ userRole }: TicketsProps) {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const navigate = useNavigate();

  const backgroundClass =
    userRole === "school" ? "school-background" : "parent-background";

  const titleText =
    userRole === "school" ? "Gestion des Tickets" : "Mes Demandes";

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    const endpoint =
      userRole === "school"
        ? `${import.meta.env.VITE_API_URL}/api/schools/me/tickets`
        : `${import.meta.env.VITE_API_URL}/api/parents/me/tickets`;
    fetch(endpoint)
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
  }, [userRole]);

  return (
    <main className={`${styles.page} ${backgroundClass}`}>
      <div className={styles.container}>
        <h1 className="primary-title">{titleText}</h1>
        {userRole === "parent" && (
          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/parent/tickets/new")}
          >
            + Nouvelle demande
          </button>
        )}

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
                    userRole={userRole}
                  />
                </li>
              ))}
            </ul>
          ) : null}
        </section>
      </div>

      {selectedTicket ? (
        userRole === "school" ? (
          <TicketModalViewSchool
            ticket={selectedTicket}
            onCloseComplete={() => setSelectedTicket(null)}
          />
        ) : null
      ) : null}
    </main>
  );
}

export default Tickets;
