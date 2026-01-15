import TicketForm from "../../components/TicketForm/TicketForm";

function TicketNew() {
  const newTicket = {
    content: "",
    parent_id: 1,
    ticket_category_id: 1,
  };

  return (
    <main>
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
            .then();
        }}
      >
        Envoyer
      </TicketForm>
    </main>
  );
}

export default TicketNew;
