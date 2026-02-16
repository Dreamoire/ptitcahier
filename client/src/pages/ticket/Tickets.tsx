import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ptit_cahier_logo_original from "../../assets/images/ptit_cahier_logo_original.png";
import TicketCard from "../../components/TicketCard/TicketCard";
import TicketModal from "../../components/TicketModal/TicketModal";
import type { OutletAuthContext } from "../../types/OutletAuthContext";
import type { Ticket } from "../../types/Ticket";
import styles from "./Tickets.module.css";

function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const navigate = useNavigate();

  const { auth } = useOutletContext<OutletAuthContext>();

  const userRole = auth?.role;

  const backgroundClass =
    userRole === "school" ? "school-background" : "parent-background";

  const titleText =
    userRole === "school" ? "Gestion des tickets" : "Mes demandes";

  useEffect(() => {
    const headers = { Authorization: `Bearer ${auth?.token}` };

    const endpoint =
      userRole === "school"
        ? `${import.meta.env.VITE_API_URL}/api/schools/me/tickets`
        : `${import.meta.env.VITE_API_URL}/api/parents/me/tickets`;

    fetch(endpoint, { headers })
      .then((response) => {
        if (!response.ok) {
          setLoadingError(true);
          return;
        }
        return response.json();
      })
      .then((tickets: Ticket[] | undefined) => {
        if (!tickets) return;
        setTickets(tickets);
      });
  }, [userRole, auth]);

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
    <main className={`${styles.page} ${backgroundClass}`}>
      <div className={styles.container}>
        <header className={styles.header}>
          <img
            src={ptit_cahier_logo_original}
            alt="Le P'tit Cahier"
            className={styles.logo}
          />
          <h1 className="primary-title">{titleText}</h1>
        </header>

        {userRole === "parent" && (
          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/parent/tickets/new")}
          >
            + Nouvelle demande
          </button>
        )}

        {loadingError ? (
          <p className="general_error_message">
            Échec de la récupération de vos tickets
          </p>
        ) : tickets.length === 0 ? (
          <p className="general_error_message">Aucun ticket précédent</p>
        ) : (
          <section
            className={styles.contentArea}
            aria-label="Liste des tickets"
          >
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
          </section>
        )}
      </div>

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          onCloseComplete={() => setSelectedTicket(null)}
          processTicket={processTicket}
        />
      )}
    </main>
  );
}

export default Tickets;
