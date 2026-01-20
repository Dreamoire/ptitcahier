import type { Ticket } from "../../types/ticket";

import TicketIcon, { type TicketIconType } from "./TicketIcon";

import styles from "./TicketCard.module.css";

type TicketCardProps = {
  ticket: Ticket;
};

const getTicketIconType = (categoryName: string): TicketIconType => {
  switch (categoryName) {
    case "Urgence":
      return "urgent";
    case "Autorisation":
      return "events";
    case "Absence":
      return "notice";
    default:
      return "news";
  }
};

function TicketCard({ ticket }: TicketCardProps) {
  const parentFullName = `${ticket.parent_first_name} ${ticket.parent_last_name}`;

  const createdAtLabel = new Date(ticket.created_at).toLocaleString("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const iconType = getTicketIconType(ticket.category_name);

  return (
    <article className={styles.card} data-type={iconType}>
      <div className={styles.leftPanel} aria-hidden="true">
        <div className={styles.iconCircle}>
          <TicketIcon type={iconType} className={styles.icon} />
        </div>
      </div>

      <div className={styles.body}>
        <header className={styles.header}>
          <h2 className={styles.parentName}>{parentFullName}</h2>

          <span className={styles.category} aria-label="Catégorie">
            {ticket.category_name}
          </span>
        </header>

        <p className={styles.content}>{ticket.content}</p>

        <time className={styles.date} dateTime={ticket.created_at}>
          {createdAtLabel}
        </time>
      </div>
    </article>
  );
}

export default TicketCard;
