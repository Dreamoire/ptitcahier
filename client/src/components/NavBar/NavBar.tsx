import { useState } from "react";
import { NavLink, useOutletContext } from "react-router-dom";
import siteLogo from "../../assets/images/logo_site.png";
import type { Parent } from "../../types/Auth";
import type { OutletAuthContext } from "../../types/OutletAuthContext";
import type { School } from "../../types/School";
import LogoutButton from "../LogoutButton/LogoutButton";
import parentStyles from "./NavBarParent.module.css";
import schoolStyles from "./NavBarSchool.module.css";
import { getNavItems } from "./navItems";

function NavBar() {
  const { auth } = useOutletContext<OutletAuthContext>();

  const displayName =
    auth?.role === "parent"
      ? (auth?.profile as Parent).firstName
      : (auth?.profile as School).name;

  const isSchool = auth?.role === "school";

  const styles = isSchool ? schoolStyles : parentStyles;

  const items = getNavItems(auth);

  const mobileContainerClass = isSchool
    ? schoolStyles.mobileNav
    : parentStyles.mobileNavParent;

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  const avatarSrc = auth?.profile.photoUrl;

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
          <img
            src={avatarSrc || "/images/default_avatar.png"}
            alt={displayName}
            className={styles.avatar}
          />
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
          {!isCollapsed ? <LogoutButton /> : null}

          <NavLink
            to={`/${auth?.role}/home`}
            className={styles.footerLogoLink}
            aria-label="Accueil"
          >
            <img src={siteLogo} alt="Logo" className={styles.footerLogo} />
          </NavLink>

          {!isCollapsed ? (
            <p className={styles.footerText}>Le P'tit Cahier © 2026</p>
          ) : null}
        </div>
      </aside>

      <nav className={mobileContainerClass} aria-label="Navigation mobile">
        <div className={styles.mobileRow}>
          <NavLink
            to={`/${auth?.role}/home`}
            className={styles.mobileHome}
            aria-label="Accueil"
          >
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
