import { useState } from "react";
import { useNavigate } from "react-router";
import TicketForm from "../../components/TicketForm/TicketForm";
import styles from "./TicketNew.module.css";

function TicketNew() {
  const [formSent, setFormSent] = useState(false);
  const navigate = useNavigate();

  // const defaultTicket = {
  //   content: "",
  //   parent_id: undefined,
  //   ticket_category_id: undefined,
  //   student_ids: [],
  // };

  return (
    <main className="parent-background">
      {formSent ? (
        <div className={styles.confirmation_form}>
          <p>Votre ticket a été bien envoyé!</p>
          <div className={styles.ticket_buttons_container}>
            <button
              onClick={() => navigate("/")}
              type="button"
              className="non-primary-button"
            >
              Retourner à l'accueil
            </button>
            <button
              onClick={() => setFormSent(false)}
              type="submit"
              className="primary-button"
            >
              Nouvelle Demande
            </button>
          </div>
        </div>
      ) : (
        <TicketForm
          // defaultValue={defaultTicket}
          onSubmit={(ticketData) => {
            console.log(ticketData);
            //à supprimer
            fetch(`${import.meta.env.VITE_API_URL}/api/tickets`, {
              method: "post",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(ticketData),
            })
              .then((response) => response.json())
              .then(() => setFormSent(true));
          }}
        >
          Envoyer
        </TicketForm>
      )}
    </main>
  );
}

export default TicketNew;
