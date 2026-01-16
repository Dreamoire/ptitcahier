import { type ReactNode, useEffect, useState } from "react";
import type { TicketCategory } from "../../types/TicketCategoryType";
import type { Ticket } from "../../types/TicketType";
import CategoryFormButton from "../CategoryFormButton/CategoryFormButton";
import styles from "./TicketForm.module.css";

interface TicketFormProps {
  children: ReactNode;
  defaultValue: Ticket;
  onSubmit: (ticket: Ticket) => void;
}

function TicketForm({ children, defaultValue, onSubmit }: TicketFormProps) {
  const [ticketCategories, setTicketCategories] = useState<TicketCategory[]>(
    [],
  );

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/ticket-categories`)
      .then((response) => response.json())
      .then((data) => {
        setTicketCategories(data);
      });
  }, []);

  console.log(ticketCategories);
  // à supprimer
  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const content = formData.get("content") as string;
        const parent_id = 1;
        const ticket_category_id = Number(
          formData.get("ticket_category_id"),
        ) as number;

        onSubmit({
          content,
          parent_id,
          ticket_category_id,
        });
      }}
    >
      <h1>Nouvelle Demande</h1>
      <ul className={styles.category_container}>
        {ticketCategories.map((category, index) => (
          <li key={category.id}>
            <CategoryFormButton
              category={category}
              formName="ticket_category_id"
              defaultChecked={index === 0}
            />
          </li>
        ))}
      </ul>

      <label htmlFor="content">
        Message:{" "}
        <input
          type="text"
          id="content"
          name="content"
          defaultValue={defaultValue.content}
          placeholder="Placeholder message..."
          required
        />
      </label>
      <div>
        <button type="button">Annuler</button>
        <button type="submit">{children}</button>
      </div>
    </form>
  );
}

export default TicketForm;
