import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import TicketCard from "../../components/TicketCard/TicketCard";
import TicketModalViewSchool from "../../components/TicketModalViewSchool/TicketModalViewSchool";
import type { OutletAuthContext } from "../../types/OutletAuthContext";
import type { Ticket } from "../../types/Ticket";
import styles from "./Tickets.module.css";

function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const navigate = useNavigate();
  const { auth } = useOutletContext<OutletAuthContext>();

  if (!auth) return;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/schools/me/tickets`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    })
      .then((res) => {
        if (!res.ok) {
          navigate("/redirection");
          return null;
        }
        return res.json();
      })
      .then((tickets) => {
        setTickets(tickets);
      });
  }, [auth, navigate]);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1 className="primary-title">Tickets</h1>

        <section className={styles.contentArea} aria-label="Liste des tickets">
          <ul className={styles.list}>
            {tickets.map((ticket) => (
              <li key={ticket.id} className={styles.listItem}>
                <TicketCard ticket={ticket} onClick={setSelectedTicket} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      {selectedTicket && (
        <TicketModalViewSchool
          ticket={selectedTicket}
          onCloseComplete={() => setSelectedTicket(null)}
        />
      )}
    </main>
  );
}

export default Tickets;
