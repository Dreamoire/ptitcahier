import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import TicketForm from "../../components/TicketForm/TicketForm";
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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/ticket-categories`)
      .then((response) => response.json())
      .then((ticketCategories) => {
        setTicketCategories(ticketCategories);
      });

    fetch(`${import.meta.env.VITE_API_URL}/api/parents/me/students`)
      .then((response) => response.json())
      .then((students) => {
        setStudents(students);
      });
  }, []);

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
              type="submit"
              className="primary-button"
            >
              Nouvelle Demande
            </button>
          </div>
        </div>
      ) : (
        <TicketForm
          ticketCategories={ticketCategories}
          students={students}
          onSubmit={(newTicket) => {
            setError(null);
            fetch(`${import.meta.env.VITE_API_URL}/api/tickets`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
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
      )}
    </main>
  );
}

export default TicketNew;
