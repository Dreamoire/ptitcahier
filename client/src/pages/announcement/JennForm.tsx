import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./JennForm.module.css";

export type AnnouncementNew = {
  title: string;
  content: string;
  announcementCategoryId: number | null;
  studentIds: number[];
};

type AnnouncementCategory = { id: number; name: string };
type Classroom = { id: number; name: string };
type Student = {
  id: number;
  firstname: string;
  lastname: string;
  classroomId: number;
  classroomName: string;
};

type AnnouncementFormProps = {
  announcementCategories: AnnouncementCategory[];
  classrooms: Classroom[];
  students: Student[];
  onSubmit: (announcement: AnnouncementNew) => void;
};

function JennForm({
  announcementCategories,
  // classrooms,
  // students,
  onSubmit,
}: AnnouncementFormProps) {
  const [title, setTitle] = useState("");
  const [messageLength, setMessageLength] = useState<number>(0);
  const [validateWarning, setValidateWarning] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
  // const [isFilterOpen, setIsFilterOpen] = useState(false);
  const navigate = useNavigate();

  // const clearWarning = () => {
  //   if (validateWarning) setValidateWarning(false);
  // };

  //   const isSubmitDisabled =
  //     !title.trim() ||
  //     !message.trim() ||
  //     selectedCategory === null ||
  //     selectedStudentIds.length === 0 ||
  //     isSubmitting;

  //   const resetForm = () => {
  //     setTitle("");
  //     setMessage("");
  //     setSelectedCategory(null);
  //     setSelectedStudentIds([]);
  //   };
  //   console.log({ announcementCategories, classrooms, students });
  return (
    <form
      className={styles.form}
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const content = (formData.get("content") as string)?.trim() || "";
        const announcementCategoryId = Number(
          formData.get("announcementCategoryId"),
        );
        const studentIds = (formData.getAll("studentIds[]") as string[]).map(
          Number,
        );

        const validStudentIds = studentIds.filter(
          (id) => Number.isInteger(id) && id > 0,
        );

        if (
          content.length === 0 ||
          validStudentIds.length === 0 ||
          !Number.isInteger(announcementCategoryId) ||
          announcementCategoryId <= 0
        ) {
          setValidateWarning(true);
          return;
        }

        onSubmit({
          title: formData.get("title") as string,
          content,
          announcementCategoryId,
          studentIds: validStudentIds,
        });
      }}
    >
      <h1>Nouvelle Annonce</h1>

      <label htmlFor="title">Titre :</label>
      <input
        name="title"
        className="text-input"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <div>
        {announcementCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            name="announcementCategoryId"
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* DELETE THIS */}
      {selectedCategory}

      {/* FILTER BUTTON HERE */}
      {/* <button type="button" onClick={() => setIsFilterOpen(true)}>
        Filtrer étudiants
      </button> */}

      {/* CONTENT TEXTAREA HERE */}
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
              setMessageLength(e.target.value.length);
              //   clearWarning();
            }}
          />
          <p className={styles.charcter_counter}>{messageLength} / 1000</p>
        </div>
      </fieldset>

      {/* {successMessage && <p>{successMessage}</p>} */}
      {/* ONCLICKS DELETED A REVIR */}

      <div className={styles.ticket_buttons_container}>
        <button
          onClick={() => navigate("/school/home")}
          type="button"
          className="non-primary-button"
        >
          Retourner à l'accueil
        </button>
        <button
          type="submit"
          className="primary-button"
          disabled={validateWarning}
        >
          Publier
        </button>
      </div>
    </form>

    //   {isFilterOpen && (
    //     <StudentFilterModal
    //       classrooms={classrooms}
    //       students={students}
    //       selectedStudentIds={selectedStudentIds}
    //       onApply={(ids) => {
    //         setSelectedStudentIds(ids);
    //         setIsFilterOpen(false);
    //       }}
    //       onClose={() => setIsFilterOpen(false)}
    //     />
    //   )}
  );
}
export default JennForm;
