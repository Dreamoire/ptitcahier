import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const backgroundClass =
    userRole === "school" ? "school-background" : "parent-background";

  const titleText =
    userRole === "school" ? "Gestion des Tickets" : "Mes Demandes";

  useEffect(() => {
    const endpoint =
      userRole === "school"
        ? `${import.meta.env.VITE_API_URL}/api/schools/me/tickets`
        : `${import.meta.env.VITE_API_URL}/api/parents/me/tickets`;
    fetch(endpoint)
      .then((response) => {
        // if (!response.ok) {
        //   throw new Error(`HTTP ${response.status}`);
        // }

        // if (!res.ok) {
        //   setLoadingError(true);
        //   return;
        // }

        return response.json();
      })
      .then((tickets: Ticket[] | undefined) => {
        if (!tickets) return;
        setTickets(tickets);
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

        {/* {loadingError ? (
          <p>Échec de la récupération des tickets</p>
        ) : (
          <section
            className={styles.contentArea}
            aria-label="Liste des tickets"
          >
            <ul className={styles.list}>
              {tickets.map((ticket) => (
                <li key={ticket.id} className={styles.listItem}>
                  <TicketCard ticket={ticket} onClick={setSelectedTicket} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div> */}

        {/* {selectedTicket && (
        <TicketModalViewSchool
          ticket={selectedTicket}
          onCloseComplete={() => setSelectedTicket(null)}
        />
      )} */}
        <section className={styles.contentArea} aria-label="Liste des tickets">
          <ul className={styles.list} aria-label="Tickets">
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
