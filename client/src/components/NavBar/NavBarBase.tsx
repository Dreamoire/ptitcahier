import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import siteLogo from "../../assets/images/logo_site.png";
import parentStyles from "./NavBarParent.module.css";
import schoolStyles from "./NavBarSchool.module.css";

export type NavItem = {
  to: string;
  label: string;
  Icon: LucideIcon;
};

type NavBarVariant = "parent" | "school";

type NavBarBaseProps = {
  items: NavItem[];
  avatarUrl: string;
  displayName: string;
  variant: NavBarVariant;
};

const getPathname = (): string => {
  if (typeof window === "undefined") return "/";
  return window.location.pathname;
};

const normalizePath = (path: string): string => {
  return path !== "/" && path.endsWith("/") ? path.slice(0, -1) : path;
};

function NavBarBase({
  items,
  avatarUrl,
  displayName,
  variant,
}: NavBarBaseProps) {
  const styles = variant === "school" ? schoolStyles : parentStyles;

  const mobileContainerClass =
    variant === "parent" ? styles.mobileNavParent : styles.mobileNav;

  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [activePath, setActivePath] = useState<string>(() =>
    normalizePath(getPathname()),
  );

  useEffect(() => {
    const onLocationChange = () => {
      setActivePath(normalizePath(getPathname()));
    };

    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  const normalizedActivePath = useMemo(
    () => normalizePath(activePath),
    [activePath],
  );

  const isItemActive = (to: string): boolean => {
    return normalizePath(to) === normalizedActivePath;
  };

  const onLinkClick = (to: string) => {
    setActivePath(normalizePath(to));
  };

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
      <aside
        id="sidebar"
        className={`${styles.sidebar} ${
          isCollapsed ? styles.collapsed : styles.expanded
        }`}
        aria-label="Navigation principale"
      >
        <button
          type="button"
          className={styles.toggleButton}
          onClick={toggleCollapse}
          aria-expanded={!isCollapsed}
          aria-label={isCollapsed ? "Déplier" : "Replier"}
        >
          <span aria-hidden="true" className={styles.toggleIcon}>
            {isCollapsed ? "❯❯" : "❮❮"}
          </span>
        </button>

        <div className={styles.profile}>
          <img src={avatarUrl} alt="" className={styles.avatar} />
          {!isCollapsed && (
            <span className={styles.displayName}>{displayName}</span>
          )}
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {items.map(({ to, label, Icon }) => {
              const isActive = isItemActive(to);
              return (
                <li key={to} className={styles.navItem}>
                  <a
                    href={to}
                    className={`${styles.navLink} ${
                      isActive ? styles.active : ""
                    }`}
                    aria-current={isActive ? "page" : undefined}
                    onClick={() => onLinkClick(to)}
                  >
                    <Icon className={styles.icon} aria-hidden="true" />
                    {!isCollapsed && (
                      <span className={styles.linkLabel}>{label}</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.footer}>
          {!isCollapsed && (
            <button type="button" className={styles.logoutButton}>
              Déconnexion
            </button>
          )}
          <a
            href="/"
            onClick={() => onLinkClick("/")}
            className={styles.footerLogoLink}
          >
            <img src={siteLogo} alt="Logo" className={styles.footerLogo} />
          </a>
          {!isCollapsed && (
            <p className={styles.footerText}>P’Tit Cahier © 2026</p>
          )}
        </div>
      </aside>

      <nav className={mobileContainerClass} aria-label="Navigation mobile">
        <div className={styles.mobileRow}>
          <a
            href="/"
            onClick={() => onLinkClick("/")}
            className={styles.mobileHome}
          >
            <img src={siteLogo} alt="Logo" className={styles.mobileLogo} />
          </a>
          {items.map(({ to, label, Icon }) => {
            const isActive = isItemActive(to);
            return (
              <a
                key={`mobile-${to}`}
                href={to}
                className={`${styles.mobileLink} ${
                  isActive ? styles.active : ""
                }`}
                aria-label={label}
                aria-current={isActive ? "page" : undefined}
                onClick={() => onLinkClick(to)}
              >
                <Icon className={styles.icon} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </nav>
    </>
  );
}

export default NavBarBase;
