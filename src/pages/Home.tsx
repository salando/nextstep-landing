import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero/Hero';
import { Section } from '../components/UI/Section';
import { Specs } from '../components/Specs/Specs';
import { BackgroundAnimation } from '../components/UI/BackgroundAnimation';
import './Home.css';

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
                        <div className="mission-card">
                            <div className="card-number">01</div>
                            <h4>Accessible Technology</h4>
                            <p>Built on a student budget of $600 CAD, proving that advanced robotics does not require massive funding.</p>
                        </div>
                        <div className="mission-card">
                            <div className="card-number">02</div>
                            <h4>Real Performance</h4>
                            <p>22 Peak Nm (~0.44 HP) of torque per motor, designed to reduce walking effort by at least 20%.</p>
                        </div>
                        <div className="mission-card">
                            <div className="card-number">03</div>
                            <h4>Dual Purpose</h4>
                            <p>From restoring mobility to enhancing performance. One platform, multiple applications.</p>
                        </div>
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
                    <div className="progress-item completed">
                        <span className="progress-icon">✓</span>
                        <div className="progress-content">
                            <h4>Motor Research</h4>
                            <p>Analyzed commercial exoskeletons, calculated power requirements</p>
                        </div>
                    </div>
                    <div className="progress-item completed">
                        <span className="progress-icon">✓</span>
                        <div className="progress-content">
                            <h4>Component Selection</h4>
                            <p>Selected GIM8108-8 motors with integrated planetary gearbox</p>
                        </div>
                    </div>
                    <div className="progress-item active">
                        <span className="progress-icon">→</span>
                        <div className="progress-content">
                            <h4>Parts Sourcing</h4>
                            <p>Ordering motors, batteries, and control systems</p>
                        </div>
                    </div>
                    <div className="progress-item pending">
                        <span className="progress-icon">○</span>
                        <div className="progress-content">
                            <h4>Assembly & Testing</h4>
                            <p>Frame construction, motor coding, safety validation</p>
                        </div>
                    </div>
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
                        <div className="future-item">
                            <div className="future-number">01</div>
                            <h4>Adaptive AI Gait Learning</h4>
                            <p>Machine learning algorithms that adapt to your walking style over time</p>
                        </div>
                        <div className="future-item">
                            <div className="future-number">02</div>
                            <h4>Mobile Companion App</h4>
                            <p>Monitor battery, adjust assistance levels, track activity</p>
                        </div>
                        <div className="future-item">
                            <div className="future-number">03</div>
                            <h4>Extended Battery System</h4>
                            <p>Hot-swappable battery packs for all-day operation</p>
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
};
