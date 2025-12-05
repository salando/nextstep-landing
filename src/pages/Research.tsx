import React from 'react';
import { Section } from '../components/UI/Section';

export const Research = () => {
    return (
        <div className="page-content">
            <Section id="research-header">
                <div className="section-header">
                    <h2 className="section-title">Capstone Research</h2>
                    <div className="section-line"></div>
                </div>
                <div className="overview-text">
                    <p>
                        The following documentation details the component selection and mechanical design process for the NextStep Exoskeleton.
                    </p>
                </div>
            </Section>

            <Section id="motor-selection">
                <div className="section-header">
                    <h3 className="section-title" style={{ fontSize: '1.5rem' }}>01 // Motor Selection</h3>
                    <div className="section-line"></div>
                </div>
                <div className="overview-text">
                    <p>
                        Meeting the project's torque requirements proved challenging within budget constraints. High-end actuators like those from Hypershell cost upwards of $2900 CAD, far exceeding our budget.
                    </p>
                    <br />
                    <p>
                        <strong>Selected Solution: GIM8108-8</strong>
                    </p>
                    <p>
                        We identified the <span className="highlight">GIM8108-8</span> from Steadywin as the optimal choice. It features an integrated planetary gearbox (1:8 ratio), providing high torque in a compact form factor.
                    </p>
                    <ul style={{ marginTop: '1rem', listStyle: 'none', paddingLeft: 0 }}>
                        <li style={{ marginBottom: '0.5rem' }}><span className="mono" style={{ color: 'var(--color-secondary)' }}>TORQUE:</span> 7.50 Nm</li>
                        <li style={{ marginBottom: '0.5rem' }}><span className="mono" style={{ color: 'var(--color-secondary)' }}>CURRENT:</span> 7.00 A (Improved Efficiency)</li>
                        <li style={{ marginBottom: '0.5rem' }}><span className="mono" style={{ color: 'var(--color-secondary)' }}>WEIGHT:</span> 396g (per motor)</li>
                    </ul>
                    <p>
                        Compared to the GIM6010-8, the GIM8108-8 offers a <span className="highlight">50% torque increase</span> (from 5.00 Nm to 7.50 Nm) and a 133% efficiency increase, making it the superior candidate for assistive robotics.
                    </p>
                </div>
            </Section>

            <Section id="mechanical-design">
                <div className="section-header">
                    <h3 className="section-title" style={{ fontSize: '1.5rem' }}>02 // Mechanical Design</h3>
                    <div className="section-line"></div>
                </div>
                <div className="overview-text">
                    <p>
                        <strong>Belt & Mounting System</strong>
                    </p>
                    <p>
                        The waist was modeled as an ellipse to ensure a proper fit. For a 75-100cm waist, the width-to-depth ratio is approximately 1.3:1.
                    </p>
                    <p>
                        We evaluated multiple belt designs using a decision matrix focusing on durability, reliability, comfort, and ease of use.
                    </p>
                    <div style={{
                        marginTop: '2rem',
                        marginBottom: '2rem',
                        padding: '1.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '8px'
                    }}>
                        <h4 className="mono" style={{ marginTop: 0, color: 'var(--color-primary)' }}>DESIGN MATRIX RESULTS</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
                            <div>
                                <div className="mono" style={{ fontSize: '0.8rem', opacity: 0.7 }}>RATCHET BELT</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>18/19</div>
                            </div>
                            <div>
                                <div className="mono" style={{ fontSize: '0.8rem', opacity: 0.7 }}>SLIDE BELT</div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>17/19</div>
                            </div>
                        </div>
                    </div>
                    <p>
                        The <span className="highlight">Ratchet Belt</span> system was selected for its superior durability (8/8) and reliability (5/5). This mechanism will be reinforced with a rigid frame to support the motor torque and battery weight.
                    </p>
                </div>
            </Section>

            <Section id="cost-analysis">
                <div className="section-header">
                    <h3 className="section-title" style={{ fontSize: '1.5rem' }}>03 // Cost Analysis</h3>
                    <div className="section-line"></div>
                </div>
                <div className="overview-text">
                    <p>
                        By selecting industrial-grade robotic actuators instead of specialized exoskeleton motors, we significantly reduced costs.
                    </p>
                    <ul style={{ marginTop: '1rem', listStyle: 'none', paddingLeft: 0 }}>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <span className="mono" style={{ color: 'var(--color-secondary)' }}>MOTORS (x2):</span> ~$275 CAD
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <span className="mono" style={{ color: 'var(--color-secondary)' }}>BATTERIES (4S):</span> ~$100 CAD
                        </li>
                        <li style={{ marginBottom: '0.5rem' }}>
                            <span className="mono" style={{ color: 'var(--color-secondary)' }}>FRAME/MISC:</span> ~$150 CAD
                        </li>
                    </ul>
                    <p>
                        This approach keeps the core drive system under <span className="highlight">$600 CAD</span>, making the project viable within the student budget while maintaining high performance.
                    </p>
                </div>
            </Section>
        </div>
    );
};
