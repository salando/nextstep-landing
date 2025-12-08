import { Link } from 'react-router-dom';
import { Section } from '../components/UI/Section';
import './Contact.css';

export const Contact = () => (
    <div className="page-content contact-page">
        <Section id="contact">
            <div className="home-section-header">
                <h2 className="section-title">Contact Us</h2>
                <div className="section-line"></div>
            </div>

            <div className="contact-intro">
                <p>
                    Interested in the NextStep Exoskeleton Project? Questions about the research or collaboration opportunities? We'd love to hear from you.
                </p>
            </div>

            {/* FAQ Redirect */}
            <div className="faq-redirect-card">
                <div className="faq-redirect-content">
                    <h3>Before you reach out...</h3>
                    <p>Many technical specifications and mission details are already covered in our FAQ.</p>
                </div>
                <Link to="/faq" className="faq-button">
                    VIEW FAQ
                </Link>
            </div>

            {/* Transmission Console */}
            <div className="transmission-console">
                {/* Console Header */}
                <div className="console-header">
                    <div className="console-dot red" />
                    <div className="console-dot yellow" />
                    <div className="console-dot green" />
                    <span className="console-title">New Message</span>
                </div>

                {/* Console Body */}
                <div className="console-body">
                    <div className="recipient-label">&gt; TO:</div>
                    <div className="recipient-email">nextstep@engshen.ca</div>

                    <a
                        href="mailto:nextstep@engshen.ca?subject=NextStep%20Inquiry"
                        className="transmission-button"
                    >
                        ✉️ Send Email
                    </a>
                </div>
            </div>

            {/* Response Info */}

        </Section>
    </div>
);
