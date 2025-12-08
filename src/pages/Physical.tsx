import { Section } from '../components/UI/Section';
import { ProgressFeed } from '../components/Progress/ProgressFeed';
import './Physical.css';

export const Physical = () => {
    return (
        <div className="physical-page page-content">
            <Section id="physical-intro">
                <div className="physical-intro">
                    <h1 className="section-title">Physical Progress</h1>
                    <div className="section-line"></div>
                    <div className="status-header">
                        <p className="mono-text"><strong>Latest Status:</strong> Motor Integration</p>
                        <p className="mono-text"><strong>Date:</strong> December 7, 2025</p>
                    </div>
                </div>

                {/* Featured Report: Motor Integration (Most Recent Critical Update) */}
                <div className="report-content">
                    <div className="report-section">
                        <h3>1. Project Goal</h3>
                        <p>
                            Establish precise control of the GIM8108 (Xiaomi CyberGear) motor via CAN Bus to serve as the primary actuator for the NextStep lower-body exoskeleton.
                        </p>
                    </div>

                    <div className="report-section">
                        <h3>2. Hardware Configuration</h3>
                        <ul className="spec-list">
                            <li><strong>Protocol:</strong> CAN Bus (Not RS485)</li>
                            <li><strong>Controller:</strong> Waveshare RS485/CAN HAT (MCP2515 Controller)</li>
                            <li><strong>Actuator:</strong> GIM8108 Motor</li>
                            <li>
                                <strong>Physical Connections:</strong>
                                <ul>
                                    <li>CAN High: Motor Yellow Wire → HAT CAN H</li>
                                    <li>CAN Low: Motor White Wire → HAT CAN L</li>
                                    <li>Power: 24V DC Supply (Shared Ground)</li>
                                    <li>Termination: 120Ω Resistor Jumper set to ON</li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className="report-section">
                        <h3>3. Software Environment</h3>
                        <ul className="spec-list">
                            <li><strong>OS Level:</strong> Interface `can0` enabled (1Mbps).</li>
                            <li><strong>Python Env:</strong> Virtual environment in `~/NextStep_OS/.venv`.</li>
                            <li><strong>Driver:</strong> `jgillick/python-cybergear` (v0.2.0).</li>
                            <li><strong>Implementation:</strong> `test_motor.py` script commanding position mode and sine wave oscillation.</li>
                        </ul>
                    </div>

                    <div className="report-section">
                        <h3>4. Current Issues & Next Steps</h3>
                        <div className="status-alert alert-warning">
                            <strong>Critical Failure:</strong> CAN communication is unresponsive. The motor does not acknowledge commands (No heartbeat/feedback).
                        </div>
                        <p><strong>Investigation Plan:</strong></p>
                        <ul>
                            <li>Physical Integrity Check: Verify CAN H and CAN L lines.</li>
                            <li>Signal Verification: Use `candump can0` to detect raw frames.</li>
                        </ul>
                    </div>
                </div>

                {/* Dynamic Build Journal Feed */}
                <div className="journal-section">
                    <div className="section-header">
                        <h2 className="section-title">Build Journal</h2>
                        <div className="section-line"></div>
                    </div>
                    <ProgressFeed />
                </div>
            </Section>
        </div>
    );
};
