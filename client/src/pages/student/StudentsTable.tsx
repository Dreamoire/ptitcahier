import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ptit_cahier_logo_original from "../../assets/images/ptit_cahier_logo_original.png";
import StudentForm from "../../components/StudentForm/StudentForm";
import type { Classroom } from "../../types/Classroom";
import type { OutletAuthContext } from "../../types/OutletAuthContext";
import type { Parent } from "../../types/Parent";
import type { Student } from "../../types/Student";
import styles from "./StudentsTable.module.css";

const StudentsTable = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [parents, setParents] = useState<Parent[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { auth } = useOutletContext<OutletAuthContext>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth?.token) return;

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };

    const endpoints = [
      `${import.meta.env.VITE_API_URL}/api/schools/me/students`,
      `${import.meta.env.VITE_API_URL}/api/schools/me/classrooms`,
      `${import.meta.env.VITE_API_URL}/api/schools/me/parents`,
    ];

    Promise.all(
      endpoints.map((endpoint) =>
        fetch(endpoint, { headers }).then((response) => {
          if (!response.ok) {
            throw new Error("Échec lors de la récupération des données");
          }
          return response.json();
        }),
      ),
    )
      .then(([students, classrooms, parents]) => {
        setStudents(students as Student[]);
        setClassrooms(classrooms as Classroom[]);
        setParents(parents as Parent[]);
      })
      .catch(() => {
        setLoadingError(true);
      });
  }, [auth]);

  const deleteStudent = (studentId: number) => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/schools/me/students/${studentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      },
    ).then(() => {
      setStudents((prev) => prev.filter((student) => student.id !== studentId));
    });
  };

  const saveUpdatedStudent = (updatedStudent: Partial<Student>) => {
    if (!selectedStudent) return;

    fetch(
      `${import.meta.env.VITE_API_URL}/api/schools/me/students/${selectedStudent.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
        body: JSON.stringify(updatedStudent),
      },
    )
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors de la mise à jour");
        return res.json(); // <-- expect backend to return the full updated student
      })
      .then((fullUpdatedStudent: Student) => {
        setStudents((prev) =>
          prev.map((s) =>
            s.id === fullUpdatedStudent.id ? fullUpdatedStudent : s,
          ),
        );
        setSelectedStudent(null); // close modal
      })
      .catch(() => {
        alert("Impossible de mettre à jour l'étudiant. Réessayez.");
      });
  };

  return (
    <main>
      <div className="school-background">
        <div className={styles.container}>
          <header className={styles.header}>
            <img
              src={ptit_cahier_logo_original}
              alt="Le P'tit Cahier"
              className={styles.logo}
            />
            <h1 className="primary-title">Gestion des étudiants</h1>
          </header>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/school/parents/new")}
          >
            + Nouveau parent
          </button>

          {loadingError ? (
            <p className="general_error_message">
              Échec de la récupération de vos données
            </p>
          ) : (
            <table className={styles["students-table_table"]}>
              <thead>
                <tr>
                  <th>Classe</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Parent</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id} className={styles["students-table_row"]}>
                    <td>{student.classroomName || "N/A"}</td>
                    <td>{student.lastName}</td>
                    <td>{student.firstName}</td>
                    <td>
                      {student.parentLastName && student.parentFirstName
                        ? `${student.parentGenre === "M" ? "M." : "Mme"} ${student.parentLastName} ${student.parentFirstName}`
                        : ""}
                    </td>
                    <td>
                      <button
                        type="button"
                        className={styles.edit_button}
                        onClick={() => setSelectedStudent(student)}
                        aria-label="Modifier l'élève"
                      >
                        <Pencil
                          className={styles.edit_icon}
                          aria-hidden="true"
                        />
                      </button>

                      <button
                        type="button"
                        className={styles.delete_button}
                        onClick={() => deleteStudent(student.id)}
                        aria-label="Supprimer l'élève"
                      >
                        <Trash2
                          className={styles.delete_icon}
                          aria-hidden="true"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {selectedStudent && (
            <div className={styles.modal_overlay}>
              <div className={styles.modal_content}>
                <StudentForm
                  student={selectedStudent}
                  classrooms={classrooms}
                  parents={parents}
                  onCancel={() => setSelectedStudent(null)}
                  onSave={saveUpdatedStudent}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default StudentsTable;
