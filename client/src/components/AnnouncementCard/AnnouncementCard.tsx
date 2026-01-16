import type { Announcement } from "../../types/AnnouncementType";
import styles from "../AnnouncementCard/AnnouncementCard.module.css";

function AnnouncementCard({
  title,
  content,
  created_at,
  student_names,
  announcement_category_name,
}: Announcement) {
  const formatDate = new Date(created_at).toLocaleDateString("fr-FR", {
    dateStyle: "medium",
  });
  const categoryStyle = (category: string) => {
    switch (category) {
      case "Vie de l'école":
        return styles.an_badge_school_life;
      case "Administratif":
        return styles.an_badge_admin;
      case "Evénement":
        return styles.an_badge_event;
      default:
        return styles.an_badge_default;
    }
  };

  return (
    <article className={styles.an_card}>
      <header className={styles.an_card_header}>
        <h3 className={styles.an_card_h3}>{title}</h3>
        <div className={styles.an_badges_container}>
          <span
            className={`${styles.an_badge} ${categoryStyle(announcement_category_name)}`}
          >
            <span className="sr-only">Catégorie des annonces : </span>
            {announcement_category_name}
          </span>
          <span className={styles.an_student_tag}>
            <span className="sr-only">nom de l'enfant : </span>
            {student_names}
          </span>
        </div>
      </header>

      <p className={styles.an_card_p}>{content}</p>

      <footer>
        <time>{formatDate}</time>
      </footer>
    </article>
  );
}

export default AnnouncementCard;
