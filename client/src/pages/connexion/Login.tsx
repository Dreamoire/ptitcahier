import { CircleUserRound, Eye, Lock } from "lucide-react";
import { useState } from "react";
import logo_site from "../../assets/images/logo_site.png";
import styles from "./Login.module.css";

function Login() {
  const [role, setRole] = useState("parent");

  return (
    <main className={styles[`background_${role}_login`]}>
      <img src={logo_site} alt="Le P'tit Cahier" className={styles.logo} />
      <form className={styles.form}>
        <fieldset className={styles.fieldset_user}>
          <legend className="sr-only">User type</legend>

          <input
            type="radio"
            id="parent"
            name="role"
            value="parent"
            checked={role === "parent"}
            onChange={(e) => setRole(e.target.value)}
            className={styles.radio_button}
          />
          <label
            htmlFor="parent"
            className={`${styles.radio_button_label} ${
              role === "parent" ? styles.label_checked_parent : ""
            }`}
          >
            Parent
          </label>

          <input
            type="radio"
            id="school"
            name="role"
            value="school"
            checked={role === "school"}
            onChange={(e) => setRole(e.target.value)}
            className={styles.radio_button}
          />
          <label
            htmlFor="school"
            className={`${styles.radio_button_label} ${
              role === "school" ? styles.label_checked_school : ""
            }`}
          >
            School
          </label>
        </fieldset>

        <div className={styles.input_wrapper}>
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <CircleUserRound className={styles.icon} />
          <input
            id="email"
            type="email"
            // ref={emailRef}
            placeholder="Email"
            className={styles.input_field}
          />
        </div>

        <div className={styles.input_wrapper}>
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <Lock className={styles.icon} />
          <input
            id="password"
            type="password"
            // ref={passwordRef}
            placeholder="Password"
            className={styles.input_field}
          />
          <Eye className={styles.icon_end} />
        </div>

        <div className={styles.ticket_buttons_container}>
          {role === "parent" && (
            <button type="button" className="non-primary-button">
              Pas de compte ?
            </button>
          )}

          {role === "school" && (
            <button type="button" className="non-primary-button">
              Créer un compte
            </button>
          )}
          <button
            type="submit"
            className={`primary-button ${
              role === "parent" ? styles.btn_connect_parent : ""
            }`}
          >
            Se connecter
          </button>
        </div>
      </form>
    </main>
  );
}

export default Login;
