import React from 'react';
import { Hero } from '../components/Hero/Hero';
import { Section } from '../components/UI/Section';
import { StatusBoard } from '../components/Progress/StatusBoard';
import { Specs } from '../components/Specs/Specs';

export const Home = () => {
    return (
        <>
            <Hero />

            <Section id="overview">
                <div className="section-header">
                    <h2 className="section-title">Mission Objective</h2>
                    <div className="section-line"></div>
                </div>
                <div className="overview-text">
                    <p>
                        The <span className="highlight">NextStep Exoskeleton Project</span> is a comprehensive engineering initiative
                        aimed at developing a functional lower-body assistive device. By integrating high-torque brushless motors
                        with advanced sensor arrays, the system creates a responsive support framework for human movement.
                    </p>
                </div>
            </Section>

            <Section id="status">
                <div className="section-header">
                    <h2 className="section-title">Development Status</h2>
                    <div className="section-line"></div>
                </div>
                <div className="overview-text">
                    <p>
                        Current Phase: <span className="highlight">HARDWARE INTEGRATION</span>
                    </p>
                    <p>
                        View the detailed engineering log and task breakdown on the Development page.
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <a href="/development" className="cta-button" style={{ textDecoration: 'none', fontSize: '0.9rem', padding: '0.8rem 2rem' }}>
                            VIEW FULL LOG
                        </a>
                    </div>
                </div>
            </Section>

            <Section id="specs">
                <div className="section-header">
                    <h2 className="section-title">System Architecture</h2>
                    <div className="section-line"></div>
                </div>
                <Specs />
            </Section>

            <Section id="future">
                <div className="future-banner">
                    <h2 className="mono">FUTURE MODULES</h2>
                    <p>Adaptive AI Gait Learning & Mobile Companion App</p>
                    <span className="status-tag">OPTIONAL</span>
                </div>
            </Section>
        </>
    );
};
