import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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
  if (typeof window === "undefined") {
    return "/";
  }
  return window.location.pathname;
};

function NavBarBase({ items, avatarUrl, displayName }: NavBarBaseProps) {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
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
    if (activePath !== "/" && activePath.endsWith("/")) {
      return activePath.slice(0, -1);
    }
    return activePath;
  }, [activePath]);

  const toggleCollapse = () => {
    setIsCollapsed((previous) => !previous);
  };

  const isItemActive = (to: string): boolean => {
    const normalizedTo = to !== "/" && to.endsWith("/") ? to.slice(0, -1) : to;
    return normalizedTo === normalizedActivePath;
  };

  const onLinkClick = (to: string) => {
    const normalizedTo = to !== "/" && to.endsWith("/") ? to.slice(0, -1) : to;
    setActivePath(normalizedTo);
  };

  return (
    <>
      {/* ===== Desktop sidebar ===== */}
      <aside
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
          aria-label={
            isCollapsed ? "Déplier la navigation" : "Replier la navigation"
          }
        >
          ❮❮
        </button>

        <div className={styles.profile}>
          <img src={avatarUrl} alt="" className={styles.avatar} />

          {!isCollapsed ? (
            <span className={styles.displayName}>{displayName}</span>
          ) : null}
        </div>

        <nav className={styles.nav} aria-label="Navigation latérale">
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
      </aside>

      {/* ===== Mobile bottom nav ===== */}
      <nav className={styles.mobileNav} aria-label="Navigation mobile">
        <ul className={styles.mobileList}>
          {items.map(({ to, label, Icon }) => {
            const isActive = isItemActive(to);

            return (
              <li key={to} className={styles.mobileItem}>
                <a
                  href={to}
                  className={`${styles.mobileLink} ${isActive ? styles.active : ""}`}
                  aria-label={label}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => onLinkClick(to)}
                >
                  <Icon className={styles.icon} aria-hidden="true" />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default NavBarBase;
