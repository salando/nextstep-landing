import { Section } from '../components/UI/Section';
import './Physical.css';

export const Physical = () => {
    return (
        <div className="physical-page page-content">
            <Section id="physical-intro">
                <div className="physical-intro">
                    <h1 className="section-title">Physical Progress</h1>
                    <div className="section-line"></div>
                    <p>
                        Documentation of the physical build process, from component assembly to final integration.
                        Here you will find images and updates on the hardware construction.
                    </p>
                </div>

                <div className="construction-notice">
                    <h3 className="mono">🚧 UNDER CONSTRUCTION</h3>
                    <p>
                        The physical build is currently in progress.
                        Photos and documentation will be uploaded as components are assembled.
                    </p>
                </div>

                <div className="gallery-section">
                    <div className="section-header">
                        <h2 className="section-title">Build Gallery</h2>
                        <div className="section-line"></div>
                    </div>

                    <div className="gallery-grid">
                        <div className="gallery-placeholder">
                            <span className="icon">📷</span>
                            <span>Pending Upload...</span>
                        </div>
                        <div className="gallery-placeholder">
                            <span className="icon">📷</span>
                            <span>Pending Upload...</span>
                        </div>
                        <div className="gallery-placeholder">
                            <span className="icon">📷</span>
                            <span>Pending Upload...</span>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
};
