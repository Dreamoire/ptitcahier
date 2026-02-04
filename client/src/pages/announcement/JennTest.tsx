import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import JennForm from "./JennForm";
import styles from "./JennTest.module.css";

type AnnouncementCategory = { id: number; name: string };
type Classroom = { id: number; name: string };
type Student = {
  id: number;
  firstname: string;
  lastname: string;
  classroomId: number;
  classroomName: string;
};

function JennTest() {
  const [announcementCategories, setAnnouncementCategories] = useState<
    AnnouncementCategory[]
  >([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [formSent, setFormSent] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/announcements-categories`)
      .then((res) => res.json())
      .then((announcementCategories) =>
        setAnnouncementCategories(announcementCategories),
      );

    fetch(`${import.meta.env.VITE_API_URL}/api/classrooms`)
      .then((res) => res.json())
      .then((classrooms) => setClassrooms(classrooms));

    fetch(`${import.meta.env.VITE_API_URL}/api/students`)
      .then((res) => res.json())
      .then((students) => setStudents(students));
  }, []);

  return (
    <main className="parent-background">
      {formSent ? (
        <div className={styles.confirmation_form}>
          {error ? <p>{error}</p> : <p>Votre ANNONCE a été bien envoyé!</p>}
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
              Nouvelle ANNONCE
            </button>
          </div>
        </div>
      ) : (
        <JennForm
          announcementCategories={announcementCategories}
          classrooms={classrooms}
          students={students}
          onSubmit={(newAnnouncement) => {
            fetch(`${import.meta.env.VITE_API_URL}/api/announcements`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newAnnouncement),
            })
              .then((response) => response.ok)
              .then((ok) => {
                if (!ok) {
                  setError(
                    "Une erreur est survenue. Veuillez renvoyer votre demande.",
                  );
                }
                setFormSent(true);
              });
          }}
        />
      )}
    </main>
  );
}

export default JennTest;
