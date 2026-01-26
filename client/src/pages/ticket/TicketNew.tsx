import { useState } from "react";
import { useNavigate } from "react-router";
import TicketForm from "../../components/TicketForm/TicketForm";
import styles from "./TicketNew.module.css";

function TicketNew() {
  const [formSent, setFormSent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <main className="parent-background">
      {formSent ? (
        <div className={styles.confirmation_form}>
          {error ? <p>{error}</p> : <p>Votre ticket a été bien envoyé!</p>}
          <div className={styles.ticket_buttons_container}>
            <button
              onClick={() => navigate("/")}
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
              type="submit"
              className="primary-button"
            >
              Nouvelle Demande
            </button>
          </div>
        </div>
      ) : (
        <>
          <TicketForm
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
          >
            Envoyer
          </TicketForm>
        </>
      )}
    </main>
  );
}

export default TicketNew;
