import { useEffect, useState } from "react";
import type { Parent } from "../../types/Parent";
import type { Student } from "../../types/Student";
import styles from "./StudentForm.module.css";

type Props = {
  student: Partial<Student>;
  classrooms: { id: number; name: string }[];
  parents: Parent[];
  onCancel: () => void;
  onSave: (student: Partial<Student>) => void;
  newStudentForm?: boolean;
};

const StudentForm = ({
  student,
  classrooms,
  parents,
  onCancel,
  onSave,
  newStudentForm,
}: Props) => {
  const [firstName, setFirstName] = useState<string>(student.firstName ?? "");
  const [lastName, setLastName] = useState<string>(student.lastName ?? "");
  const [classroomId, setClassroomId] = useState<number>(
    student.classroomId ?? 0,
  );
  const [parentId, setParentId] = useState<number>(student.parentId ?? 0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);

  const isUnchanged =
    firstName === student.firstName &&
    lastName === student.lastName &&
    classroomId === student.classroomId &&
    parentId === (student.parentId ?? 0);

  const updateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      firstName,
      lastName,
      classroomId,
      parentId: parentId === 0 ? null : parentId,
    });
  };

  const formTitle = newStudentForm ? "Nouveau élève" : "Modifier l'élève";

  return (
    <form
      className={styles.form_container}
      onSubmit={updateStudent}
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

      <h2 className={styles.form_title}>{formTitle}</h2>

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

      <label className={styles.form_label}>
        Classe
        <select
          value={classroomId}
          onChange={(e) => setClassroomId(Number(e.target.value))}
          className={styles.form_input}
          required
        >
          {classrooms.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.form_label}>
        Parent
        <select
          value={parentId}
          onChange={(e) => setParentId(Number(e.target.value))}
          className={styles.form_input}
        >
          <option value={0}>Parent non attribué</option>
          {parents.map((p) => (
            <option key={p.id} value={p.id}>
              {p.genre === "M" ? "M." : "Mme"} {p.lastName} {p.firstName}
            </option>
          ))}
        </select>
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

export default StudentForm;
