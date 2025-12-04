
import React from 'react';
import { useOnScreen } from '../../hooks/useOnScreen';
import './Section.css';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ children, className = '', id }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section 
      id={id}
      ref={ref} 
      className={`section-padding reveal-section ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      <div className="container">
        {children}
      </div>
    </section>
  );
};
