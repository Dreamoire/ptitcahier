import { useEffect, useState } from "react";
import CategoryFormButton from "../CategoryFormButton/CategoryFormButton";

interface ticketCategory {
  id: number;
  name: string;
}

function TicketForm() {
  const [ticketCategories, setTicketCategories] = useState<ticketCategory[]>(
    [],
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/ticket-categories`)
      .then((response) => response.json())
      .then((data) => {
        setTicketCategories(data);
      });
  }, []);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <h1>Nouvelle Demande</h1>
      <ul>
        {ticketCategories.map((category) => (
          <li key={category.id}>
            <CategoryFormButton categoryName={category.name} />
          </li>
        ))}
      </ul>

      <label htmlFor="">Message</label>
      <input type="text" id="message" />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TicketForm;
