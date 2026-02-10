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

  if (!auth) return;

  useEffect(() => {
    const headers = { Authorization: `Bearer ${auth.token}` };

    Promise.all([
      fetch(`${import.meta.env.VITE_API_URL}/api/ticket-categories`, {
        headers,
      }).then((res) => res.json()),

      fetch(`${import.meta.env.VITE_API_URL}/api/parents/me/students`, {
        headers,
      }).then((res) => {
        if (!res.ok) {
          navigate("/redirection");
          return null;
        }
        return res.json();
      }),
    ]).then(([ticketCategories, students]) => {
      setTicketCategories(ticketCategories);
      setStudents(students);
    });
  }, [auth, navigate]);

  return (
    <main className="parent-background">
      {formSent ? (
        <div className={styles.confirmation_form}>
          {error ? <p>{error}</p> : <p>Votre ticket a été bien envoyé!</p>}
          <div className={styles.ticket_buttons_container}>
            <button
              onClick={() => navigate(`/${auth.role}/home`)}
              type="button"
              className="non-primary-button"
            >
              Retour à l'accueil
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
      ) : (
        <>
          <TicketForm
            ticketCategories={ticketCategories}
            students={students}
            onSubmit={(newTicket) => {
              setError(null);
              fetch(`${import.meta.env.VITE_API_URL}/api/tickets`, {
                method: "post",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${auth.token}`,
                },
                body: JSON.stringify(newTicket),
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
        </>
      )}
    </main>
  );
}

export default TicketNew;
