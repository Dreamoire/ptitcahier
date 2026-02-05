import type { RefObject } from "react";
import styles from "./FilterStudent.module.css";

type Classroom = {
  id: number;
  name: string;
};

type Student = {
  id: number;
  firstname: string;
  lastname: string;
  classroomId: number;
  classroomName?: string;
};

type FilterStudentProps = {
  isFilterOpen: boolean;
  filterModalRef?: RefObject<HTMLDialogElement | null>;
  classrooms: Classroom[];
  filterSelectedClassroomIds: number[];
  togglefilterClassroom: (classroomId: number) => void;
  studentSearch: string;
  setStudentSearch: (value: string) => void;
  setIsStudentSearchOpen: (value: boolean) => void;
  isStudentSearchOpen: boolean;
  studentSearchResults: Student[];
  filterSelectedStudentIds: number[];
  selectStudentFromSearch: (studentId: number) => void;
  getClassroomName: (classroomId: number) => string;
  filterSelectedStudents: Student[];
  togglefilterStudent: (studentId: number) => void;
  closeFilterModal: () => void;
  applyFilterModal: () => void;
};

const FilterStudent = ({
  isFilterOpen,
  filterModalRef,
  classrooms,
  filterSelectedClassroomIds,
  togglefilterClassroom,
  studentSearch,
  setStudentSearch,
  setIsStudentSearchOpen,
  isStudentSearchOpen,
  studentSearchResults,
  filterSelectedStudentIds,
  selectStudentFromSearch,
  getClassroomName,
  filterSelectedStudents,
  togglefilterStudent,
  closeFilterModal,
  applyFilterModal,
}: FilterStudentProps) => {
  if (!isFilterOpen) {
    return null;
  }

  return (
    <div className={styles.modal_overlay}>
      <dialog
        className={styles.filter_modal}
        open
        aria-label="Filtrer les élèves"
        tabIndex={-1}
        ref={filterModalRef}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            event.preventDefault();
            closeFilterModal();
          }
        }}
      >
        <header>
          <h2 className="primary-title">Filtrer les élèves</h2>
        </header>

        <section className={styles.filter_body}>
          <fieldset className={styles.filter_column}>
            <legend className={styles.filter_title}>Classes</legend>
            <ul className={styles.filter_list}>
              {classrooms.map((classroom) => {
                const isChecked = filterSelectedClassroomIds.includes(
                  classroom.id,
                );

                return (
                  <li key={classroom.id}>
                    <label className={styles.filter_item}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => togglefilterClassroom(classroom.id)}
                      />
                      <span>{classroom.name}</span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>

          <fieldset className={styles.filter_column}>
            <legend className={styles.filter_title}>Élèves</legend>
            <div className={styles.student_search}>
              <input
                className={styles.search_input}
                type="text"
                placeholder="Rechercher un élève..."
                aria-label="Rechercher un élève"
                value={studentSearch}
                onChange={(event) => {
                  const nextValue = event.target.value;
                  setStudentSearch(nextValue);
                  setIsStudentSearchOpen(nextValue.trim().length > 0);
                }}
                onFocus={() => {
                  if (studentSearch.trim().length > 0) {
                    setIsStudentSearchOpen(true);
                  }
                }}
                onBlur={() => {
                  window.setTimeout(() => {
                    setIsStudentSearchOpen(false);
                  }, 100);
                }}
              />
              {isStudentSearchOpen && studentSearchResults.length > 0 && (
                <ul className={styles.search_results}>
                  {studentSearchResults.map((student) => {
                    const classroomName =
                      student.classroomName ??
                      getClassroomName(student.classroomId);
                    const isSelected = filterSelectedStudentIds.includes(
                      student.id,
                    );

                    return (
                      <li key={student.id}>
                        <button
                          type="button"
                          className={styles.search_item}
                          disabled={isSelected}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            if (!isSelected) {
                              selectStudentFromSearch(student.id);
                            }
                          }}
                        >
                          <span>
                            {student.firstname} {student.lastname} (
                            {classroomName})
                          </span>
                          {isSelected && (
                            <span className={styles.search_status}>
                              Sélectionné
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
            <ul className={styles.filter_list}>
              {filterSelectedStudents.length === 0 && (
                <li>
                  <span className={styles.summary_empty}>
                    Sélectionnez un élève.
                  </span>
                </li>
              )}
              {filterSelectedStudents.map((student) => {
                const classroomName = getClassroomName(student.classroomId);

                return (
                  <li key={student.id}>
                    <label className={styles.filter_item}>
                      <input
                        type="checkbox"
                        checked
                        onChange={() => togglefilterStudent(student.id)}
                      />
                      <span>
                        {student.firstname} {student.lastname}
                      </span>
                      <span className={styles.filter_pill}>
                        {classroomName}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </fieldset>
        </section>

        <footer className={styles.filter_actions}>
          <button
            type="button"
            className="non-primary-button"
            onClick={closeFilterModal}
          >
            Annuler
          </button>
          <button
            type="button"
            className="primary-button"
            onClick={applyFilterModal}
          >
            Valider
          </button>
        </footer>
      </dialog>
    </div>
  );
};

export default FilterStudent;
