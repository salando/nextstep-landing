import { Link } from 'react-router-dom';
import { Hero } from './Home/components/Hero/Hero';
import { Section } from '@/components/UI/Section';
import { Specs } from './Home/components/Specs/Specs';
import { BackgroundAnimation } from '@/components/UI/BackgroundAnimation';
import { Reveal } from '@/components/UI/Reveal';
import { MISSION_CARDS, PROGRESS_ITEMS, FUTURE_ITEMS } from '@/data/homeData';
import '@/pages/Home.css';

export const Home = () => {
    return (
        <>
            <BackgroundAnimation />
            <Hero />

            <div id="value-prop" className="value-prop-section">
                <Reveal width="100%" yOffset={30}>
                    <div className="bento-grid">
                        <div className="bento-card main-concept glass-card">
                            <span className="mono-label">THE CONCEPT</span>
                            <h3>Think of it like an <span className="highlight-text">e-bike</span> for your legs.</h3>
                        </div>

                        <div className="bento-card stat-card glass-card">
                            <div className="bento-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                            </div>
                            <span className="big-stat">40%</span>
                            <span className="stat-label mono">METABOLIC REDUCTION</span>
                            <p>Less energy spent per step.</p>
                        </div>

                        <div className="bento-card feature-card glass-card schematic-bg">
                            <div className="bento-icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v6m0 14v-6M4.93 4.93l4.24 4.24M19.07 19.07l-4.24-4.24M2 12h6m14 0h-6M4.93 19.07l4.24-4.24M19.07 4.93l-4.24 4.24" /></svg>
                            </div>
                            <h4>Active Assistance</h4>
                            <p>A high-torque motor mounted at the hip actively swings your leg forward during the swing phase, directly augmenting your natural stride.</p>
                        </div>

                        <div className="bento-card detail-card glass-card">
                            <div className="bento-content">
                                <div className="bento-icon">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                                </div>
                                <div>
                                    <h4>Natural Feel</h4>
                                    <p>Advanced sensors predict your intent, so it moves <em>with</em> you, not for you.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>

            <Section id="overview">
                <div className="home-section-header">
                    <h2 className="section-title">Our Mission</h2>
                    <div className="section-line"></div>
                </div>
                <div className="mission-content">
                    <Reveal>
                        <p className="lead-text">
                            Movement should have no limits. <span className="highlight">NextStep</span> is designed to make advanced exoskeleton technology accessible to everyone.
                        </p>
                    </Reveal>

                    <div className="mission-cards">
                        {MISSION_CARDS.map((card, index) => (
                            <Reveal key={card.number} delay={index * 0.1} width="100%">
                                <div className="mission-card">
                                    <div className="card-number">{card.number}</div>
                                    <h4>{card.title}</h4>
                                    <p>{card.description}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Section>

            <Section id="status">
                <div className="home-section-header">
                    <h2 className="section-title">Development Status</h2>
                    <div className="section-line"></div>
                </div>

                <Reveal width="100%">
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
                </Reveal>

                <div className="progress-overview">
                    {PROGRESS_ITEMS.map((item, index) => (
                        <Reveal key={index} delay={index * 0.1} width="100%">
                            <div className={`progress-item ${item.status}`}>
                                <span className="progress-icon">{item.icon}</span>
                                <div className="progress-content">
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal width="100%" yOffset={20}>
                    <div className="home-cta-container">
                        <Link to="/development" className="cta-button home-cta-button">
                            VIEW FULL DEVELOPMENT LOG
                        </Link>
                        <Link to="/research" className="cta-button secondary">
                            READ THE RESEARCH
                        </Link>
                    </div>
                </Reveal>
            </Section>

            <Section id="specs">
                <div className="home-section-header">
                    <h2 className="section-title">System Architecture</h2>
                    <div className="section-line"></div>
                </div>
                <div className="specs-intro">
                    <p>Every component carefully selected to balance performance, weight, and cost.</p>
                </div>
                <Reveal width="100%">
                    <Specs />
                </Reveal>
            </Section>

            <Section id="future">
                <div className="future-section">
                    <div className="future-header">
                        <h2 className="mono">FUTURE ROADMAP</h2>
                    </div>
                    <div className="future-items">
                        {FUTURE_ITEMS.map((item, index) => (
                            <Reveal key={item.number} delay={index * 0.1} width="100%">
                                <div className="future-item">
                                    <div className="future-number">{item.number}</div>
                                    <h4>{item.title}</h4>
                                    <p>{item.description}</p>
                                </div>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </Section>
        </>
    );
};
