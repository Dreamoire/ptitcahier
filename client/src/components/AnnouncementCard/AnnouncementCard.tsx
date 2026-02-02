import type { Announcement } from "../../types/Announcement";
import styles from "./AnnouncementCard.module.css";

type AnnouncementCardProps = {
  announcement: Announcement;
  variant?: "default" | "dashboard";
};

function AnnouncementCard({
  announcement,
  variant = "default",
}: AnnouncementCardProps) {
  const formattedDate = new Date(announcement.createdAt).toLocaleDateString(
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
    <article
      className={`${styles.an_card} ${variant === "dashboard" ? styles.an_card_dashboard : styles.list}`}
    >
      <header className={styles.an_card_header}>
        <h2 className="card-title">{announcement.title}</h2>
        <div className={styles.an_badges_container}>
          <span
            className={`${styles.an_badge} ${categoryStyle(announcement.announcementCategoryName)}`}
          >
            <span className="sr-only">Catégorie des annonces : </span>
            {announcement.announcementCategoryName}
          </span>
          {announcement.studentNames && (
            <span className={styles.an_student_tag}>
              <span className="sr-only">nom de l'enfant : </span>
              {announcement.studentNames}
            </span>
          )}
        </div>
      </header>

      {variant === "dashboard" && (
        <div className={styles.imageContainer}>
          <img
            src={`https://picsum.photos/seed/${announcement.id}/400/200`}
            alt="Illustration"
            className={styles.realImage}
          />
        </div>
      )}
      <p className="text">{announcement.content}</p>
      <footer className={styles.an_card_footer}>
        <time className={styles.an_date} dateTime={announcement.createdAt}>
          {formattedDate}
        </time>
      </footer>
    </article>
  );
}

export default AnnouncementCard;
