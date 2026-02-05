import { CircleUserRound, Eye, EyeOff, Lock } from "lucide-react";
import type { FormEventHandler } from "react";
import { useState } from "react";
import logo_site from "../../assets/images/logo_site.png";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("parent");
  const [showPassword, setShowPassword] = useState(false);
  const [parentMessage, setParentMessage] = useState(false);

  const onRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRole = event.target.value as "parent" | "school";
    setRole(newRole);
    setEmail("");
    setPassword("");
  };

  const fillDemoCredentials = () => {
    if (role === "parent") {
      setEmail("example@parent1.com");
      setPassword("Password123");
    } else if (role === "school") {
      setEmail("example@school1.com");
      setPassword("Password123");
    }
  };

  // Gestionnaire de soumission du formulaire
  const loginUser: FormEventHandler = async (event) => {
    event.preventDefault();

    try {
      // Appel à l'API pour demander une connexion
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login-${role}`,
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      if (response.status === 200) {
        console.log("it works");

        const responsee = await response.json();
        console.log(responsee.role);

        // setAuth(user);

        // navigate("/${responsee.role}/home");
      } else {
        // Log des détails de la réponse en cas d'échec
        console.info(response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className={styles[`background_${role}_login`]}>
      <img src={logo_site} alt="Le P'tit Cahier" className={styles.logo} />

      {parentMessage ? (
        <div className={styles.form}>
          <p>
            Pour obtenir vos identifiants
            <br /> de connexion, <br />
            veuillez vous adresser au représentant de l'école de votre enfant.
          </p>
          <button
            onClick={() => {
              setParentMessage(false);
            }}
            type="button"
            className="primary-button"
          >
            Retour à la connexion
          </button>
        </div>
      ) : (
        <>
          <form className={styles.form} onSubmit={loginUser}>
            <fieldset className={styles.fieldset_user}>
              <legend className="sr-only">User type</legend>

              <input
                type="radio"
                id="parent"
                value="parent"
                checked={role === "parent"}
                onChange={onRoleChange}
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
                value="school"
                checked={role === "school"}
                onChange={onRoleChange}
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                className={styles.input_field}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <Eye className={styles.icon_eye} />
                ) : (
                  <EyeOff className={styles.icon_eye} />
                )}
              </button>
            </div>

            <div className={styles.ticket_buttons_container}>
              {role === "parent" && (
                <button
                  type="button"
                  className="non-primary-button"
                  onClick={() => {
                    setParentMessage(true);
                  }}
                >
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

          <button type="button" onClick={fillDemoCredentials} className="text">
            {`Se connecter en démo ${role}`}
          </button>
        </>
      )}
    </main>
  );
}

export default Login;
