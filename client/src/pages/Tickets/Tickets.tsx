import styles from "./Tickets.module.css";

function Tickets() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <section className={styles.statusRow} aria-label="Statuts des tickets">
          <button
            className={`${styles.statusPill} ${styles.statusPillActive}`}
            type="button"
          >
            <span className={styles.statusLabel}>Total</span>
            <span className={styles.statusDivider} aria-hidden="true" />
            <span className={styles.statusCount}>9</span>
          </button>

          <button className={styles.statusPill} type="button">
            <span className={styles.statusLabel}>Traité</span>
            <span className={styles.statusDivider} aria-hidden="true" />
            <span className={styles.statusCount}>4</span>
          </button>

          <button className={styles.statusPill} type="button">
            <span className={styles.statusLabel}>Non traité</span>
            <span className={styles.statusDivider} aria-hidden="true" />
            <span className={styles.statusCount}>5</span>
          </button>
        </section>

        <section className={styles.contentArea} aria-label="Contenu">
          {/* Ici: filtres catégories + tri + liste de TicketCard */}
        </section>
      </div>
    </main>
  );
}

export default Tickets;
