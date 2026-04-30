import React from 'react';
import styles from './Card.module.css';

function Card({ variant = 'elevated', onClick, className = '', children, ...props }) {
  return (
    <div
      className={`${styles.card} ${styles[variant]} ${onClick ? styles.clickable : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(e); } : undefined}
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;
