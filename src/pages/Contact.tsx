import React from 'react';
import { Section } from '../components/UI/Section';

export const Contact = () => {
    return (
        <div className="page-content">
            <Section id="contact">
                <div className="section-header">
                    <h2 className="section-title">Contact Uplink</h2>
                    <div className="section-line"></div>
                </div>

                <div className="overview-text">
                    <p>
                        Interested in the NextStep Exoskeleton Project? Questions about the research or collaboration opportunities? Send a transmission.
                    </p>

                    {/* Transmission Console */}
                    <div style={{
                        marginTop: '3rem',
                        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        overflow: 'hidden'
                    }}>
                        {/* Console Header */}
                        <div style={{
                            padding: '1rem 1.5rem',
                            background: 'rgba(255, 255, 255, 0.03)',
                            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}>
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-danger)' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-warning)' }} />
                            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--color-success)' }} />
                            <span className="mono" style={{ marginLeft: '1rem', fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>
                                comm_terminal_v1.0
                            </span>
                        </div>

                        {/* Console Body */}
                        <div style={{ padding: '2rem' }}>
                            <div className="mono" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>
                                &gt; RECIPIENT
                            </div>
                            <div style={{
                                fontSize: '1.4rem',
                                fontWeight: '600',
                                color: 'var(--color-secondary)',
                                marginBottom: '2rem'
                            }}>
                                nextstep@engshen.ca
                            </div>

                            <a
                                href="mailto:nextstep@engshen.ca?subject=NextStep%20Inquiry"
                                style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    padding: '1rem 2rem',
                                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: 'var(--color-bg-main)',
                                    fontSize: '1rem',
                                    fontWeight: '600',
                                    textDecoration: 'none',
                                    cursor: 'pointer',
                                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                                }}
                            >
                                📡 Send Transmission
                            </a>
                        </div>
                    </div>

                    {/* Response Info */}
                    <div style={{
                        marginTop: '2rem',
                        padding: '1.5rem',
                        borderLeft: '3px solid var(--color-primary)',
                        background: 'rgba(255, 255, 255, 0.02)'
                    }}>
                        <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: '1.6' }}>
                            <strong>Response Time:</strong> Expect a reply within 24-48 hours.
                            For urgent matters, include <span className="mono" style={{ color: 'var(--color-warning)' }}>[PRIORITY]</span> in your subject line.
                        </p>
                    </div>
                </div>
            </Section>
        </div>
    );
};
