import { type ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { TicketCategory } from "../../types/TicketCategoryType";
import type { Ticket } from "../../types/TicketType";
import CategoryFormButton from "../CategoryFormButton/CategoryFormButton";
import styles from "./TicketForm.module.css";

type TicketFormProps = {
  children: ReactNode;
  // defaultValue: Ticket;
  onSubmit: (ticket: Ticket) => void;
};

type Student = {
  id: number;
  first_name: string;
};

function TicketForm({ children, onSubmit }: TicketFormProps) {
  const [ticketCategories, setTicketCategories] = useState<TicketCategory[]>(
    [],
  );
  const [students, setStudents] = useState<Student[]>([]);
  const [content, setContent] = useState<string>("");
  const [validateWarning, setValidateWarning] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/ticket-categories`)
      .then((response) => response.json())
      .then((data) => {
        setTicketCategories(data);
      });

    fetch(`${import.meta.env.VITE_API_URL}/api/students`)
      .then((response) => response.json())
      .then((students) => {
        setStudents(students);
      });
  }, []);

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
        const student_ids = (formData.getAll("student_ids[]") as string[]).map(
          Number,
        );

        if (
          content.length === 0 ||
          student_ids.length === 0 ||
          !ticket_category_id
        ) {
          setValidateWarning(true);
          return;
        }

        onSubmit({
          content,
          parent_id,
          ticket_category_id,
          student_ids,
        });
      }}
    >
      <h1 className="primary-title">Nouvelle Demande</h1>
      <p className={styles.form_instructions}>
        Choisissez un motif, sélectionnez le ou les enfants concernés, puis
        rédigez votre message.
      </p>
      <fieldset className={styles.fieldset_categories}>
        <legend className={styles.form_label}>Motif de la demande* :</legend>
        <ul>
          {ticketCategories.map((category) => (
            <li key={category.id}>
              <CategoryFormButton
                category={category}
                formName="ticket_category_id"
              />
            </li>
          ))}
        </ul>
      </fieldset>

      <fieldset className={styles.fieldset_names}>
        <div className={styles.fieldset_names_wrapper}>
          <legend className={styles.form_label}>
            Étudiant(s) concerné(s)* :
          </legend>
          <ul>
            {students.map((student) => (
              <li key={student.id}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  id={`student-${student.id}`}
                  name="student_ids[]"
                  aria-required="true"
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
        <legend className={styles.form_label}>Message* :</legend>
        <div className={styles.textarea_wrapper}>
          <textarea
            id="content"
            name="content"
            aria-required="true"
            className={styles.textarea}
            maxLength={1000}
            placeholder="Expliquez votre demande (contexte, date, détails utiles...)"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <p className={styles.charcter_counter}>{content.length} / 1000</p>
        </div>
      </fieldset>

      {validateWarning && (
        <p className={styles.warning}>
          Veuillez remplir tous les champs obligatoires (indiqués par *).
        </p>
      )}

      <div className={styles.ticket_buttons_container}>
        <button
          onClick={() => navigate("/")}
          type="button"
          className="non-primary-button"
        >
          Retourner à l'accueil
        </button>
        <button type="submit" className="primary-button">
          {children}
        </button>
      </div>
    </form>
  );
}

export default TicketForm;
