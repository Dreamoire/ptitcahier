import type { Announcement } from "../../types/Announcement";
import styles from "./AnnouncementCard.module.css";

type AnnouncementCardProps = {
  announcement: Announcement;
};

function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const formattedDate = new Date(announcement.created_at).toLocaleDateString(
    "fr-FR",
    {
      dateStyle: "medium",
    },
  );

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
        <h2 className="card-title">{announcement.title}</h2>
        <div className={styles.an_badges_container}>
          <span
            className={`${styles.an_badge} ${categoryStyle(announcement.announcement_category_name)}`}
          >
            <span className="sr-only">Catégorie des annonces : </span>
            {announcement.announcement_category_name}
          </span>
          {announcement.student_names && (
            <span className={styles.an_student_tag}>
              <span className="sr-only">nom de l'enfant : </span>
              {announcement.student_names}
            </span>
          )}
        </div>
      </header>
      <p className="text">{announcement.content}</p>
      <footer className={styles.an_card_footer}>
        <time className={styles.an_date} dateTime={announcement.created_at}>
          {formattedDate}
        </time>
      </footer>
    </article>
  );
}

export default AnnouncementCard;
