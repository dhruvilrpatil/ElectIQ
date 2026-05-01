import styles from './Button.module.css';

function Button({ variant = 'filled', size = 'medium', icon, loading = false, disabled = false, onClick, children, className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[variant]} ${styles[size]} ${loading ? styles.loading : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
      {...props}
    >
      {loading && <span className={styles.spinner} aria-hidden="true" />}
      {icon && !loading && <span className={styles.icon} aria-hidden="true">{icon}</span>}
      {children && <span className={styles.label}>{children}</span>}
    </button>
  );
}

export default Button;
