// client/src/components/NavBar/NavBarBase.tsx
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import siteLogo from "../../assets/images/logo_site.png";
import styles from "./NavBar.module.css";

export type NavItem = {
  to: string;
  label: string;
  Icon: LucideIcon;
};

type NavBarBaseProps = {
  items: NavItem[];
  avatarUrl: string;
  displayName: string;
};

const getPathname = (): string => {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
};

function NavBarBase({ items, avatarUrl, displayName }: NavBarBaseProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePath, setActivePath] = useState<string>(() => getPathname());

  useEffect(() => {
    const onLocationChange = () => {
      setActivePath(getPathname());
    };

    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  const normalizedActivePath = useMemo(() => {
    if (activePath !== "/" && activePath.endsWith("/"))
      return activePath.slice(0, -1);
    return activePath;
  }, [activePath]);

  const normalizePath = (path: string) => {
    if (path !== "/" && path.endsWith("/")) return path.slice(0, -1);
    return path;
  };

  const isItemActive = (to: string): boolean =>
    normalizePath(to) === normalizedActivePath;

  const onLinkClick = (to: string) => {
    setActivePath(normalizePath(to));
  };

  const toggleCollapse = () => {
    setIsCollapsed((previous) => !previous);
  };

  return (
    <>
      {/* ===== Desktop sidebar ===== */}
      <aside
        id="sidebar"
        className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : styles.expanded}`}
        aria-label="Navigation principale"
      >
        <button
          type="button"
          className={styles.toggleButton}
          onClick={toggleCollapse}
          aria-expanded={!isCollapsed}
          aria-controls="sidebar-nav"
          aria-label={
            isCollapsed ? "Déplier la navigation" : "Replier la navigation"
          }
        >
          <span aria-hidden="true" className={styles.toggleIcon}>
            {isCollapsed ? "❯❯" : "❮❮"}
          </span>
        </button>

        <div className={styles.profile}>
          <img src={avatarUrl} alt="" className={styles.avatar} />
          {!isCollapsed ? (
            <span className={styles.displayName}>{displayName}</span>
          ) : null}
        </div>

        <nav
          id="sidebar-nav"
          className={styles.nav}
          aria-label="Navigation latérale"
        >
          <ul className={styles.navList}>
            {items.map(({ to, label, Icon }) => {
              const isActive = isItemActive(to);

              return (
                <li key={to} className={styles.navItem}>
                  <a
                    href={to}
                    className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                    aria-label={label}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => onLinkClick(to)}
                  >
                    <Icon className={styles.icon} aria-hidden="true" />
                    {!isCollapsed ? (
                      <span className={styles.linkLabel}>{label}</span>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.footer}>
          {!isCollapsed ? (
            <button
              type="button"
              className={styles.logoutButton}
              aria-label="Se déconnecter"
            >
              Déconnexion
            </button>
          ) : null}

          <a
            href="/"
            className={styles.footerLogoLink}
            aria-label="Retour à l'accueil"
            onClick={() => onLinkClick("/")}
          >
            <img src={siteLogo} alt="" className={styles.footerLogo} />
          </a>

          {!isCollapsed ? (
            <p className={styles.footerText}>P’Tit Cahier © 2026</p>
          ) : null}
        </div>
      </aside>

      {/* ===== Mobile bottom nav ===== */}
      <nav className={styles.mobileNav} aria-label="Navigation mobile">
        <div className={styles.mobileRow}>
          <a
            href="/"
            className={styles.mobileHome}
            aria-label="Retour à l'accueil"
            onClick={() => onLinkClick("/")}
          >
            <img src={siteLogo} alt="" className={styles.mobileLogo} />
          </a>

          {items.map(({ to, label, Icon }) => {
            const isActive = isItemActive(to);

            return (
              <a
                key={to}
                href={to}
                className={`${styles.mobileLink} ${isActive ? styles.active : ""}`}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onLinkClick(to)}
              >
                <Icon className={styles.icon} aria-hidden="true" />
              </a>
            );
          })}

          <button
            type="button"
            className={styles.mobileLogoutIcon}
            aria-label="Déconnexion"
          >
            Déconnexion
          </button>
        </div>
      </nav>
    </>
  );
}

export default NavBarBase;
