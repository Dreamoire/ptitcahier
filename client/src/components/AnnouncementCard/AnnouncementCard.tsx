import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Announcement } from "../../types/Announcement";
import AnnouncementContentTextarea from "../AnnouncementContentTextarea/AnnouncementContentTextarea";
import styles from "./AnnouncementCard.module.css";

type AnnouncementCardProps = {
  announcement: Announcement;
  userRole: "parent" | "school";
  variant?: "default" | "dashboard";
  onDelete?: (announcementId: number) => void | Promise<void>;
  onEdit?: (
    announcementId: number,
    nextContent: string,
  ) => boolean | Promise<boolean>;
};

function AnnouncementCard({
  announcement,
  userRole,
  variant = "default",
  onDelete,
  onEdit,
}: AnnouncementCardProps) {
  const [isImageOpen, setIsImageOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(announcement.content);
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

  useEffect(() => {
    if (!isEditing) {
      setContent(announcement.content);
    }
  }, [announcement.content, isEditing]);

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
  const canDelete = userRole === "school" && typeof onDelete === "function";
  const canEdit = userRole === "school" && typeof onEdit === "function";

  const startEditing = () => {
    setContent(announcement.content);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setContent(announcement.content);
  };

  const saveEditing = async () => {
    if (!onEdit) return;

    const trimmedContent = content.trim();
    if (trimmedContent.length === 0) {
      return;
    }

    if (trimmedContent === announcement.content.trim()) {
      setIsEditing(false);
      return;
    }

    const result = await onEdit(announcement.id, trimmedContent);

    if (result !== false) {
      setIsEditing(false);
    }
  };

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

        {isEditing ? (
          <div className={styles.edit_block}>
            <AnnouncementContentTextarea
              ariaLabel="Modifier le contenu de l'annonce"
              value={content}
              onChange={setContent}
            />
            <div className={styles.edit_actions}>
              <button
                type="button"
                className="non-primary-button"
                onClick={cancelEditing}
              >
                Annuler
              </button>
              <button
                type="button"
                className="primary-button"
                onClick={saveEditing}
                disabled={content.trim().length === 0}
              >
                Enregistrer
              </button>
            </div>
          </div>
        ) : (
          <p className={styles.text}>{announcement.content}</p>
        )}

        <footer className={styles.an_card_footer}>
          <time
            className={styles.an_date}
            dateTime={String(announcement.createdAt)}
          >
            {formattedDate}
          </time>
          {(canEdit || canDelete) && !isEditing && (
            <div className={styles.footer_actions}>
              {canEdit && (
                <button
                  type="button"
                  className={styles.edit_button}
                  onClick={startEditing}
                >
                  <Pencil className={styles.edit_icon} aria-hidden="true" />
                  <span className={styles.edit_label}>Modifier</span>
                </button>
              )}
              {canDelete && (
                <button
                  type="button"
                  className={styles.delete_button}
                  onClick={() => onDelete(announcement.id)}
                >
                  <Trash2 className={styles.delete_icon} aria-hidden="true" />
                  <span className={styles.delete_label}>Supprimer</span>
                </button>
              )}
            </div>
          )}
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
