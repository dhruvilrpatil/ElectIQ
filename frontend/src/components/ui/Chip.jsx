import styles from './Chip.module.css';

function Chip({ variant = 'assist', icon, label, selected = false, onClick, className = '' }) {
  return (
    <button
      type="button"
      className={`${styles.chip} ${styles[variant]} ${selected ? styles.selected : ''} ${className}`}
      onClick={onClick}
      aria-pressed={selected}
    >
      {icon && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      <span className={styles.label}>{label}</span>
    </button>
  );
}

export default Chip;
