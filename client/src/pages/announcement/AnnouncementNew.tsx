import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import AnnouncementForm from "./AnnouncementForm";
import styles from "./AnnouncementNew.module.css";

type AnnouncementCategory = { id: number; name: string };
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
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [formSent, setFormSent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/announcements-categories`)
      .then((res) => res.json())
      .then((announcementCategories) =>
        setAnnouncementCategories(announcementCategories),
      );

    fetch(`${import.meta.env.VITE_API_URL}/api/schools/me/classrooms`)
      .then((res) => res.json())
      .then((classrooms) => setClassrooms(classrooms));

    fetch(`${import.meta.env.VITE_API_URL}/api/schools/me/students`)
      .then((res) => res.json())
      .then((students) => setStudents(students));
  }, []);

  return (
    <main className="school-background">
      {formSent ? (
        <div className={styles.confirmation_form}>
          {error ? <p>{error}</p> : <p>Votre annonce a bien été envoyée !</p>}
          <div className={styles.ticket_buttons_container}>
            <button
              onClick={() => navigate("/school/home")}
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
          classrooms={classrooms}
          students={students}
          isSubmitting={isSubmitting}
          onSubmit={(newAnnouncement) => {
            setIsSubmitting(true);
            setError(null);
            fetch(`${import.meta.env.VITE_API_URL}/api/announcements`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newAnnouncement),
            })
              .then((response) => {
                if (!response.ok) {
                  throw new Error();
                }
              })
              .catch(() => {
                setError(
                  "Une erreur est survenue. Veuillez renvoyer votre annonce.",
                );
              })
              .finally(() => {
                setFormSent(true);
                setIsSubmitting(false);
              });
          }}
        />
      )}
    </main>
  );
}

export default AnnouncementNew;
