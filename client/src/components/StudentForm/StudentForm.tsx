// import { useState } from "react";
// import type { Student } from "../../types/Student";
// import type { Parent } from "../../types/Parent";
// import styles from "./StudentForm.module.css";

// type Props = {
//   student: Student;
//   classrooms: { id: number; name: string }[];
//   parents: Parent[];
//   onCancel: () => void;
//   onSave: (updatedStudent: Partial<Student>) => void;
// };

// const StudentForm = ({
//   student,
//   classrooms,
//   parents,
//   onCancel,
//   onSave,
// }: Props) => {
//   const [firstName, setFirstName] = useState(student.firstName);
//   const [lastName, setLastName] = useState(student.lastName);
//   const [classroomId, setClassroomId] = useState(student.classroomId);
//   const [parentId, setParentId] = useState(student.parentId ?? 0);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave({
//       firstName,
//       lastName,
//       classroomId,
//       parentId: parentId || null,
//     });
//   };

//   return (
//     <form className={styles.form_container} onSubmit={handleSubmit}>
//       <h2 className={styles.form_title}>Modifier l'élève</h2>

//       <label className={styles.form_label}>
//         Nom:
//         <input
//           type="text"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           className={styles.form_input}
//           required
//         />
//       </label>

//       <label className={styles.form_label}>
//         Prénom:
//         <input
//           type="text"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           className={styles.form_input}
//           required
//         />
//       </label>

//       <label className={styles.form_label}>
//         Classe:
//         <select
//           value={classroomId}
//           onChange={(e) => setClassroomId(Number(e.target.value))}
//           className={styles.form_input}
//           required
//         >
//           {classrooms.map((c) => (
//             <option key={c.id} value={c.id}>
//               {c.name}
//             </option>
//           ))}
//         </select>
//       </label>

//       <label className={styles.form_label}>
//         Parent:
//         <select
//           value={parentId}
//           onChange={(e) => setParentId(Number(e.target.value))}
//           className={styles.form_input}
//         >
//           <option value={0}>Parent unassigned</option>
//           {parents.map((p) => (
//             <option key={p.id} value={p.id}>
//               {p.genre === "M" ? "M." : "Mme"} {p.lastName} {p.firstName}
//             </option>
//           ))}
//         </select>
//       </label>

//       <div className={styles.form_buttons}>
//         <button type="submit" className={styles.form_button_save}>
//           Enregistrer
//         </button>
//         <button
//           type="button"
//           className={styles.form_button_cancel}
//           onClick={onCancel}
//         >
//           Annuler
//         </button>
//       </div>
//     </form>
//   );
// };

// export default StudentForm;
