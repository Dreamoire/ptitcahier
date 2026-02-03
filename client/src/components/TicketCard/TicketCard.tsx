import type { Ticket } from "../../types/Ticket";
import styles from "./TicketCard.module.css";
import TicketIcon, { type TicketIconType } from "./TicketIcon";

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
  const parentFullName = `${ticket.parentFirstName} ${ticket.parentLastName}`;

  const createdAtLabel = new Date(ticket.createdAt).toLocaleString("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const iconType = getTicketIconType(ticket.ticketCategoryName);

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
        </header>

        <p className={styles.content}>{ticket.content}</p>

        <time className={styles.date} dateTime={ticket.createdAt}>
          {createdAtLabel}
        </time>
      </div>
    </article>
  );
}

export default TicketCard;
