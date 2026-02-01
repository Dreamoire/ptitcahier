import { useCallback, useEffect, useRef, useState } from "react";

import type { Ticket } from "../../types/Ticket";
import TicketIcon, { type TicketIconType } from "../TicketCard/TicketIcon";
import styles from "./TicketModalViewSchool.module.css";

type TicketModalViewSchoolProps = {
  ticket: Ticket;
  onCloseComplete: () => void;
};

function TicketModalViewSchool({
  ticket,
  onCloseComplete,
}: TicketModalViewSchoolProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const requestClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        requestClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [requestClose]);

  const ticketType: TicketIconType =
    ticket.ticketCategoryName === "Urgence"
      ? "urgent"
      : ticket.ticketCategoryName === "Autorisation"
        ? "events"
        : ticket.ticketCategoryName === "Absence"
          ? "notice"
          : "news";

  const createdAtLabel = new Date(ticket.createdAt).toLocaleString("fr-FR", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ""}`}>
      <button
        type="button"
        className={styles.backdrop}
        onClick={requestClose}
        aria-label="Fermer la fenêtre"
      />

      <dialog
        ref={(node) => {
          dialogRef.current = node;
        }}
        className={`${styles.modal} ${isOpen ? styles.modalOpen : ""}`}
        open
        aria-label="Détails du ticket"
        onTransitionEnd={(event) => {
          const isDialogTransition = event.target === dialogRef.current;
          if (isDialogTransition && !isOpen) {
            onCloseComplete();
          }
        }}
      >
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <div
              className={`${styles.iconBadge} ${styles[ticketType]}`}
              aria-hidden="true"
            >
              <TicketIcon type={ticketType} className={styles.icon} />
            </div>

            <h2 className={styles.title}>Ticket</h2>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={requestClose}
            aria-label="Fermer la fenêtre"
          >
            ×
          </button>
        </header>

        <div className={styles.meta}>
          <p className={styles.line}>
            <span className={styles.label}>Catégorie :</span>{" "}
            {ticket.ticketCategoryName}
          </p>
          <p className={styles.line}>
            <span className={styles.label}>Parent :</span>{" "}
            {ticket.parentFirstName} {ticket.parentLastName}
          </p>
          <p className={styles.line}>
            <span className={styles.label}>Élève(s) :</span>{" "}
            {ticket.studentNames}
          </p>
          <p className={styles.line}>
            <span className={styles.label}>Créé :</span>{" "}
            <time dateTime={ticket.createdAt}>{createdAtLabel}</time>
          </p>
        </div>

        <div className={styles.content}>
          <p className={styles.contentText}>{ticket.content}</p>
        </div>
      </dialog>
    </div>
  );
}

export default TicketModalViewSchool;
