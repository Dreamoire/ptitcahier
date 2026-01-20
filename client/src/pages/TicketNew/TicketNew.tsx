import { useState } from "react";
import TicketForm from "../../components/TicketForm/TicketForm";

function TicketNew() {
  const [formSent, setFormSent] = useState(false);

  const newTicket = {
    content: "",
    parent_id: undefined,
    ticket_category_id: undefined,
    student_ids: [],
  };

  return (
    <main className="parent-background">
      {formSent ? (
        <div>
          <p>All good!</p>
        </div>
      ) : (
        <TicketForm
          defaultValue={newTicket}
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
