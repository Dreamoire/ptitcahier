import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ptit_cahier_logo_original from "../../assets/images/ptit_cahier_logo_original.png";
import ParentForm from "../../components/ParentForm/ParentForm";
import type { OutletAuthContext } from "../../types/OutletAuthContext";
import type { Parent } from "../../types/Parent";
import styles from "./ParentsTable.module.css";

const ParentsTable = () => {
  const [parents, setParents] = useState<Parent[]>([]);
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const { auth } = useOutletContext<OutletAuthContext>();

  useEffect(() => {
    if (!auth?.token) return;

    const headers = {
      Authorization: `Bearer ${auth.token}`,
    };

    const endpoints = [
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
      .then(([parents]) => {
        // const sortedParents = (parents as Parent[]).sort(
        //   (a, b) => (a.lastName || 0) - (b.lastName || 0),
        // );
        setParents(parents as Parent[]);
      })
      .catch(() => {
        setLoadingError(true);
      });
  }, [auth]);

  const deleteParent = (parentId: number) => {
    fetch(
      `${import.meta.env.VITE_API_URL}/api/schools/me/parents/${parentId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth?.token}`,
        },
      },
    ).then(() => {
      setParents((prev) => prev.filter((parent) => parent.id !== parentId));
    });
  };

  //   const saveUpdatedStudent = (updatedStudent: Partial<Student>) => {
  //     if (!selectedStudent) return;

  //     fetch(
  //       `${import.meta.env.VITE_API_URL}/api/schools/me/students/${selectedStudent.id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${auth?.token}`,
  //         },
  //         body: JSON.stringify(updatedStudent),
  //       },
  //     )
  //       .then((res) => {
  //         if (!res.ok) throw new Error("Erreur lors de la mise à jour");
  //         return res.json();
  //       })
  //       .then((fullUpdatedStudent: Student) => {
  //         setStudents((prev) =>
  //           prev.map((s) =>
  //             s.id === fullUpdatedStudent.id ? fullUpdatedStudent : s,
  //           ),
  //         );
  //         setSelectedStudent(null);
  //       })
  //       .catch(() => {
  //         alert("Impossible de mettre à jour l'étudiant. Réessayez.");
  //       });
  //   };

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
            <h1 className="primary-title">Gestion des parents</h1>
          </header>

          <button
            type="button"
            className={`primary-button ${styles.addParentButton}`}
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
                  <th>Mail</th>
                  <th>Civilité </th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th />
                </tr>
              </thead>

              <tbody>
                {parents.map((parent) => (
                  <tr key={parent.id} className={styles["students-table_row"]}>
                    <td>fix</td>
                    <td>{parent.parentGenre === "M" ? "M." : "Mme"}</td>
                    <td>{parent.lastName}</td>
                    <td>{parent.firstName}</td>
                    <td>
                      <button
                        type="button"
                        className={styles.edit_button}
                        onClick={() => setSelectedParent(parent)}
                        aria-label="Modifier le parent"
                      >
                        <Pencil
                          className={styles.edit_icon}
                          aria-hidden="true"
                        />
                      </button>

                      <button
                        type="button"
                        className={styles.delete_button}
                        onClick={() => deleteParent(parent.id)}
                        aria-label="Supprimer parent"
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
        </div>
      </div>

      {selectedParent && (
        <div className={styles.modal_overlay}>
          <div className={styles.modal_content}>
            <ParentForm
              parent={selectedParent}
              onCancel={() => setSelectedParent(null)}
              //   onSave={saveUpdatedParent}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default ParentsTable;
