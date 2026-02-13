import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import type { AnnouncementCategory } from "../../types/AnnouncementCategory";
import type { OutletAuthContext } from "../../types/OutletAuthContext";
import AnnouncementForm from "./AnnouncementForm";
import styles from "./AnnouncementNew.module.css";

type Classroom = { id: number; name: string };
type Student = {
  id: number;
  firstname: string;
  lastname: string;
  classroomId: number;
  classroomName: string;
};

function AnnouncementNew() {
  const [announcementCategories, setAnnouncementCategories] = useState<
    AnnouncementCategory[]
  >([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [formSent, setFormSent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { auth } = useOutletContext<OutletAuthContext>();

  useEffect(() => {
    const headers = { Authorization: `Bearer ${auth?.token}` };

    fetch(`${import.meta.env.VITE_API_URL}/api/announcement-categories`, {
      headers,
    })
      .then((res) => res.json()) //handle errors
      .then((announcementCategories) => {
        //typing
        if (!announcementCategories) return;
        setAnnouncementCategories(announcementCategories);
      });

    fetch(`${import.meta.env.VITE_API_URL}/api/schools/me/students`, {
      headers,
    })
      .then((res) => res.json()) //handle errors
      .then((students: Student[] | undefined) => {
        if (!students) return;
        setStudents(students);
      });
  }, [auth]);

  const classrooms = (): Classroom[] => {
    const classroomsById = new Map<number, string>();

    for (const student of students) {
      if (!classroomsById.has(student.classroomId)) {
        classroomsById.set(student.classroomId, student.classroomName);
      }
    }

    return Array.from(classroomsById.entries())
      .map(([id, name]) => ({ id, name }))
      .sort((a, b) => a.id - b.id);
  };

  return (
    <main className="school-background">
      {formSent ? (
        <div className={styles.confirmation_form}>
          {error ? <p>{error}</p> : <p>Votre annonce a bien été envoyée !</p>}
          <div className={styles.ticket_buttons_container}>
            <button
              onClick={() => navigate("/school/announcements")}
              type="button"
              className="non-primary-button"
            >
              Retourner à l'accueil
            </button>
            <button
              onClick={() => {
                setFormSent(false);
                setError(null);
              }}
              type="button"
              className="primary-button"
            >
              Nouvelle annonce
            </button>
          </div>
        </div>
      ) : (
        <AnnouncementForm
          announcementCategories={announcementCategories}
          classrooms={classrooms()}
          students={students}
          isSubmitting={isSubmitting}
          onSubmit={(newAnnouncement) => {
            setIsSubmitting(true);
            setError(null);
            fetch(`${import.meta.env.VITE_API_URL}/api/schools/announcements`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token}`,
              },
              body: JSON.stringify(newAnnouncement),
            });
            setFormSent(true);
            setIsSubmitting(false);
          }}
        />
      )}
    </main>
  );
}

export default AnnouncementNew;
