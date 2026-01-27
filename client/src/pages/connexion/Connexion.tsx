import "../../styles/reset.css";
import "../../styles/variables.css";
import "../../styles/typography.css";
import "../../styles/global.css";
import { useState } from "react";
import styles from "./Connexion.module.css";

const users = ["Parent", "École"];

function Connexion() {
  const [userType, setUserType] = useState("Parent");

  console.log(userType);

  return (
    <main className={styles[`background_${userType}`]}>
      <form className={styles.form}>
        <fieldset className={styles.fieldset_user}>
          <ul>
            {users.map((user) => (
              <li key={user}>
                <input
                  type="radio"
                  id={user}
                  name="user-type"
                  value={user}
                  aria-required="true"
                  className={styles.radio_button}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <label
                  htmlFor={user}
                  className={`${styles.radio_button_label} ${styles[`radio_button_label_${userType}`]}`}
                >
                  {user}
                </label>
              </li>
            ))}
          </ul>
        </fieldset>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button
          type="submit"
          className={`primary-button ${styles[`btn_connexion_${userType}`]}`}
        >
          Se connecter
        </button>
      </form>
    </main>
  );
}

export default Connexion;
