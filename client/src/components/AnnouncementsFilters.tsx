import { useEffect, useState } from "react";

type Announcement = {
  id: number;
  title: string;
  content: string;
  announcement_category_name: string;
  student_names: string;
};

function AnnoucementsFilters() {
  const [annoucements, setAnnouncements] = useState<Announcement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const url = selectedCategory
        ? `http://localhost:3310/api/announcements?category=${selectedCategory}`
        : "http://localhost:3310/api/announcements";

      const response = await fetch(url);
      const category = await response.json();
      setAnnouncements(category);
    };

    fetchAnnouncements();
  }, [selectedCategory]);

  console.log("selectedCategory =", selectedCategory);

  return (
    <div>
      <div>
        <button type="button" onClick={() => setSelectedCategory("")}>
          Toutes
        </button>
        <button type="button" onClick={() => setSelectedCategory("1")}>
          Vie de l'école
        </button>
        <button type="button" onClick={() => setSelectedCategory("2")}>
          Administratif
        </button>
        <button type="button" onClick={() => setSelectedCategory("3")}>
          Événement
        </button>
      </div>
      <ul>
        {annoucements.length === 0 && (
          <p>Aucune annonce disponible pour le moment.</p>
        )}

        {annoucements.map((a) => (
          <li key={a.id}>
            <h3>{a.title}</h3>
            <p>{a.content}</p>
            <p>Catégorie : {a.announcement_category_name}</p>
            <p>Élèves : {a.student_names}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AnnoucementsFilters;
