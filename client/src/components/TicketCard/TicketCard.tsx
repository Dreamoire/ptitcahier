import type { Ticket } from "../../types/ticket";

import styles from "./TicketCard.module.css";

type TicketCardProps = {
  ticket: Ticket;
};

function TicketCard({ ticket }: TicketCardProps) {
  const parentFullName = `${ticket.parent_first_name} ${ticket.parent_last_name}`;

  const createdAtLabel = new Date(ticket.created_at).toLocaleString("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  return (
    <article className={styles.card}>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.parentName}>{parentFullName}</h2>

          <time className={styles.date} dateTime={ticket.created_at}>
            {createdAtLabel}
          </time>
        </div>

        <span className={styles.category} aria-label="Catégorie">
          {ticket.category_name}
        </span>
      </header>

      <p className={styles.content}>{ticket.content}</p>
    </article>
  );
}

export default TicketCard;
