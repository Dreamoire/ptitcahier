import { useEffect, useState } from "react";
import type { Parent } from "../../types/Parent";
import styles from "./ParentForm.module.css";

type Props = {
  parent: Parent;
  onCancel: () => void;
  onSave: (updatedParent: Partial<Parent>) => void;
};

const ParentForm = ({ parent, onCancel, onSave }: Props) => {
  const [firstName, setFirstName] = useState<string>(parent.firstName);
  const [lastName, setLastName] = useState<string>(parent.lastName);
  // const [email, setEmail] = useState<string>(parent.email);
  const [genre, setGenre] = useState<"M" | "F">(parent.genre);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  useEffect(() => {
    setFirstName(parent.firstName);
    setLastName(parent.lastName);
    // setEmail(parent.email);
    setGenre(parent.genre);
  }, [parent]);

  const isUnchanged =
    firstName === parent.firstName &&
    lastName === parent.lastName &&
    // email === parent.email &&
    genre === parent.genre;

  const updateParent = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      firstName,
      lastName,
      // email,
      genre,
    });
  };

  return (
    <form
      className={styles.form_container}
      onSubmit={updateParent}
      onClick={(e) => e.stopPropagation()}
      onKeyDown={(e) => e.stopPropagation()}
      role="presentation"
    >
      <button
        type="button"
        className={styles.close_icon_button}
        onClick={onCancel}
        aria-label="Close"
      >
        ✕
      </button>

      <h2 className={styles.form_title}>Modifier le parent</h2>

      {/* <label className={styles.form_label}>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.form_input}
          required
        />
      </label> */}

      <fieldset className={styles.form_label}>
        <legend>Civilité</legend>
        <label>
          <input
            type="radio"
            name="genre"
            value="M"
            checked={genre === "M"}
            onChange={() => setGenre("M")}
          />
          M
        </label>
        <label>
          <input
            type="radio"
            name="genre"
            value="F"
            checked={genre === "F"}
            onChange={() => setGenre("F")}
          />
          F
        </label>
      </fieldset>

      <label className={styles.form_label}>
        Nom
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className={styles.form_input}
          required
        />
      </label>

      <label className={styles.form_label}>
        Prénom
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className={styles.form_input}
          required
        />
      </label>

      <div className={styles.ticket_buttons_container}>
        <button onClick={onCancel} type="button" className="non-primary-button">
          Annuler
        </button>
        <button type="submit" className="primary-button" disabled={isUnchanged}>
          Enregistrer
        </button>
      </div>
    </form>
  );
};

export default ParentForm;
