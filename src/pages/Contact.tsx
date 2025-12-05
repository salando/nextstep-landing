import { Section } from '../components/UI/Section';

export const Contact = () => (
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
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    overflow: 'hidden'
                }}>
                    {/* Console Header */}
                    <div style={{
                        padding: '1rem 1.5rem',
                        background: 'rgba(255, 255, 255, 0.03)',
                        borderBottom: '1px solid var(--color-border)',
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
                            color: 'var(--color-primary)',
                            marginBottom: '2rem'
                        }}>
                            nextstep@engshen.ca
                        </div>

                        <a
                            href="mailto:nextstep@engshen.ca?subject=NextStep%20Inquiry"
                            className="cta-button"
                            style={{
                                display: 'inline-block',
                                textDecoration: 'none',
                                fontSize: '1rem',
                                padding: '1rem 2rem'
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
