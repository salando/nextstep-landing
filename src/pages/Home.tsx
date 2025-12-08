import { Link } from 'react-router-dom';
import { Hero } from '@/components/Hero/Hero';
import { Section } from '@/components/UI/Section';
import { Specs } from '@/components/Specs/Specs';
import { BackgroundAnimation } from '@/components/UI/BackgroundAnimation';
import { MISSION_CARDS, PROGRESS_ITEMS, FUTURE_ITEMS } from '@/data/homeData';
import '@/pages/Home.css';

export const Home = () => {
    return (
        <>
            <BackgroundAnimation />
            <Hero />

            <Section id="overview">
                <div className="home-section-header">
                    <h2 className="section-title">Our Mission</h2>
                    <div className="section-line"></div>
                </div>
                <div className="mission-content">
                    <p className="lead-text">
                        Movement should have no limits. <span className="highlight">NextStep</span> is designed to make advanced exoskeleton technology accessible to everyone.
                    </p>

                    <div className="mission-cards">
                        {MISSION_CARDS.map((card) => (
                            <div className="mission-card" key={card.number}>
                                <div className="card-number">{card.number}</div>
                                <h4>{card.title}</h4>
                                <p>{card.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>

            <Section id="status">
                <div className="home-section-header">
                    <h2 className="section-title">Development Status</h2>
                    <div className="section-line"></div>
                </div>

                <div className="status-banner">
                    <div className="status-indicator">
                        <span className="status-dot pulse"></span>
                        <span className="status-label mono">CURRENT PHASE</span>
                    </div>
                    <h3 className="status-phase">Hardware Integration</h3>
                    <p className="status-desc">
                        Motors sourced, control systems under development. Moving from research to physical assembly.
                    </p>
                </div>

                <div className="progress-overview">
                    {PROGRESS_ITEMS.map((item, index) => (
                        <div className={`progress-item ${item.status}`} key={index}>
                            <span className="progress-icon">{item.icon}</span>
                            <div className="progress-content">
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="home-cta-container">
                    <Link to="/development" className="cta-button home-cta-button">
                        VIEW FULL DEVELOPMENT LOG
                    </Link>
                    <Link to="/research" className="cta-button secondary">
                        READ THE RESEARCH
                    </Link>
                </div>
            </Section>

            <Section id="specs">
                <div className="home-section-header">
                    <h2 className="section-title">System Architecture</h2>
                    <div className="section-line"></div>
                </div>
                <div className="specs-intro">
                    <p>Every component carefully selected to balance performance, weight, and cost.</p>
                </div>
                <Specs />
            </Section>

            <Section id="future">
                <div className="future-section">
                    <div className="future-header">
                        <h2 className="mono">FUTURE ROADMAP</h2>
                        <span className="status-tag">PLANNED</span>
                    </div>
                    <div className="future-items">
                        {FUTURE_ITEMS.map((item) => (
                            <div className="future-item" key={item.number}>
                                <div className="future-number">{item.number}</div>
                                <h4>{item.title}</h4>
                                <p>{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Section>
        </>
    );
};
