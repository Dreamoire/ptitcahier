import TicketForm from "../../components/TicketForm/TicketForm";

function TicketNew() {
  const newTicket = {
    content: "",
    parent_id: undefined,
    ticket_category_id: undefined,
  };

  return (
    <main className="parent-rainbow-light">
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
