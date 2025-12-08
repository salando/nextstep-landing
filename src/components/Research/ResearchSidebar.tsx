import { useState, useEffect } from 'react';
import './ResearchSidebar.css';

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

export const ResearchSidebar = () => {
    const [activeSection, setActiveSection] = useState<string>('research-intro');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 200;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = document.getElementById(sections[i].id);
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(sections[i].id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Set initial active section

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
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
        }
    };

    return (
        <aside className="research-sidebar">
            <div className="sidebar-header">
                <h3>Contents</h3>
            </div>
            <nav className="sidebar-track">
                {sections.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className={`sidebar-link ${activeSection === section.id ? 'active' : ''}`}
                        onClick={(e) => handleClick(e, section.id)}
                    >
                        <span className="link-dot"></span>
                        {section.label}
                    </a>
                ))}
            </nav>
        </aside>
    );
};
