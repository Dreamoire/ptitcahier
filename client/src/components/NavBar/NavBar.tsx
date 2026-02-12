import { useState } from "react";
import { NavLink } from "react-router";

import siteLogo from "../../assets/images/logo_site.png";

import parentStyles from "./NavBarParent.module.css";
import schoolStyles from "./NavBarSchool.module.css";
import { parentNavItems, schoolNavItems } from "./navItems";

type NavBarVariant = "parent" | "school";

type NavBarProps = {
  variant: NavBarVariant;
  avatarUrl: string;
  displayName: string;
};

function NavBar({ variant, avatarUrl, displayName }: NavBarProps) {
  const isSchool = variant === "school";

  const styles = isSchool ? schoolStyles : parentStyles;
  const items = isSchool ? schoolNavItems : parentNavItems;

  const mobileContainerClass = isSchool
    ? schoolStyles.mobileNav
    : parentStyles.mobileNavParent;

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <>
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
          aria-label={isCollapsed ? "Déplier" : "Replier"}
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

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {items.map(({ to, label, Icon }) => (
              <li key={to} className={styles.navItem}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                  aria-label={label}
                >
                  <Icon className={styles.icon} aria-hidden="true" />
                  {!isCollapsed ? (
                    <span className={styles.linkLabel}>{label}</span>
                  ) : null}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.footer}>
          {!isCollapsed ? (
            <button type="button" className={styles.logoutButton}>
              Déconnexion
            </button>
          ) : null}

          <NavLink
            to="/"
            className={styles.footerLogoLink}
            aria-label="Accueil"
          >
            <img src={siteLogo} alt="Logo" className={styles.footerLogo} />
          </NavLink>

          {!isCollapsed ? (
            <p className={styles.footerText}>P’Tit Cahier © 2026</p>
          ) : null}
        </div>
      </aside>

      <nav className={mobileContainerClass} aria-label="Navigation mobile">
        <div className={styles.mobileRow}>
          <NavLink to="/" className={styles.mobileHome} aria-label="Accueil">
            <img src={siteLogo} alt="Logo" className={styles.mobileLogo} />
          </NavLink>

          {items.map(({ to, label, Icon }) => (
            <NavLink
              key={`mobile-${to}`}
              to={to}
              className={({ isActive }) =>
                `${styles.mobileLink} ${isActive ? styles.active : ""}`
              }
              aria-label={label}
            >
              <Icon className={styles.icon} aria-hidden="true" />
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}

export default NavBar;
