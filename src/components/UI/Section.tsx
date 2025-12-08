
import { FC } from 'react';
import { useOnScreen } from '../../hooks/useOnScreen';
import './Section.css';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export const Section: FC<SectionProps> = ({ children, className = '', id }) => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

  return (
    <section
      id={id}
      className={`section-padding ${className}`}
    >
      <div ref={ref} className={`reveal-section ${isVisible ? 'is-visible' : ''}`}>
        <div className="container">
          {children}
        </div>
      </div>
    </section>
  );
};
