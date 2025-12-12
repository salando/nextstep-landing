import { useState, useEffect } from 'react';
import './ResearchTableOfContents.css';

const sections = [
    { id: 'research-intro', label: 'Overview' },
    { id: 'introduction', label: 'Introduction' },
    { id: 'biomechanics', label: 'Biomechanics' },
    { id: 'power-analysis', label: 'Power Analysis' },
    { id: 'methodology', label: 'Design Approach' },
    { id: 'motor-types', label: 'Motor Types' },
    { id: 'gearing', label: 'Gearing' },
    { id: 'motor-research', label: 'Motor Selection' },
    { id: 'budget', label: 'Budget' },
    { id: 'belt-research', label: 'Belt Research' },
    { id: 'hardware-showcase', label: 'Hardware' }
];

export const ResearchTableOfContents = () => {
    const [activeSection, setActiveSection] = useState<string>('research-intro');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
        e.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            const headerOffset = 100;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Immediate feedback
            setActiveSection(sectionId);
        }
    };

    return (
        <aside className="toc-sidebar">
            <div className="toc-header">
                <h3>Contents</h3>
            </div>
            <nav className="toc-track">
                {sections.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`toc-link ${activeSection === section.id ? 'active' : ''}`}
                        onClick={(e) => scrollToSection(e, section.id)}
                    >
                        <span className="toc-dot"></span>
                        {section.label}
                    </a>
                ))}
            </nav>
        </aside>
    );
};
