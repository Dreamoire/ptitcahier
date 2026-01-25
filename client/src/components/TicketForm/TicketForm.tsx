import { type ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Student } from "../../types/Student";
import type { Ticket } from "../../types/Ticket";
import type { TicketCategory } from "../../types/TicketCategory";
import CategoryFormButton from "../CategoryFormButton/CategoryFormButton";
import styles from "./TicketForm.module.css";

type TicketFormProps = {
  children: ReactNode;
  onSubmit: (ticket: Ticket) => void;
};

function TicketForm({ children, onSubmit }: TicketFormProps) {
  const [ticketCategories, setTicketCategories] = useState<TicketCategory[]>(
    [],
  );
  const [students, setStudents] = useState<Student[]>([]);
  const [charCount, setCharCount] = useState(0);
  const [validateWarning, setValidateWarning] = useState<boolean>(false);
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

  const clearWarning = () => {
    if (validateWarning) setValidateWarning(false);
  };

  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const content = formData.get("content") as string;
        const ticketCategoryId = Number(
          formData.get("ticketCategoryId"),
        ) as number;
        const studentIds = (formData.getAll("studentIds[]") as string[]).map(
          Number,
        );

        if (
          content.length === 0 ||
          studentIds.length === 0 ||
          !ticketCategoryId
        ) {
          setValidateWarning(true);
          return;
        }

        onSubmit({
          content,
          ticketCategoryId,
          studentIds,
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
                formName="ticketCategoryId"
                onChange={clearWarning}
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
                  type="checkbox"
                  id={`student-${student.id}`}
                  name="studentIds[]"
                  value={student.id}
                  aria-required="true"
                  className={styles.checkbox}
                  onChange={clearWarning}
                />
                <label
                  htmlFor={`student-${student.id}`}
                  className={styles.checkbox_label}
                >
                  {student.firstName}
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
            onChange={(e) => {
              setCharCount(e.target.value.length);
              clearWarning();
            }}
          />
          <p className={styles.charcter_counter}>{charCount} / 1000</p>
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
