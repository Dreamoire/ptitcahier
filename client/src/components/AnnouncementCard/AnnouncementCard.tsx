import type { Announcement } from "../../types/AnnouncementType";
import styles from "./AnnouncementCard.module.css";

function AnnouncementCard({
  title,
  content,
  created_at,
  first_name,
  announcement_category_name,
}: Announcement) {
  const formatDate = new Date(created_at).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className={styles.an_card}>
      <header>
        <h3 className={styles.an_card_h3}>{title}</h3>
        <p className={styles.an_card_p}>{announcement_category_name}</p>
        <p className={styles.an_card_p}>{first_name}</p>
      </header>

      <p className={styles.an_card_p}>{content}</p>

      <footer>
        <time>{formatDate}</time>
      </footer>
    </article>
  );
}

export default AnnouncementCard;
