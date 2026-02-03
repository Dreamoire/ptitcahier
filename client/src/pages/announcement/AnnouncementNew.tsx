import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useRef, useState } from "react";
import "./AnnouncementsNew.css";

type Category = {
  id: number;
  name: string;
};

type Classroom = {
  id: number;
  name: string;
};

type Student = {
  id: number;
  firstname: string;
  lastname: string;
  classroomId: number;
  classroomName: string;
};

const MAX_MESSAGE_LENGTH = 1000;

const CreateAnnouncementPage = () => {
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [hasExceededLimit, setHasExceededLimit] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [studentsByClassroom, setStudentsByClassroom] = useState<
    Record<number, Student[]>
  >({});
  const [allStudents, setAllStudents] = useState<Student[]>([]);
  const [selectedClassroomIds, setSelectedClassroomIds] = useState<number[]>(
    [],
  );
  const [selectedStudentIds, setSelectedStudentIds] = useState<number[]>([]);
  const [studentSearch, setStudentSearch] = useState("");
  const [isStudentSearchOpen, setIsStudentSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterSelectedClassroomIds, setFilterSelectedClassroomIds] = useState<
    number[]
  >([]);
  const [filterSelectedStudentIds, setFilterSelectedStudentIds] = useState<
    number[]
  >([]);
  const filterSelectedClassroomIdsRef = useRef<number[]>([]);
  const filterButtonRef = useRef<HTMLButtonElement | null>(null);
  const filterModalRef = useRef<HTMLDialogElement | null>(null);

  const isSubmitDisabled =
    title.trim().length === 0 ||
    selectedCategory === null ||
    selectedStudentIds.length === 0 ||
    message.trim().length === 0 ||
    isSubmitting;

  const resetForm = () => {
    setTitle("");
    setSelectedCategory(null);
    setSelectedClassroomIds([]);
    setSelectedStudentIds([]);
    setMessage("");
    setHasExceededLimit(false);
  };

  const writting = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const updatedWriting = event.target.value;

    if (updatedWriting.length >= MAX_MESSAGE_LENGTH) {
      setHasExceededLimit(true);
      setMessage(updatedWriting.slice(0, MAX_MESSAGE_LENGTH));
      return;
    }

    setHasExceededLimit(false);
    setMessage(updatedWriting);
  };

  const getStudentsForClassroom = (classroomId: number) => {
    return studentsByClassroom[classroomId] ?? [];
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

  const loadStudentsForClassroom = (classroomId: number) => {
    return fetch(
      `${import.meta.env.VITE_API_URL}/api/classrooms/${classroomId}/students`,
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((students: Omit<Student, "classroomId">[]) => {
        const studentWithClassroom = students.map((student) => ({
          ...student,
          classroomId,
        }));

        setStudentsByClassroom((prev) => ({
          ...prev,
          [classroomId]: studentWithClassroom,
        }));

        return studentWithClassroom;
      })
      .catch((error) => {
        console.error(error);
        return [];
      });
  };

  const openFilterModal = () => {
    setFilterSelectedClassroomIds(selectedClassroomIds);
    setFilterSelectedStudentIds(selectedStudentIds);
    setIsFilterOpen(true);

    for (const classroomId of selectedClassroomIds) {
      loadStudentsForClassroom(classroomId);
    }
  };

  const closeFilterModal = () => {
    setIsFilterOpen(false);
    setStudentSearch("");
    setIsStudentSearchOpen(false);
    setTimeout(() => {
      filterButtonRef.current?.focus();
    }, 0);
  };

  const applyFilterModal = () => {
    setSelectedClassroomIds(filterSelectedClassroomIds);
    setSelectedStudentIds(filterSelectedStudentIds);
    closeFilterModal();
  };

  const togglefilterClassroom = (classroomId: number) => {
    const isSelected = filterSelectedClassroomIds.includes(classroomId);

    if (isSelected) {
      setFilterSelectedClassroomIds((prev) =>
        prev.filter((id) => id !== classroomId),
      );

      const classroomStudentIds = getStudentsForClassroom(classroomId).map(
        (student) => student.id,
      );

      setFilterSelectedStudentIds((prev) =>
        removeIds(prev, classroomStudentIds),
      );

      return;
    }

    setFilterSelectedClassroomIds((prev) => [...prev, classroomId]);

    loadStudentsForClassroom(classroomId).then((students) => {
      const isStillSelected =
        filterSelectedClassroomIdsRef.current.includes(classroomId);

      if (!isStillSelected) {
        return;
      }

      setFilterSelectedStudentIds((prev) =>
        addUniqueIds(
          prev,
          students.map((student) => student.id),
        ),
      );
    });
  };

  const togglefilterStudent = (studentId: number) => {
    setFilterSelectedStudentIds((prev) => {
      if (prev.includes(studentId)) {
        return prev.filter((id) => id !== studentId);
      }

      return [...prev, studentId];
    });
  };

  const getClassroomName = (classroomId: number) => {
    const classroom = classrooms.find((item) => item.id === classroomId);
    return classroom ? classroom.name : "";
  };

  const getStudentById = (studentId: number) => {
    const loadedStudents = Object.values(studentsByClassroom).flat();
    return (
      loadedStudents.find((student) => student.id === studentId) ??
      allStudents.find((student) => student.id === studentId) ??
      null
    );
  };

  const removeClassroomSelection = (classroomId: number) => {
    setSelectedClassroomIds((prev) => prev.filter((id) => id !== classroomId));

    const classroomStudentIds = getStudentsForClassroom(classroomId).map(
      (student) => student.id,
    );

    setSelectedStudentIds((prev) => removeIds(prev, classroomStudentIds));
  };

  const removeStudentSelection = (studentId: number) => {
    setSelectedStudentIds((prev) => prev.filter((id) => id !== studentId));
  };

  const normalize = (value: string) => {
    return value.toLowerCase().trim().replace(/\s+/g, " ");
  };

  const matchesStudent = (student: Student, searchValue: string) => {
    const classroomName =
      student.classroomName ?? getClassroomName(student.classroomId);
    const fullName = `${student.firstname} ${student.lastname}`;
    const searchTarget = [
      student.firstname,
      student.lastname,
      fullName,
      classroomName,
    ]
      .filter(Boolean)
      .map((value) => normalize(value))
      .join(" ");

    return searchTarget.includes(searchValue);
  };

  const normalizedStudentSearch = normalize(studentSearch);
  const studentSearchResults =
    normalizedStudentSearch.length === 0
      ? []
      : allStudents.filter((student) =>
          matchesStudent(student, normalizedStudentSearch),
        );

  const selectStudentFromSearch = (studentId: number) => {
    setFilterSelectedStudentIds((prev) => {
      if (prev.includes(studentId)) {
        return prev;
      }
      return [...prev, studentId];
    });
    setStudentSearch("");
    setIsStudentSearchOpen(false);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");

    fetch(`${import.meta.env.VITE_API_URL}/api/announcements`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title.trim(),
        content: message.trim(),
        announcementCategoryId: selectedCategory,
        studentIds: selectedStudentIds,
      }),
    })
      .then((res) => {
        console.log("HEREEEE", res.json());

        if (!res.ok) {
          throw new Error("Failed to create announcement.");
        }

        resetForm();
        setSuccessMessage("L'annonce a bien été créé");
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    filterSelectedClassroomIdsRef.current = filterSelectedClassroomIds;
  }, [filterSelectedClassroomIds]);

  useEffect(() => {
    if (!isFilterOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsFilterOpen(false);
        setTimeout(() => {
          filterButtonRef.current?.focus();
        }, 0);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    const focusTimeout = window.setTimeout(() => {
      filterModalRef.current?.focus();
    }, 0);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimeout);
    };
  }, [isFilterOpen]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/announcements-categories`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((categories) => {
        setCategories(categories);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch(`${import.meta.env.VITE_API_URL}/api/classrooms`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((classroom) => {
        setClassrooms(classroom);
      })
      .catch((error) => {
        console.error(error);
      });

    fetch(`${import.meta.env.VITE_API_URL}/api/students`)
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }
        return res.json();
      })
      .then((students) => {
        setAllStudents(students);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const fullySelectedClassroomIds = selectedClassroomIds.filter(
    (classroomId) => {
      const students = getStudentsForClassroom(classroomId);

      if (students.length === 0) {
        return false;
      }

      return students.every((student) =>
        selectedStudentIds.includes(student.id),
      );
    },
  );

  const individualStudents = selectedStudentIds
    .map((studentId) => getStudentById(studentId))
    .filter((student): student is Student => {
      if (!student) {
        return false;
      }

      return !fullySelectedClassroomIds.includes(student.classroomId);
    });

  const filterSelectedStudents = filterSelectedStudentIds
    .map((studentId) => getStudentById(studentId))
    .filter((student): student is Student => Boolean(student));

  return (
    <div className="announcements-page">
      <div className="announcement-card">
        <h1 className="announcement-title">Nouvelle Annonce</h1>

        <form className="announcement-form" onSubmit={submit}>
          <label className="form-section">
            <span className="form-label">Titre :</span>
            <input
              className="text-input"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          <div className="form-section">
            <p className="form-label">Motif de la demande :</p>
            <div className="category-grid">
              {categories.map((category) => {
                const isActive = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    type="button"
                    className={`category-button${isActive ? " is-active" : ""}`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="form-section">
            <div className="filter-row">
              <span className="form-label">Elèves concernés :</span>
              <button
                ref={filterButtonRef}
                type="button"
                className="primary-button"
                onClick={openFilterModal}
              >
                filtrer les étudiants
              </button>
            </div>

            <div className="selection-summary" aria-label="Selected targets">
              <div className="chip-row">
                {fullySelectedClassroomIds.map((classroomId) => (
                  <span key={classroomId} className="summary-chip">
                    <span aria-hidden="true">{"\uD83D\uDC65"}</span>{" "}
                    {getClassroomName(classroomId)}
                    <button
                      type="button"
                      className="chip-remove"
                      aria-label={`Remove ${getClassroomName(
                        classroomId,
                      )} classroom selection`}
                      onClick={() => removeClassroomSelection(classroomId)}
                    >
                      ×
                    </button>
                  </span>
                ))}
                {individualStudents.map((student) => (
                  <span key={student.id} className="summary-chip">
                    <span aria-hidden="true">{"\uD83D\uDC64"}</span>{" "}
                    {student.firstname} {student.lastname} (
                    {getClassroomName(student.classroomId)})
                    <button
                      type="button"
                      className="chip-remove"
                      aria-label={`Remove ${student.firstname} ${student.lastname}`}
                      onClick={() => removeStudentSelection(student.id)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <label className="form-section">
            <span className="form-label">Message :</span>
            <textarea
              className="message-input"
              rows={6}
              value={message}
              onChange={writting}
            />
            <div className="message-meta">
              <span
                className={`char-counter${hasExceededLimit ? " is-warning" : ""}`}
              >
                {message.length} / {MAX_MESSAGE_LENGTH}
              </span>
              {hasExceededLimit && (
                <span className="char-warning">
                  Le message ne doit pas dépasser 1000 caractères.
                </span>
              )}
            </div>
          </label>

          {successMessage.length > 0 && (
            <p className="success-message">{successMessage}</p>
          )}

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={resetForm}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="primary-button"
              disabled={isSubmitDisabled}
            >
              Publier
            </button>
          </div>
        </form>
      </div>

      {isFilterOpen && (
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
                    placeholder="Search students..."
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
                    <span className="summary-empty">
                      Sélectionner un étudiant
                    </span>
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
      )}
    </div>
  );
};

export default CreateAnnouncementPage;
