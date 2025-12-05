import { Section } from '../components/UI/Section';
import './Contact.css';

export const Contact = () => (
    <div className="page-content contact-page">
        <Section id="contact">
            <div className="home-section-header">
                <h2 className="section-title">Contact Uplink</h2>
                <div className="section-line"></div>
            </div>

            <div className="contact-intro">
                <p>
                    Interested in the NextStep Exoskeleton Project? Questions about the research or collaboration opportunities? Send a transmission.
                </p>
            </div>

            {/* Transmission Console */}
            <div className="transmission-console">
                {/* Console Header */}
                <div className="console-header">
                    <div className="console-dot red" />
                    <div className="console-dot yellow" />
                    <div className="console-dot green" />
                    <span className="console-title">comm_terminal_v1.0</span>
                </div>

                {/* Console Body */}
                <div className="console-body">
                    <div className="recipient-label">&gt; RECIPIENT</div>
                    <div className="recipient-email">nextstep@engshen.ca</div>

                    <a
                        href="mailto:nextstep@engshen.ca?subject=NextStep%20Inquiry"
                        className="transmission-button"
                    >
                        📡 Send Transmission
                    </a>
                </div>
            </div>

            {/* Response Info */}
            <div className="response-info">
                <p>
                    <strong>Response Time:</strong> Expect a reply within 24-48 hours.
                    For urgent matters, include <span className="priority-tag">[PRIORITY]</span> in your subject line.
                </p>
            </div>
        </Section>
    </div>
);
