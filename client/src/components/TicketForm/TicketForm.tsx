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

  const exampleStudents = [
    { id: 1, first_name: "Jessica" },
    { id: 2, first_name: "Clara" },
  ];

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const content = formData.get("content") as string;
        const parent_id = 1;
        //parent Id hard coded for now
        const ticket_category_id = Number(
          formData.get("ticket_category_id"),
        ) as number;
        const student_ids = formData.getAll("student_ids[]") as string[];

        onSubmit({
          content,
          parent_id,
          ticket_category_id,
          student_ids,
        });
      }}
    >
      <h1 className="form-title">Nouvelle Demande</h1>

      <fieldset className={styles.fieldset_categories}>
        <legend className={styles.form_label}>Motif de la demande :</legend>
        <ul>
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
      </fieldset>

      <fieldset className={styles.fieldset_names}>
        <div className={styles.fieldset_names_wrapper}>
          <legend className={styles.form_label}>
            Étudiant(s) concerné(s) :
          </legend>
          <ul>
            {exampleStudents.map((student) => (
              <li key={student.id}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id={`student-${student.id}`}
                  name="student_ids[]"
                  value={student.id}
                />
                <label
                  htmlFor={`student-${student.id}`}
                  className={styles.checkbox_label}
                >
                  {student.first_name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </fieldset>

      <fieldset className={styles.fieldset_message}>
        <legend className={styles.form_label}>Message :</legend>

        <textarea
          id="content"
          name="content"
          className={styles.ticket_content}
          defaultValue={defaultValue.content}
          placeholder="Placeholder message..."
          maxLength={1000}
          required
        />
      </fieldset>

      <div className={styles.ticket_buttons_container}>
        <button type="button" className={styles.button_cancel}>
          Annuler
        </button>
        <button type="submit" className={styles.button_send}>
          {children}
        </button>
      </div>
    </form>
  );
}

export default TicketForm;
