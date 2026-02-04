import styles from "./CalendarCard.module.css";

function CalendarCard() {
  const today = new Date();
  const currentDay = today.getDate();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const monthName = today.toLocaleDateString("fr-FR", {
    month: "long",
    year: "numeric",
  });

  const weekDays = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const offset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;
  const emptySlots = Array.from({ length: offset }, (_, i) => `empty-${i}`);

  return (
    <article className={styles.calendarContainer}>
      <h3 className={styles.monthTitle}>{monthName}</h3>

      <div className={styles.grid}>
        {weekDays.map((day) => (
          <span key={day} className={styles.weekDay}>
            {day}
          </span>
        ))}

        {emptySlots.map((emptySlotkey) => (
          <div key={emptySlotkey} className={styles.dayCell} />
        ))}

        {daysArray.map((dayNumber) => (
          <div
            key={dayNumber}
            className={`${styles.dayCell} ${
              dayNumber === currentDay ? styles.today : ""
            }`}
          >
            {dayNumber}
          </div>
        ))}
      </div>
    </article>
  );
}

export default CalendarCard;
