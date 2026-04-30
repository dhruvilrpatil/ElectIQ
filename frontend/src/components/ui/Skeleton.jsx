import React from 'react';
import styles from './Skeleton.module.css';

function Skeleton({ width, height, variant = 'rectangular', className = '' }) {
  const style = {};
  if (width) style.width = typeof width === 'number' ? `${width}px` : width;
  if (height) style.height = typeof height === 'number' ? `${height}px` : height;
  return (
    <span
      className={`${styles.skeleton} ${styles[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

export default Skeleton;
