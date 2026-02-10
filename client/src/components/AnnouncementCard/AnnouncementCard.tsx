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
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isImageOpen) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
  }, [isImageOpen]);

  const closeDialogClick = (event: React.MouseEvent) => {
    if (event.target === dialogRef.current) {
      setIsImageOpen(false);
    }
  };

  useEffect(() => {
    const dialogElement = dialogRef.current;
    if (!dialogElement) return;

    if (isImageOpen) {
      dialogElement.showModal();
    } else {
      dialogElement.close();
    }
  }, [isImageOpen]);

  const formattedDate = new Date(announcement.createdAt).toLocaleDateString(
    "fr-FR",
    { dateStyle: "medium" },
  );

  const getCategoryStyle = (category: string): string => {
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

  const getTargetBadge = () => {
    if (userRole === "parent") {
      return {
        label: announcement.studentNames,
        style: styles.an_student_tag,
      };
    }

    const count = announcement.studentCount || 0;
    const total = announcement.totalStudents || 0;

    if (total > 0 && count >= total - 2) {
      return {
        label: "Toutes les classes",
        style: styles.an_school_tag,
      };
    }

    if (count > 5) {
      return {
        label: `${announcement.classroomNames} (${count} élèves)`,
        style: styles.an_class_tag,
      };
    }

    return {
      label:
        announcement.studentNames ||
        (count === 1 ? "1 élève" : `${count} élèves`),
      style: styles.an_student_tag,
    };
  };

  const targetBadge = getTargetBadge();

  return (
    <>
      <article
        className={`${styles.an_card} ${
          variant === "dashboard" ? styles.an_card_dashboard : styles.list
        }`}
      >
        <header className={styles.an_card_header}>
          <h2 className={styles.card_title}>{announcement.title}</h2>

          <div className={styles.an_badges_container}>
            <span
              className={`${styles.an_badge} ${getCategoryStyle(
                announcement.announcementCategoryName,
              )}`}
            >
              {announcement.announcementCategoryName}
            </span>
            {targetBadge.label && (
              <span className={targetBadge.style}>{targetBadge.label}</span>
            )}
          </div>
        </header>

        <button
          type="button"
          className={styles.imageContainer}
          onClick={() => setIsImageOpen(true)}
          aria-label="Agrandir l'image"
        >
          <img
            src={`https://picsum.photos/seed/${announcement.id}/800/600`}
            alt="Illustration de l'annonce"
            className={styles.realImage}
          />
        </button>

        <p className={styles.text}>{announcement.content}</p>

        <footer className={styles.an_card_footer}>
          <time
            className={styles.an_date}
            dateTime={String(announcement.createdAt)}
          >
            {formattedDate}
          </time>
        </footer>
      </article>

      {isImageOpen && (
        <dialog
          ref={dialogRef}
          className={styles.modal_dialog}
          onClick={closeDialogClick}
          onKeyDown={(e) => {
            if (e.key === "Escape") setIsImageOpen(false);
          }}
          onClose={() => setIsImageOpen(false)}
        >
          <div className={styles.modal_content}>
            <button
              type="button"
              className={styles.modal_close}
              onClick={() => setIsImageOpen(false)}
              aria-label="Fermer"
            >
              &times;
            </button>
            <img
              src={`https://picsum.photos/seed/${announcement.id}/1200/800`}
              alt="Vue agrandie"
              className={styles.modal_image}
            />
          </div>
        </dialog>
      )}
    </>
  );
}

export default AnnouncementCard;
