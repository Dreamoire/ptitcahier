import type { RefObject } from "react";
import type { Classroom, Student } from "./AnnouncementNew";

type FilterStudentProps = {
  isFilterOpen: boolean;
  filterModalRef: RefObject<HTMLDialogElement | null>;
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
    <div className="modal-overlay">
      <dialog
        className="modal-dialog filter-modal"
        open
        aria-label="Filtre étudiant"
        tabIndex={-1}
        ref={filterModalRef}
      >
        <div className="filter-modal-header">
          <h2 className="announcement-title">Filtre étudiant</h2>
        </div>

        <div className="filter-modal-body">
          <div className="filter-column">
            <p className="filter-title">Classes</p>
            <div className="filter-list">
              {classrooms.map((classroom) => {
                const isChecked = filterSelectedClassroomIds.includes(
                  classroom.id,
                );

                return (
                  <label key={classroom.id} className="filter-item">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => togglefilterClassroom(classroom.id)}
                    />
                    <span>{classroom.name}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="filter-column">
            <p className="filter-title">Etudiants</p>
            <div className="student-search">
              <input
                className="text-input"
                type="text"
                placeholder="Rechercher un étudiant..."
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
                <div className="search-results">
                  {studentSearchResults.map((student) => {
                    const classroomName =
                      student.classroomName ??
                      getClassroomName(student.classroomId);
                    const isSelected = filterSelectedStudentIds.includes(
                      student.id,
                    );

                    return (
                      <button
                        key={student.id}
                        type="button"
                        className={`search-item${
                          isSelected ? " is-selected" : ""
                        }`}
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
                          <span className="search-status">Selected</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="filter-list">
              {filterSelectedStudents.length === 0 && (
                <span className="summary-empty">Sélectionner un étudiant</span>
              )}
              {filterSelectedStudents.map((student) => {
                const classroomName = getClassroomName(student.classroomId);

                return (
                  <label key={student.id} className="filter-item">
                    <input
                      type="checkbox"
                      checked
                      onChange={() => togglefilterStudent(student.id)}
                    />
                    <span>
                      {student.firstname} {student.lastname}
                    </span>
                    <span className="filter-pill">{classroomName}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="secondary-button"
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
        </div>
      </dialog>
    </div>
  );
};

export default FilterStudent;
