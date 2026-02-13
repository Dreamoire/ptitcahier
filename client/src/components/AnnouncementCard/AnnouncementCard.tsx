import { useEffect, useRef, useState } from "react";
import type { Announcement } from "../../types/Announcement";
import styles from "./AnnouncementCard.module.css";

type AnnouncementCardProps = {
  announcement: Announcement;
  userRole: "parent" | "school";
  variant?: "default" | "dashboard";
};

function AnnouncementCard({
  announcement,
  userRole,
  variant = "default",
}: AnnouncementCardProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const dialogReference = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogReference.current;
    if (!dialogElement) return;

    if (isImageOpen) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
  }, [isImageOpen]);

  const closeDialogOnBackdrop = (event: React.MouseEvent) => {
    if (event.target === dialogReference.current) {
      setIsImageOpen(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsImageOpen(false);
    }
  };

  const formattedDate = new Date(announcement.createdAt).toLocaleDateString(
    "fr-FR",
    {
      dateStyle: "medium",
    },
  );

  const studentList = announcement.studentNames
    ? announcement.studentNames.split(",").map((name) => name.trim())
    : [];

  const rowsClassrooms = announcement.classroomNames
    ? announcement.classroomNames.split(",").map((c) => c.trim())
    : [];

  const counts: Record<string, number> = {};
  for (const name of rowsClassrooms) {
    counts[name] = (counts[name] || 0) + 1;
  }

  const classroomsWithCounts = Object.keys(counts).map((name) => ({
    name: name,
    count: counts[name],
  }));

  const getCategoryStyle = (categoryName: string) => {
    switch (categoryName) {
      case "Vie de l'école":
        return styles.an_badge_school_life;
      case "Administratif":
        return styles.an_badge_admin;
      case "Evénement":
        return styles.an_badge_event;
      case "Classe":
        return styles.an_badge_class;
      default:
        return styles.an_badge_default;
    }
  };

  return (
    <article
      className={`${styles.ann_card} ${variant === "dashboard" ? styles.card_dashboard : ""}`}
    >
      <section className={styles.content_card}>
        <header>
          <h2 className={styles.title}>{announcement.title}</h2>
        </header>

        <button
          type="button"
          className={styles.imageTrigger}
          onClick={() => setIsImageOpen(true)}
        >
          <img
            src={`https://picsum.photos/seed/${announcement.id}/800/600`}
            alt="Illustration"
            className={styles.mainImage}
          />
        </button>

        <p className={styles.text}>{announcement.content}</p>

        <footer className={styles.footerInfo}>
          <time className={styles.dateLabel}>Publié le {formattedDate}</time>
        </footer>
      </section>

      <aside className={styles.badgeSidebar}>
        <span
          className={getCategoryStyle(announcement.announcementCategoryName)}
        >
          {announcement.announcementCategoryName}
        </span>

        {userRole === "school" && (
          <ul className={styles.tagList}>
            {(announcement.totalStudents || 0) > 0 &&
            (announcement.studentCount || 0) >=
              (announcement.totalStudents || 0) - 2 ? (
              <li className={styles.an_badge_all_school}>Toutes les classes</li>
            ) : (announcement.studentCount || 0) > 5 ? (
              <>
                {classroomsWithCounts.map((item) => (
                  <li key={item.name} className={styles.an_badge_class}>
                    {item.name} ({item.count})
                  </li>
                ))}
                <li className={styles.an_count_tag}>
                  Total élèves: {announcement.studentCount}
                </li>
              </>
            ) : (
              studentList.map((studentName) => (
                <li key={studentName} className={styles.an_student_tag}>
                  {studentName}
                </li>
              ))
            )}
          </ul>
        )}

        {userRole === "parent" && studentList.length > 0 && (
          <ul className={styles.tagList}>
            {studentList.map((studentName) => (
              <li key={studentName} className={styles.an_student_tag}>
                {studentName}
              </li>
            ))}
          </ul>
        )}
      </aside>

      <dialog
        ref={dialogReference}
        className={styles.imageModal}
        onClick={closeDialogOnBackdrop}
        onKeyDown={handleKeyDown}
      >
        <div className={styles.modalWrapper}>
          <button
            type="button"
            className={styles.closeButton}
            onClick={() => setIsImageOpen(false)}
          >
            &times;
          </button>
          <img
            src={`https://picsum.photos/seed/${announcement.id}/1200/800`}
            alt="Zoom"
            className={styles.fullSizeImage}
          />
        </div>
      </dialog>
    </article>
  );
}

export default AnnouncementCard;
