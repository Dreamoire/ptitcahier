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
  const [submitValidationWarning, setSubmitValidationWarning] =
    useState<boolean>(false);
  const [invalidLoginWarning, setInvalidLoginWarning] =
    useState<boolean>(false);

  const clearWarnings = () => {
    if (submitValidationWarning) setSubmitValidationWarning(false);
    if (invalidLoginWarning) setInvalidLoginWarning(false);
  };

  const onRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearWarnings();
    const newRole = event.target.value as "parent" | "school";
    setRole(newRole);
    setEmail("");
    setPassword("");
  };

  const fillDemoCredentials = () => {
    clearWarnings();
    if (role === "parent") {
      setEmail("example@parent1.com");
      setPassword("Password123");
    } else if (role === "school") {
      setEmail("example@school1.com");
      setPassword("Password123");
    }
  };

  const loginUser: FormEventHandler = async (event) => {
    event.preventDefault();

    const trimmedEmail = email.trim();
    const emailInvalid =
      !trimmedEmail.includes("@") || !trimmedEmail.includes(".");
    const passwordInvalid = !password || password.length < 6;

    if (!trimmedEmail || passwordInvalid || emailInvalid) {
      setSubmitValidationWarning(true);
      return;
    }

    fetch(`${import.meta.env.VITE_API_URL}/api/login-${role}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }

        if (response.status === 422) {
          setInvalidLoginWarning(true);
        }

        throw new Error("unknown-error");
      })
      .then((data) => {
        console.log("it works");
        console.log(data.role);

        // setAuth(data);
        // navigate(`/${data.role}/home`);
      });
  };

  return (
    <main className={styles[`background_${role}_login`]}>
      <div className={styles.login_container}>
        <img src={logo_site} alt="Le P'tit Cahier" className={styles.logo} />

        {parentMessage ? (
          <div className={styles.form}>
            <p className={styles.parent_message}>
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

              <div
                className={`${styles.input_wrapper} ${
                  submitValidationWarning ? styles.input_error : ""
                }`}
              >
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <CircleUserRound className={styles.icon} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  autoComplete="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    clearWarnings();
                  }}
                  placeholder="Email"
                  className={styles.input_field}
                />
              </div>

              <div
                className={`${styles.input_wrapper} ${
                  submitValidationWarning ? styles.input_error : ""
                }`}
              >
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <Lock className={styles.icon} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    clearWarnings();
                  }}
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
                      clearWarnings();
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

              {submitValidationWarning && (
                <p className={styles.warning} role="alert" aria-live="polite">
                  Veuillez saisir une adresse e-mail et un mot de passe valides.
                </p>
              )}

              {invalidLoginWarning && (
                <p className={styles.warning} role="alert" aria-live="polite">
                  Adresse e-mail ou mot de passe invalide.
                </p>
              )}
            </form>

            <button
              type="button"
              onClick={fillDemoCredentials}
              className={styles.demo}
            >
              {`Connexion en démo ${role}`}
            </button>
          </>
        )}
      </div>
    </main>
  );
}

export default Login;
