import { CalendarDays, ClipboardList, School } from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import FilterStudent from "../../components/FilterStudents/FilterStudent";
import styles from "./AnnouncementForm.module.css";

const MAX_MESSAGE_LENGTH = 1000;

type CategoryButtonConfig = {
  color: string;
  Icon: typeof School;
};

const CATEGORY_BUTTON_CONFIG_BY_ID: Record<number, CategoryButtonConfig> = {
  1: { color: "16a249", Icon: School },
  2: { color: "0da2e7", Icon: ClipboardList },
  3: { color: "f97015", Icon: CalendarDays },
};

type AnnouncementCategory = { id: number; name: string };
type Classroom = { id: number; name: string };
type Student = {
  id: number;
  firstname: string;
  lastname: string;
  classroomId: number;
  classroomName?: string;
};

export type AnnouncementNew = {
  title: string;
  content: string;
  announcementCategoryId: number;
  studentIds: number[];
};

type AnnouncementFormProps = {
  announcementCategories: AnnouncementCategory[];
  classrooms: Classroom[];
  students: Student[];
  onSubmit: (announcement: AnnouncementNew) => void;
  isSubmitting: boolean;
};

function AnnouncementForm({
  announcementCategories,
  classrooms,
  students,
  onSubmit,
  isSubmitting = false,
}: AnnouncementFormProps) {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedClassroom, setSelectedClassroom] = useState<number[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<number[]>([]);
  const [filterSelectedClassroom, setFilterSelectedClassroom] = useState<
    number[]
  >([]);
  const [filterSelectedStudent, setFilterSelectedStudent] = useState<number[]>(
    [],
  );
  const [studentSearch, setStudentSearch] = useState("");
  const [isStudentSearchOpen, setIsStudentSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [validateWarning, setValidateWarning] = useState(false);
  const navigate = useNavigate();

  const getStudentsByClassroom = useMemo(() => {
    const map: Record<number, Student[]> = {};

    for (const student of students) {
      if (!map[student.classroomId]) {
        map[student.classroomId] = [];
      }
      map[student.classroomId].push(student);
    }

    return (classroomId: number) => map[classroomId] ?? [];
  }, [students]);

  const clearWarning = () => {
    if (validateWarning) {
      setValidateWarning(false);
    }
  };

  const getClassroomName = (classroomId: number) => {
    const classroom = classrooms.find(
      (classroom) => classroom.id === classroomId,
    );
    return classroom?.name ?? "Classe inconnue";
  };

  const getStudentById = (studentId: number) => {
    return students.find((student) => student.id === studentId);
  };

  const addUniqueIds = (currentIds: number[], idsToAdd: number[]) => {
    const nextIds = [...currentIds];

    for (const id of idsToAdd) {
      if (!nextIds.includes(id)) {
        nextIds.push(id);
      }
    }

    return nextIds;
  };

  const removeIds = (currentIds: number[], idsToRemove: number[]) => {
    if (idsToRemove.length === 0) {
      return currentIds;
    }

    return currentIds.filter((id) => !idsToRemove.includes(id));
  };

  const openFilterModal = () => {
    setFilterSelectedClassroom(selectedClassroom);
    setFilterSelectedStudent(selectedStudent);
    setStudentSearch("");
    setIsStudentSearchOpen(false);
    setIsFilterOpen(true);
  };

  const closeFilterModal = () => {
    setIsFilterOpen(false);
    setStudentSearch("");
    setIsStudentSearchOpen(false);
  };

  const applyFilterModal = () => {
    setSelectedClassroom(filterSelectedClassroom);
    setSelectedStudent(filterSelectedStudent);
    closeFilterModal();
    clearWarning();
  };

  const toggleFilterClassroom = (classroomId: number) => {
    const isSelected = filterSelectedClassroom.includes(classroomId);
    const classroomStudentIds = getStudentsByClassroom(classroomId).map(
      (student) => student.id,
    );

    if (isSelected) {
      setFilterSelectedClassroom((prev) =>
        prev.filter((id) => id !== classroomId),
      );
      setFilterSelectedStudent((prev) => removeIds(prev, classroomStudentIds));
      return;
    }

    setFilterSelectedClassroom((prev) => [...prev, classroomId]);
    setFilterSelectedStudent((prev) => addUniqueIds(prev, classroomStudentIds));
  };

  const toggleFilterStudent = (studentId: number) => {
    setFilterSelectedStudent((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      }

      return [...prev, studentId];
    });
  };

  const removeClassroomSelection = (classroomId: number) => {
    setSelectedClassroom((prev) => prev.filter((id) => id !== classroomId));

    const classroomStudentIds = getStudentsByClassroom(classroomId).map(
      (student) => student.id,
    );
    setSelectedStudent((prev) => removeIds(prev, classroomStudentIds));
  };

  const removeStudentSelection = (studentId: number) => {
    setSelectedStudent((prev) => prev.filter((id) => id !== studentId));
  };

  const normalize = (value: string) => {
    return value.toLowerCase().trim().replace(/\s+/g, " ");
  };

  const matchesStudent = (student: Student, searchValue: string) => {
    const classroomName =
      student.classroomName ?? getClassroomName(student.classroomId);
    const fullName = `${student.firstname} ${student.lastname}`;
    const searchTarget = [fullName, classroomName]
      .map((item) => normalize(item))
      .join(" ");

    return searchTarget.includes(searchValue);
  };

  const normalizedStudentSearch = normalize(studentSearch);
  const studentSearchResults =
    normalizedStudentSearch.length === 0
      ? []
      : students.filter((student) =>
          matchesStudent(student, normalizedStudentSearch),
        );

  const selectStudentFromSearch = (studentId: number) => {
    setFilterSelectedStudent((prev) => {
      if (prev.includes(studentId)) {
        return prev;
      }
      return [...prev, studentId];
    });
    setStudentSearch("");
    setIsStudentSearchOpen(false);
  };

  const fullySelectedClassroom = selectedClassroom.filter((classroomId) => {
    const classroomStudents = getStudentsByClassroom(classroomId);
    if (classroomStudents.length === 0) {
      return false;
    }

    return classroomStudents.every((student) =>
      selectedStudent.includes(student.id),
    );
  });

  const individualStudents = (
    selectedStudent.map((studentId) => getStudentById(studentId)) as Student[]
  ).filter((student) => !fullySelectedClassroom.includes(student.classroomId));

  const filterSelectedStudents = filterSelectedStudent
    .map((studentId) => getStudentById(studentId))
    .filter((student): student is Student => student !== undefined);

  return (
    <>
      <form
        className={styles.form}
        onSubmit={(event) => {
          event.preventDefault();
          if (isSubmitting) {
            return;
          }

          const trimmedTitle = title.trim();
          const trimmedMessage = message.trim();

          if (
            trimmedTitle.length === 0 ||
            trimmedMessage.length === 0 ||
            selectedCategory === null ||
            selectedStudent.length === 0
          ) {
            setValidateWarning(true);
            return;
          }

          onSubmit({
            title: trimmedTitle,
            content: trimmedMessage,
            announcementCategoryId: selectedCategory,
            studentIds: selectedStudent,
          });
        }}
      >
        <h1 className="primary-title">Nouvelle Annonce</h1>
        <p className={styles.form_instructions}>
          Choisissez un motif, sélectionnez les élèves concernés, puis rédigez
          votre annonce.
        </p>

        <fieldset className={styles.fieldset_title}>
          <legend className={styles.form_label}>Titre* :</legend>
          <input
            id="announcement-title"
            name="title"
            type="text"
            className={styles.text_input}
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              clearWarning();
            }}
            aria-required="true"
          />
        </fieldset>

        <fieldset className={styles.fieldset_categories}>
          <legend className={styles.form_label}>Motif de l'annonce* :</legend>
          <ul>
            {announcementCategories.map((category) => {
              const config = CATEGORY_BUTTON_CONFIG_BY_ID[category.id];

              if (!config) {
                return null;
              }

              const IconComponent = config.Icon;
              const categoryColor = config.color;

              return (
                <li key={category.id}>
                  <input
                    type="radio"
                    id={`category-${category.id}`}
                    name="announcementCategoryId"
                    value={category.id}
                    checked={selectedCategory === category.id}
                    onChange={() => {
                      setSelectedCategory(category.id);
                      clearWarning();
                    }}
                    className={styles.category_input}
                    aria-required="true"
                  />
                  <label
                    htmlFor={`category-${category.id}`}
                    className={styles.category_button}
                  >
                    <span
                      className={styles.category_icon_wrapper}
                      style={{ backgroundColor: `#${categoryColor}` }}
                    >
                      <IconComponent className={styles.category_icon} />
                    </span>
                    <span className={styles.category_name}>
                      {category.name}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </fieldset>

        <div className={styles.filter_section}>
          <div className={styles.filter_row}>
            <span className={styles.form_label}>Élèves concernés* :</span>
            <button
              type="button"
              className="primary-button"
              onClick={openFilterModal}
            >
              Sélectionner les élèves
            </button>
          </div>

          <div
            className={styles.selection_summary}
            aria-label="Élèves sélectionnés"
          >
            <div className={styles.chip_row}>
              {fullySelectedClassroom.map((classroomId) => (
                <span key={classroomId} className={styles.summary_chip}>
                  {getClassroomName(classroomId)}
                  <button
                    type="button"
                    className={styles.chip_remove}
                    aria-label={`Retirer la classe ${getClassroomName(
                      classroomId,
                    )}`}
                    onClick={() => removeClassroomSelection(classroomId)}
                  >
                    {"\u00d7"}
                  </button>
                </span>
              ))}
              {individualStudents.map((student) => (
                <span key={student.id} className={styles.summary_chip}>
                  {student.firstname} {student.lastname} (
                  {getClassroomName(student.classroomId)})
                  <button
                    type="button"
                    className={styles.chip_remove}
                    aria-label={`Retirer ${student.firstname} ${student.lastname}`}
                    onClick={() => removeStudentSelection(student.id)}
                  >
                    {"\u00d7"}
                  </button>
                </span>
              ))}
              {fullySelectedClassroom.length === 0 &&
                individualStudents.length === 0 && (
                  <span className={styles.summary_empty}>
                    Sélectionnez au moins un élève.
                  </span>
                )}
            </div>
          </div>
        </div>

        <fieldset className={styles.fieldset_message}>
          <legend className={styles.form_label}>Message* :</legend>
          <div className={styles.textarea_wrapper}>
            <textarea
              id="content"
              name="content"
              aria-required="true"
              className={styles.textarea}
              maxLength={MAX_MESSAGE_LENGTH}
              placeholder="Écrivez votre annonce"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
                clearWarning();
              }}
            />
            <p className={styles.character_counter}>
              {message.length} / {MAX_MESSAGE_LENGTH}
            </p>
          </div>
        </fieldset>

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
            disabled={validateWarning || isSubmitting}
          >
            Publier
          </button>
        </div>

        {validateWarning && (
          <p className={styles.warning} role="alert" aria-live="polite">
            Veuillez remplir tous les champs obligatoires (indiqués par *).
          </p>
        )}
      </form>

      <FilterStudent
        isFilterOpen={isFilterOpen}
        classrooms={classrooms}
        filterSelectedClassroom={filterSelectedClassroom}
        togglefilterClassroom={toggleFilterClassroom}
        studentSearch={studentSearch}
        setStudentSearch={setStudentSearch}
        setIsStudentSearchOpen={setIsStudentSearchOpen}
        isStudentSearchOpen={isStudentSearchOpen}
        studentSearchResults={studentSearchResults}
        filterSelectedStudent={filterSelectedStudent}
        selectStudentFromSearch={selectStudentFromSearch}
        getClassroomName={getClassroomName}
        filterSelectedStudents={filterSelectedStudents}
        togglefilterStudent={toggleFilterStudent}
        closeFilterModal={closeFilterModal}
        applyFilterModal={applyFilterModal}
      />
    </>
  );
}

export default AnnouncementForm;
