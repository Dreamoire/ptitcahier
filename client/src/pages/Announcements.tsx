import type { ChangeEvent, FormEvent } from "react";
import { useEffect, useState } from "react";
import "./Announcements.css";

type Category = {
  id: number;
  name: string;
};

type Classroom = {
  id: number;
  name: string;
};

const MAX_MESSAGE_LENGTH = 2000;

const Announcements = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedClasses, setSelectedClasses] = useState<number[]>([]);
  const [message, setMessage] = useState("");
  const [hasExceededLimit, setHasExceededLimit] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);

  const isAllSelected =
    classrooms.length > 0 &&
    classrooms.every((item) => selectedClasses.includes(item.id));

  const isSubmitDisabled =
    title.trim().length === 0 ||
    selectedCategory === null ||
    selectedClasses.length === 0 ||
    message.trim().length === 0 ||
    isSubmitting;

  const resetForm = () => {
    setTitle("");
    setSelectedCategory(null);
    setSelectedClasses([]);
    setMessage("");
    setHasExceededLimit(false);
  };

  const toggleAllClasses = () => {
    if (isAllSelected) {
      setSelectedClasses([]);
      return;
    }

    setSelectedClasses(classrooms.map((item) => item.id));
  };

  const toggleClass = (classroomId: number) => {
    setSelectedClasses((prev) => {
      if (prev.includes(classroomId)) {
        return prev.filter((item) => item !== classroomId);
      }

      return [...prev, classroomId];
    });
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

  const openModal = () => {
    setIsModalOpen(true);
    setSuccessMessage("");
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setSuccessMessage("");

    Promise.all(
      selectedClasses.map((classroomId) =>
        fetch(
          `${import.meta.env.VITE_API_URL}/api/classrooms/${classroomId}/students`,
        ).then((response) => {
          if (!response.ok) {
            return;
          }

          return response.json();
        }),
      ),
    )
      .then((studentsByClassroom) => {
        const studentIds = studentsByClassroom
          .flat()
          .map((student) => student.id);

        if (studentIds.length === 0) {
          throw new Error("No students found for the selected classes.");
        }

        return fetch(`${import.meta.env.VITE_API_URL}/api/announcements`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title.trim(),
            content: message.trim(),
            announcementCategoryId: selectedCategory,
            studentIds,
          }),
        });
      })
      .then((response) => {
        console.log("HEREEEE", response.json());

        if (!response.ok) {
          throw new Error("Failed to create announcement.");
        }

        resetForm();
        setSuccessMessage("L'annonce a bien été créé");
      })
      .catch((error) => {
        console.error(error); // display error submit to UX ?
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (!isModalOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isModalOpen]);

  useEffect(() => {
    const fetchCategories = () => {
      fetch(`${import.meta.env.VITE_API_URL}/api/announcements-categories`)
        .then((response) => {
          if (!response.ok) {
            return null;
          }

          return response.json() as Promise<Category[]>;
        })
        .then((data) => {
          if (!data) {
            return;
          }

          setCategories(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    const fetchClassrooms = () => {
      fetch(`${import.meta.env.VITE_API_URL}/api/classrooms`)
        .then((response) => {
          if (!response.ok) {
            return null;
          }

          return response.json() as Promise<Classroom[]>;
        })
        .then((data) => {
          if (!data) {
            return;
          }

          setClassrooms(data);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    fetchCategories();
    fetchClassrooms();
  }, []);

  return (
    <div className="announcements-page">
      <div
        className={`announcements-content${isModalOpen ? " is-dimmed" : ""}`}
      >
        <h1 className="announcement-title">Annonces</h1>
        <button
          type="button"
          className="primary-button create-announcement-button"
          onClick={openModal}
        >
          Nouvelle annonce
        </button>
      </div>

      {isModalOpen && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsModalOpen(false);
            }
          }}
        >
          <dialog className="modal-dialog" open aria-label="Créer une annonce">
            <div className="announcement-card">
              <h2 className="announcement-title">Nouvelle Annonce</h2>

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
                  <p className="form-label">classe(s) concernée(s):</p>
                  <div className="class-pill-row">
                    <button
                      type="button"
                      className={`class-pill${isAllSelected ? " is-active" : ""}`}
                      onClick={toggleAllClasses}
                    >
                      Toutes
                    </button>
                    {classrooms.map((classroom) => {
                      const isActive = selectedClasses.includes(classroom.id);

                      return (
                        <button
                          key={classroom.id}
                          type="button"
                          className={`class-pill${isActive ? " is-active" : ""}`}
                          onClick={() => toggleClass(classroom.id)}
                        >
                          {classroom.name}
                        </button>
                      );
                    })}
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
                      className={`char-counter${
                        hasExceededLimit ? " is-warning" : ""
                      }`}
                    >
                      {message.length} / {MAX_MESSAGE_LENGTH}
                    </span>
                    {hasExceededLimit && (
                      <span className="char-warning">
                        Le message ne doit pas dépasser 2000 caractères.
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
          </dialog>
        </div>
      )}
    </div>
  );
};

export default Announcements;
