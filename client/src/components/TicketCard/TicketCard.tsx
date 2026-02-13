import type { Ticket } from "../../types/Ticket";
import styles from "./TicketCard.module.css";
import TicketIcon, { type TicketIconType } from "./TicketIcon";

type UserRole = "parent" | "school";

type TicketCardProps = {
  ticket: Ticket;
  onClick: (ticket: Ticket) => void;
  variant?: "default" | "dashboard";
  userRole: UserRole;
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

function TicketCard({
  ticket,
  onClick,
  variant = "default",
  userRole,
}: TicketCardProps) {
  const parentFullName = `${ticket.parentFirstName} ${ticket.parentLastName}`;

  const nameTitle =
    userRole === "parent"
      ? `Demande pour ${ticket.studentNames}`
      : parentFullName;

  const createdAtLabel = new Date(ticket.createdAt).toLocaleString("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const iconType = getTicketIconType(ticket.ticketCategoryName);

  return (
    <article
      className={`${styles.card} ${
        variant === "dashboard" ? styles.card_dashboard : ""
      }`}
      data-type={iconType}
    >
      <div className={styles.leftPanel} aria-hidden="true">
        <div className={styles.iconCircle}>
          <TicketIcon type={iconType} className={styles.icon} />
        </div>
      </div>

      <div className={styles.body}>
        <header className={styles.header}>
          {variant !== "dashboard" && (
            <h2 className={styles.nameTitle}>{nameTitle}</h2>
          )}
        </header>
        <p className={styles.content}>{ticket.content}</p>

        <time className={styles.date} dateTime={ticket.createdAt}>
          {createdAtLabel}
        </time>
      </div>

      <button
        type="button"
        className={styles.cardButton}
        onClick={() => onClick(ticket)}
        aria-label={`Ouvrir le ticket de ${parentFullName}`}
      >
        <div className={styles.leftPanel} aria-hidden="true">
          <div className={styles.iconCircle}>
            <TicketIcon type={iconType} className={styles.icon} />
          </div>
        </div>

        <div className={styles.body}>
          <header className={styles.header}>
            {variant !== "dashboard" ? (
              <h2 className={styles.parentName}>{parentFullName}</h2>
            ) : null}
          </header>

          <p className={styles.content}>{ticket.content}</p>

          <time className={styles.date} dateTime={ticket.createdAt}>
            {createdAtLabel}
          </time>
        </div>
      </button>
    </article>
  );
}

export default TicketCard;
