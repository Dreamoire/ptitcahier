import { Link } from "react-router";
import styles from "./AnnouncementsSchoolView.module.css";

const AnnouncementsSchoolView = () => {
  return (
    <div className={styles.announcements_page}>
      <div className={styles.announcements_content}>
        <h1 className={styles.announcement_title}>Annonces</h1>
        <Link
          to="/school/announcements/new"
          className={`${styles.primary_button} ${styles.create_announcement_button}`}
        >
          Nouvelle annonce
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementsSchoolView;
