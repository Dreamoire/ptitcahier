import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import TicketForm from "../../components/TicketForm/TicketForm";
import type { OutletAuthContext } from "../../types/OutletAuthContext";
import type { Student } from "../../types/Student";
import type { TicketCategory } from "../../types/TicketCategory";
import styles from "./TicketNew.module.css";

function TicketNew() {
  const [ticketCategories, setTicketCategories] = useState<TicketCategory[]>(
    [],
  );
  const [students, setStudents] = useState<Student[]>([]);
  const [formSent, setFormSent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { auth } = useOutletContext<OutletAuthContext>();
  const [loadingError, setLoadingError] = useState<boolean>(false);

  useEffect(() => {
    const headers = { Authorization: `Bearer ${auth?.token}` };

    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/ticket-categories`, {
        headers,
      }).then((res) => {
        if (!res.ok) {
          setLoadingError(true);
          return;
        }
        return res.json();
      }),

      fetch(`${import.meta.env.VITE_API_URL}/api/parents/me/students`, {
        headers,
      }).then((res) => {
        if (!res.ok) {
          setLoadingError(true);
          return;
        }
        return res.json();
      }),
    ]).then(([ticketCategories, students]) => {
      if (!ticketCategories || !students) return;
      setTicketCategories(ticketCategories);
      setStudents(students);
    });
  }, [auth]);

  return (
    <main className="parent-background">
      {formSent ? (
        <div className={styles.confirmation_form}>
          {error ? <p>{error}</p> : <p>Votre ticket a été bien envoyé!</p>}
          <div className={styles.ticket_buttons_container}>
            <button
              onClick={() => navigate("/parent/tickets")}
              type="button"
              className="non-primary-button"
            >
              Retourner aux demandes
            </button>
            <button
              onClick={() => {
                setFormSent(false);
                setError(null);
              }}
              type="button"
              className="primary-button"
            >
              Nouvelle Demande
            </button>
          </div>
        </div>
      ) : loadingError ? (
        <p className="general_error_message">
          Échec de la chargement du formulaire
        </p>
      ) : (
        <TicketForm
          ticketCategories={ticketCategories}
          students={students}
          onSubmit={(newTicket) => {
            setError(null);
            fetch(`${import.meta.env.VITE_API_URL}/api/parents/tickets`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${auth?.token}`,
              },
              body: JSON.stringify(newTicket),
            })
              .then((response) => response.ok)
              .then((ok) => {
                if (!ok) {
                  setError("Mode démo — données non enregistrées.");
                  setFormSent(true);
                  return;
                }
                setFormSent(true);
              });
          }}
        />
      )}
    </main>
  );
}

export default TicketNew;
