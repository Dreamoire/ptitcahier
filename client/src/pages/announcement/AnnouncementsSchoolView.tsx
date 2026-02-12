// import { useEffect, useState } from "react";
import { Link } from "react-router";
// import type { Announcement } from "../../types/Announcement";
import styles from "./AnnouncementsSchoolView.module.css";

const AnnouncementsSchoolView = () => {
  return (
    <main className="parent-background">
      <header className={styles.an_title}>
        <h1 className="primary-title">Annonces publiées</h1>
      </header>
      <Link
        to="/school/announcements/new"
        className={`${styles.primary_button} ${styles.create_announcement_button}`}
      >
        Nouvelle annonce
      </Link>
    </main>
  );
};

export default AnnouncementsSchoolView;
