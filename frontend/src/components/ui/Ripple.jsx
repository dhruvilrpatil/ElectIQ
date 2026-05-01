import { useRef, useCallback } from 'react';
import styles from './Ripple.module.css';

function Ripple({ children, className = '', ...props }) {
  const containerRef = useRef(null);

  const handleClick = useCallback((e) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const wave = document.createElement('span');
    wave.className = styles.wave;
    wave.style.cssText = `width:${size}px;height:${size}px;left:${x}px;top:${y}px`;
    container.appendChild(wave);
    wave.addEventListener('animationend', () => wave.remove());
  }, []);

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`} onClick={handleClick} {...props}>
      {children}
    </div>
  );
}

export default Ripple;
