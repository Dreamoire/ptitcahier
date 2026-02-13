import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import logoSite from "../../assets/images/logo_site.png";
import AnnouncementCard from "../../components/AnnouncementCard/AnnouncementCard";
import CalendarCard from "../../components/CalendarCard/CalendarCard";
import TicketCard from "../../components/TicketCard/TicketCard";
import type { Announcement } from "../../types/Announcement";
import type { School } from "../../types/School";
import type { Ticket } from "../../types/Ticket";
import styles from "./HomeParentView.module.css";

type UserRole = "parent" | "school";

type HomeProps = {
  userRole: UserRole;
};

type DragState = {
  isDragging: boolean;
  startX: number;
  moved: boolean;
};

const isInteractiveTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof Element)) return false;

  return Boolean(
    target.closest(
      'a, button, input, textarea, select, option, label, summary, [role="button"], [role="link"], [contenteditable="true"]',
    ),
  );
};

function Home({ userRole }: HomeProps) {
  const [school, setSchool] = useState<School | null>(null);
  const [recentTickets, setRecentTickets] = useState<Ticket[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const navigate = useNavigate();

  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Drag-to-swipe (no overlay; does not block clicks inside cards)
  const trackRef = useRef<HTMLUListElement | null>(null);
  const dragRef = useRef<DragState>({
    isDragging: false,
    startX: 0,
    moved: false,
  });
  const suppressClickRef = useRef(false);
  const [dragOffsetPx, setDragOffsetPx] = useState(0);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL;

    fetch(`${API_URL}/api/parents/me/school`)
      .then((res) => res.json() as Promise<School>)
      .then((data) => setSchool(data))
      .catch(() => setSchool(null));

    fetch(`${API_URL}/api/parents/me/tickets/recent`)
      .then((res) => res.json() as Promise<Ticket[]>)
      .then((data) => setRecentTickets(data))
      .catch(() => setRecentTickets([]));

    fetch(`${API_URL}/api/parents/me/announcements/recent`)
      .then((res) => res.json() as Promise<Announcement[]>)
      .then((data) => setAnnouncements(data))
      .catch(() => setAnnouncements([]));
  }, []);

  const totalSlides = announcements.length;

  const goToNextSlide = useCallback(() => {
    setActiveSlide((current) =>
      current === totalSlides - 1 ? 0 : current + 1,
    );
  }, [totalSlides]);

  const goToPreviousSlide = useCallback(() => {
    setActiveSlide((current) =>
      current === 0 ? totalSlides - 1 : current - 1,
    );
  }, [totalSlides]);

  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return undefined;

    const timer = setInterval(goToNextSlide, 7000);
    return () => clearInterval(timer);
  }, [goToNextSlide, isPaused, totalSlides]);

  const finishDrag = useCallback(
    (wrapper: HTMLElement) => {
      const { moved } = dragRef.current;

      dragRef.current.isDragging = false;
      setIsPaused(false);

      const wrapperWidth = wrapper.getBoundingClientRect().width;
      if (!moved || wrapperWidth <= 0) {
        setDragOffsetPx(0);
        return;
      }

      suppressClickRef.current = true;

      const ratio = dragOffsetPx / wrapperWidth;
      const threshold = 0.18;

      if (ratio <= -threshold) {
        goToNextSlide();
      } else if (ratio >= threshold) {
        goToPreviousSlide();
      }

      setDragOffsetPx(0);
    },
    [dragOffsetPx, goToNextSlide, goToPreviousSlide],
  );

  const handlePointerDown = (event: React.PointerEvent<HTMLElement>) => {
    if (totalSlides <= 1) return;
    if (event.button !== 0) return;
    if (isInteractiveTarget(event.target)) return;

    event.currentTarget.setPointerCapture(event.pointerId);

    dragRef.current = {
      isDragging: true,
      startX: event.clientX,
      moved: false,
    };

    setIsPaused(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!dragRef.current.isDragging) return;

    const wrapper = event.currentTarget;
    const wrapperWidth = wrapper.getBoundingClientRect().width;
    if (wrapperWidth <= 0) return;

    const deltaX = event.clientX - dragRef.current.startX;

    if (!dragRef.current.moved && Math.abs(deltaX) > 6) {
      dragRef.current.moved = true;
    }

    // Limit offset to avoid excessive dragging; keep it "free" but controlled.
    const maxOffset = wrapperWidth;
    const nextOffset = Math.max(-maxOffset, Math.min(maxOffset, deltaX));
    setDragOffsetPx(nextOffset);
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLElement>) => {
    finishDrag(event.currentTarget);
  };

  const handlePointerCancel = (event: React.PointerEvent<HTMLElement>) => {
    finishDrag(event.currentTarget);
  };

  const handleClickCapture = (event: React.MouseEvent<HTMLElement>) => {
    if (!suppressClickRef.current) return;

    event.preventDefault();
    event.stopPropagation();
    suppressClickRef.current = false;
  };

  const bannerId = school?.id ?? 0;
  const schoolName = school?.name ?? "Ecole";

  return (
    <main className={styles.parent_background}>
      <div className={styles.dashboard_container}>
        <header className={styles.home_header}>
          <img src={logoSite} alt="Le P'tit Cahier" className={styles.logo} />
          <article className={styles.ba_card}>
            <div className={styles.ba_card_header}>
              <img
                src={`/images/schools/banner-${bannerId}.jpg`}
                alt="Bannière de l'école"
                className={styles.school_banner}
              />
              <h2 className={styles.card_title}>{schoolName}</h2>
            </div>
          </article>
        </header>

        <div className={styles.main_content_grid}>
          <div className={styles.left_column}>
            <section aria-labelledby="messages-title">
              <h2 id="messages-title" className={styles.section_title}>
                Mes derniers messages
              </h2>

              {recentTickets.length > 0 ? (
                <ul className={styles.ticket_list}>
                  {recentTickets.map((ticket) => (
                    <li key={ticket.id}>
                      <TicketCard
                        onClick={() => navigate("/parent/tickets")}
                        ticket={ticket}
                        variant="dashboard"
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text">Aucun message récent.</p>
              )}
            </section>

            <aside aria-label="Calendrier">
              <CalendarCard />
            </aside>
          </div>

          <section className={styles.right_column} aria-labelledby="news-title">
            <h2 id="news-title" className={styles.section_title}>
              Fil d&apos;actualité
            </h2>

            <section
              className={styles.carousel_wrapper}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onFocus={() => setIsPaused(true)}
              onBlur={() => setIsPaused(false)}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              onClickCapture={handleClickCapture}
              aria-roledescription="carousel"
              aria-label="Annonces récentes de l'école"
            >
              {totalSlides > 1 ? (
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
              ) : null}

              <ul
                ref={trackRef}
                className={styles.carousel_track}
                style={{
                  transform: `translateX(calc(-${activeSlide * 100}% + ${dragOffsetPx}px))`,
                }}
              >
                {announcements.map((announcement, index) => (
                  <li
                    key={announcement.id}
                    className={styles.carousel_item}
                    aria-hidden={index !== activeSlide}
                  >
                    <AnnouncementCard
                      announcement={announcement}
                      userRole={userRole}
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
