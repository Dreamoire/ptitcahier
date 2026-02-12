import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import ptit_cahier_logo_original from "../../assets/images/ptit_cahier_logo_original.png";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import type { Announcement } from "../../types/Announcement";
import type { OutletAuthContext } from "../../types/OutletAuthContext";
import styles from "./AnnouncementsParentView.module.css";

function AnnouncementsParentView() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const { auth } = useOutletContext<OutletAuthContext>();
  const [loadingError, setLoadingError] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/parents/me/announcements`, {
      headers: { Authorization: `Bearer ${auth?.token}` },
    })
      .then((res) => {
        if (res.status === 401 || res.status === 403) {
          navigate("/redirection");
          return;
        }

        if (!res.ok) {
          setLoadingError(true);
          return;
        }

        return res.json();
      })
      .then((announcements: Announcement[] | undefined) => {
        if (!announcements) return;
        setAnnouncements(announcements);
      });
  }, [auth, navigate]);

  return (
    <main className="parent-background">
      <header className={styles.title}>
        <img
          src={ptit_cahier_logo_original}
          alt="Le P'tit Cahier"
          className={styles.logo}
        />
        <h1 className="primary-title">Fil d'actualité</h1>
      </header>

      {loadingError ? (
        <p>Échec de la récupération des annonces</p>
      ) : (
        <section className={styles.an_section}>
          <ul>
            {announcements.map((announcement) => (
              <li key={announcement.id}>
                <AnnouncementCard announcement={announcement} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
export default AnnouncementsParentView;
