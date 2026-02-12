import styles from "./AnnouncementContentTextarea.module.css";

export const MAX_ANNOUNCEMENT_CONTENT_LENGTH = 1000;

type AnnouncementContentTextareaProps = {
  value: string;
  onChange: (nextValue: string) => void;
  maxLength?: number;
  placeholder?: string;
  ariaLabel?: string;
  ariaRequired?: boolean;
  name?: string;
  id?: string;
  disabled?: boolean;
};

function AnnouncementContentTextarea({
  value,
  onChange,
  maxLength = MAX_ANNOUNCEMENT_CONTENT_LENGTH,
  placeholder,
  ariaLabel,
  ariaRequired,
  name,
  id,
  disabled = false,
}: AnnouncementContentTextareaProps) {
  return (
    <div className={styles.textarea_wrapper}>
      <textarea
        id={id}
        name={name}
        aria-label={ariaLabel}
        aria-required={ariaRequired}
        className={styles.textarea}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
      />
      <p className={styles.character_counter}>
        {value.length} / {maxLength}
      </p>
    </div>
  );
}

export default AnnouncementContentTextarea;
