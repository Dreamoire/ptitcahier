import { useNavigate } from "react-router-dom";
import ptit_cahier_logo_original from "../../assets/images/ptit_cahier_logo_original.png";
import styles from "./Redirection.module.css";

const Redirection = () => {
  const navigate = useNavigate();

  return (
    <main className="parent-background">
      <div className={styles.login_container}>
        <img
          src={ptit_cahier_logo_original}
          alt="Le P'tit Cahier"
          className={styles.logo}
        />
        <div className={styles.form}>
          <p className={styles.message}>Une erreur est survenue.</p>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="primary-button"
          >
            Retour à la connexion
          </button>
        </div>
      </div>
    </main>
  );
};

export default Redirection;
