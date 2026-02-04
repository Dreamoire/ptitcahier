import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import logoSite from "../../assets/images/logo_site.png";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import CalendarCard from "../../components/CalendarCard/CalendarCard";
import TicketCard from "../../components/TicketCard/TicketCard";
import type { Announcement } from "../../types/Announcement";
import type { School } from "../../types/School";
import type { Ticket } from "../../types/Ticket";

import styles from "./HomeParentView.module.css";

function Home() {
  const [school, setSchool] = useState<School | null>(null);
  const [recentTickets, setRecentTickets] = useState<Ticket[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    fetch(`${API_URL}/api/parents/me/school`)
      .then((res) => res.json())
      .then((school) => setSchool(school));

    fetch(`${API_URL}/api/parents/me/tickets/recent`)
      .then((res) => res.json())
      .then((recentTickets) => setRecentTickets(recentTickets));

    fetch(`${API_URL}/api/parents/me/announcements/recent`)
      .then((res) => res.json())
      .then((announcements) => setAnnouncements(announcements));
  }, []);

  const totalSlides = announcements.length;

  const goToNextSlide = useCallback(() => {
    setActiveSlide((current) =>
      current === totalSlides - 1 ? 0 : current + 1,
    );
  }, [totalSlides]);

  const goToPreviousSlide = () => {
    setActiveSlide((current) =>
      current === 0 ? totalSlides - 1 : current - 1,
    );
  };

  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return;

    const timer = setInterval(goToNextSlide, 7000);
    return () => clearInterval(timer);
  }, [totalSlides, isPaused, goToNextSlide]);

  return (
    <main className={styles.parent_background}>
      <div className={styles.dashboard_container}>
        <header className={styles.home_header}>
          <img src={logoSite} alt="Le P'tit Cahier" className={styles.logo} />
          <article className={styles.ba_card}>
            <div className={styles.ba_card_header}>
              <img
                src={`/images/schools/banner-${school?.id ?? 0}.jpg`}
                alt="Bannière de l'école"
                className={styles.school_banner}
              />
              <h2 className={styles.card_title}>{school?.name ?? "Ecole"}</h2>
            </div>
          </article>
        </header>

        <div className={styles.main_content_grid}>
          <div className={styles.left_column}>
            <section aria-labelledby="messages-title">
              <h2 id="messages-title" className={styles.section_title}>
                Mes derniers messages
              </h2>
              <ul className={styles.ticket_list}>
                {recentTickets.length > 0 ? (
                  recentTickets.map((ticket) => (
                    <li key={ticket.id}>
                      <TicketCard ticket={ticket} variant="dashboard" />
                    </li>
                  ))
                ) : (
                  <p className="text">Aucun message récent.</p>
                )}
              </ul>
            </section>

            <aside aria-label="Calendrier">
              <CalendarCard />
            </aside>
          </div>

          <section className={styles.right_column} aria-labelledby="news-title">
            <h2 id="news-title" className={styles.section_title}>
              Fil d'actualité
            </h2>

            <section
              className={styles.carousel_wrapper}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              aria-roledescription="carousel"
              aria-label="Annonces récentes de l'école"
            >
              {totalSlides > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPreviousSlide}
                    className={`${styles.nav_button} ${styles.left}`}
                    aria-label="Annonce précédente"
                  >
                    <ChevronLeft size={28} />
                  </button>

                  <button
                    type="button"
                    onClick={goToNextSlide}
                    className={`${styles.nav_button} ${styles.right}`}
                    aria-label="Annonce suivante"
                  >
                    <ChevronRight size={28} />
                  </button>
                </>
              )}

              <ul
                className={styles.carousel_track}
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {announcements.map((announcement, index) => (
                  <li
                    key={announcement.id}
                    className={styles.carousel_item}
                    aria-hidden={index !== activeSlide}
                  >
                    <AnnouncementCard
                      announcement={announcement}
                      variant="dashboard"
                    />
                  </li>
                ))}
              </ul>
            </section>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Home;
