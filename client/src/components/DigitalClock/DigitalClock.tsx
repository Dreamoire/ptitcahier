import { useEffect, useState } from "react";
import styles from "./DigitalClock.module.css";

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, "0");

  return (
    <main className={styles.clockContainer}>
      <section className={styles.glassMorphism}>
        <div className={styles.clockDisplay}>
          <span className={styles.timeUnit}>{formatTime(time.getHours())}</span>
          <span className={styles.separator}>:</span>
          <span className={styles.timeUnit}>
            {formatTime(time.getMinutes())}
          </span>
          <span className={styles.separator}>:</span>
          <span className={`${styles.timeUnit} ${styles.accent}`}>
            {formatTime(time.getSeconds())}
          </span>
        </div>
      </section>
    </main>
  );
}

export default DigitalClock;
