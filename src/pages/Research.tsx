import { useState, ReactNode } from 'react';
import { Section } from '../components/UI/Section';
import { HardwareGrid } from '../components/Research/HardwareGrid';
import './Research.css';

// Expandable section component for technical details
const ExpandableSection = ({ title, children }: { title: string; children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={`expandable-section ${isOpen ? 'open' : ''}`}>
            <button className="expandable-toggle" onClick={() => setIsOpen(!isOpen)}>
                <span className="toggle-icon">{isOpen ? '−' : '+'}</span>
                <span>{title}</span>
            </button>
            <div className="expandable-content-wrapper">
                <div className="expandable-content">{children}</div>
            </div>
        </div>
    );
};

// Info tooltip for technical terms (hover to show)
const TechTerm = ({ term, explanation }: { term: string; explanation: string }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <span
            className="tech-term-wrapper"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <span className={`tech-term ${isOpen ? 'active' : ''}`}>
                {term}
                <span className="term-indicator">?</span>
            </span>
            {isOpen && (
                <span className="tech-tooltip">
                    {explanation}
                </span>
            )}
        </span>
    );
};

export const Research = () => {
    return (
        <div className="research-page page-content">
            <Section id="research-intro">
                <div className="research-intro">
                    <h1 className="section-title intro-title">The Engineering Journey</h1>
                    <div className="section-line intro-line"></div>
                    <p className="intro-lead">
                        The development of an active exoskeleton presents a complex optimization challenge, requiring the integration of biomechanics, mechanical engineering, and control systems constrained by a strictly limited budget and weight envelope.
                        We navigated strict constraints: a student budget of <span className="highlight">$600 CAD</span>, a weight limit of <span className="highlight">2.5kg</span>, and the necessity for high-torque actuation.
                    </p>
                </div>
            </Section>

            <div className="container">
                <div className="research-content">

                    {/* Introduction Section */}
                    <Section id="introduction">
                        <div className="section-header">Project Overview</div>
                        <div className="text-block">
                            <p>
                                NextStep is an assistive exoskeleton designed to augment lower-body movement, focusing specifically on <TechTerm term="hip flexion" explanation="The movement of lifting your thigh toward your chest, like when walking or running" />: the kinematics of lifting the leg during gait.
                                Analogous to an electric bicycle for mobility, NextStep provides assistive torque to the hip joint, reducing the physiological effort required for locomotion.
                            </p>
                            <p>
                                This technology holds significant potential for both industrial applications (construction, logistics) and therapeutic rehabilitation, allowing individuals with mobility impairments to regain functional independence.
                            </p>
                        </div>

                        <h3 className="subsection-header">Objectives & Limitations</h3>
                        <div className="objectives-grid">
                            <div className="objective-card">
                                <h4>Objectives</h4>
                                <ul>
                                    <li>Assist walking and slow running (up to 15 km/h)</li>
                                    <li>Improve cadence (steps per minute)</li>
                                    <li>Reduce walking effort by at least 20%</li>
                                    <li>Lightweight design that doesn't slow you down</li>
                                    <li>Affordable and accessible</li>
                                    <li>Simple and intuitive to use</li>
                                </ul>
                            </div>
                            <div className="objective-card warning">
                                <h4>Limitations</h4>
                                <ul>
                                    <li>Safety failsafe system is essential</li>
                                    <li>Assists hip-flexion only (no knee support)</li>
                                    <li>Battery limitations (prototype phase)</li>
                                </ul>
                            </div>
                        </div>
                    </Section>

                    {/* Biomechanics Section */}
                    <Section id="biomechanics">
                        <div className="section-header">Kinematics & Biomechanics</div>
                        <div className="text-block">
                            <p>
                                Effective hardware design necessitates a fundamental understanding of human gait kinematics.
                                The hip joint functions as a primary pivot, with the femur experiencing rotational displacement relative to the pelvis.
                            </p>
                        </div>

                        <div className="info-callout">
                            <h4>Key Insight</h4>
                            <p>Gait analysis reveals hip flexion requires approximately <strong>40-50°</strong> of rotation during walking, increasing to <strong>60-65°</strong> during running. These kinematic requirements dictate the necessary actuator range of motion.</p>
                        </div>

                        <div className="research-block">
                            <h3>Actuator Requirements Analysis</h3>
                            <p>
                                At elevated cadences (180-200 <TechTerm term="SPM" explanation="Steps Per Minute" />), the hip joint angular velocity exceeds <strong>13,000 degrees per minute</strong>.
                                Consequently, the actuator must support angular velocities of minimally <strong>36 RPM</strong> while delivering substantial force (<TechTerm term="torque" explanation="Rotational force: how hard the motor can twist. Higher torque means more pushing power." />).
                            </p>
                        </div>

                        <ExpandableSection title="The Engineering Contradiction">
                            <p>
                                This presents a fundamental disconnect: commercial electric motors are typically optimized for high RPM and low torque.
                                Human joint actuation, conversely, requires low angular velocity and high torque. The primary engineering challenge was resolving this impedance mismatch.
                            </p>
                        </ExpandableSection>
                    </Section>

                    {/* Power Analysis Section */}
                    <Section id="power-analysis">
                        <div className="section-header">Competitive Analysis & Power Estimates</div>
                        <div className="text-block">
                            <p>
                                To establish baseline specifications, we conducted a reverse-engineering analysis of the Hypershell X Ultra.
                                By analyzing their published specifications, we derived realistic operating parameters for a functional prototype.
                            </p>
                        </div>

                        <div className="warning-callout">
                            <h4>Specification Analysis</h4>
                            <p>
                                While marketed with a "1000W peak power" figure, energetic analysis suggests this refers to instantaneous stall power.
                                Based on the 72Wh battery capacity and 7.5h runtime, the continuous power consumption is approximately <strong>10W</strong>.
                            </p>
                        </div>

                        <div className="research-block">
                            <h3>Derived Specifications</h3>
                            <p>Based on battery energy density and runtime data, we derived the following motor requirements:</p>
                            <ul className="specs-list">
                                <li><strong>Operating Voltage:</strong> 14.4V (4S LiPo configuration)</li>
                                <li><strong>Nominal Current:</strong> ~3.75 A</li>
                                <li><strong>Required Angular Velocity:</strong> &gt;36 RPM</li>
                                <li><strong>Peak Torque:</strong> 40 Nm</li>
                                <li><strong>Continuous Torque:</strong> 4.3 Nm</li>
                            </ul>
                        </div>

                        <ExpandableSection title="Show Me the Math">
                            <div className="calculation-block">
                                <p><strong>Voltage Derivation:</strong></p>
                                <code>Voltage = Energy ÷ Capacity = 72Wh ÷ 5Ah = 14.4V</code>
                                <p><strong>Average Power Consumption:</strong></p>
                                <code>P_avg = 72Wh ÷ 1.33h (Hyper Mode) ≈ 54W</code>
                                <p><strong>Current Estimation:</strong></p>
                                <code>I_nom = P_avg ÷ V = 54W ÷ 14.4V ≈ 3.75A</code>
                                <p>These calculations validated the feasibility of the project within the constraints of student-accessible hardware.</p>
                            </div>
                        </ExpandableSection>
                    </Section>

                    {/* Methodology Section */}
                    <Section id="methodology">
                        <div className="section-header">Design Methodology</div>
                        <p className="text-block">
                            To select an optimal actuation topology, three force transmission methods were evaluated against criteria of complexity, wearability, and mechanical efficiency.
                        </p>

                        <div className="design-comparison">
                            <div className="design-option">
                                <h4>Direct Motor Drive</h4>
                                <p>High-torque motor coupled directly to the hip joint. Mechanically simple and reliable, though sourcing motors with sufficient torque density is challenging.</p>
                            </div>
                            <div className="design-option">
                                <h4>Cable Transmission</h4>
                                <p>Bowden cable system relocating motors to a backpack. Reduces distal mass but introduces friction, elasticity, and mechanical complexity.</p>
                            </div>
                            <div className="design-option">
                                <h4>Series Elastic Actuation (Springs)</h4>
                                <p>Motors charge potential energy into springs. Theoretically efficient but significantly increases control system complexity and mechanical bulk.</p>
                            </div>
                        </div>

                        <div className="design-matrix-container">
                            <table className="design-matrix">
                                <thead>
                                    <tr>
                                        <th>Criteria</th>
                                        <th>Direct Motor</th>
                                        <th>Cable/Wire Pull</th>
                                        <th>Spring Energy Storage</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Complexity /5</td>
                                        <td>5 (Simple)</td>
                                        <td>4</td>
                                        <td>2 (Complex)</td>
                                    </tr>
                                    <tr>
                                        <td>Functionality /8</td>
                                        <td>8</td>
                                        <td>6</td>
                                        <td>8</td>
                                    </tr>
                                    <tr>
                                        <td>Appearance /1</td>
                                        <td>1</td>
                                        <td>0</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>Ease of wear /5</td>
                                        <td>5</td>
                                        <td>4</td>
                                        <td>3</td>
                                    </tr>
                                    <tr>
                                        <td>Weight /3</td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>1</td>
                                    </tr>
                                    <tr>
                                        <td>Consistency /5</td>
                                        <td>5</td>
                                        <td>4</td>
                                        <td>4</td>
                                    </tr>
                                    <tr className="total-row">
                                        <td>Total /27</td>
                                        <td className="highlight-cell">26 (Winner)</td>
                                        <td>21</td>
                                        <td>19</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="caption">
                            <strong>Conclusion:</strong> Direct-drive is the simplest solution, leaving time to focus on fine-tuning the system.
                        </p>
                    </Section>

                    {/* Motor Types Section */}
                    <Section id="motor-types">
                        <div className="section-header">Actuator selection</div>
                        <div className="text-block">
                            <p>
                                Actuator selection required a comparative analysis of motor architectures to identify the optimal balance of torque density and efficiency.
                            </p>
                        </div>

                        <div className="motor-types-grid">
                            <div className="motor-type-card">
                                <h4>Brushed vs Brushless (BLDC)</h4>
                                <div className="comparison-visual">
                                    <div className="vs-item bad">
                                        <span className="vs-label">Brushed</span>
                                        <p>Mechanically simple but prone to brush wear and lower efficiency</p>
                                    </div>
                                    <div className="vs-item good">
                                        <span className="vs-label">Brushless ✓</span>
                                        <p>Superior torque-to-weight ratio, higher efficiency, and maintenance-free operation</p>
                                    </div>
                                </div>
                            </div>

                            <div className="motor-type-card">
                                <h4>Rotor Configuration</h4>
                                <div className="comparison-visual">
                                    <div className="vs-item">
                                        <span className="vs-label">Inrunner</span>
                                        <p>Internal rotor; optimized for high RPM, low torque applications</p>
                                    </div>
                                    <div className="vs-item good">
                                        <span className="vs-label">Outrunner ✓</span>
                                        <p>External rotor; inherently higher torque generation due to increased varying radius</p>
                                    </div>
                                </div>
                            </div>

                            <div className="motor-type-card">
                                <h4>Form Factor: "Pancake" Motors</h4>
                                <p>
                                    To minimize protrusion from the hip, a low-profile "pancake" stator configuration was selected.
                                    This geometry maximizes the moment arm for torque generation while maintaining an unobtrusive wearable profile.
                                </p>
                            </div>
                        </div>
                    </Section>

                    {/* Gearing Section */}
                    <Section id="gearing">
                        <div className="section-header">Transmission & Reduction</div>
                        <div className="text-block">
                            <p>
                                A critical design challenge involves the impedance mismatch between electric motors and human joints.
                                Motors operate efficiently at high speeds, while human joints require high torque at low speeds. A reduction transmission is required to bridge this gap.
                            </p>
                        </div>

                        <div className="info-callout">
                            <h4>Mechanical Advantage</h4>
                            <p>
                                Similar to a bicycle's low gear, a reduction stage reduces the output speed while multiplying torque.
                                This allows a compact, high-efficiency motor to drive the high-load requirements of the hip joint.
                            </p>
                        </div>

                        <div className="research-block">
                            <h3>Transmission Typologies</h3>
                            <div className="gear-options">
                                <div className="gear-option">
                                    <h4>Spur Gears</h4>
                                    <p>Simple modification, but requires multiple stages for significant reduction, resulting in excessive volume.</p>
                                    <span className="gear-verdict bad">Volume Constraints</span>
                                </div>
                                <div className="gear-option">
                                    <h4>Worm Gears</h4>
                                    <p>High reduction ratio in a single stage, but mechanically non-backdriveable, posing safety risks.</p>
                                    <span className="gear-verdict bad">Non-backdriveable</span>
                                </div>
                                <div className="gear-option selected">
                                    <h4>Planetary Gears</h4>
                                    <p>High power density and coaxial alignment. Loads are distributed across detailed planet gears, offering durability and backdriveability.</p>
                                    <span className="gear-verdict good">Optimal Solution</span>
                                </div>
                                <div className="gear-option">
                                    <h4>Harmonic Drive</h4>
                                    <p>Zero-backlash precision gearing used in industrial robotics. Prohibitively expensive.</p>
                                    <span className="gear-verdict bad">Cost Prohibitive</span>
                                </div>
                            </div>
                        </div>

                        <ExpandableSection title="Safety Critical: Backdriveability">
                            <p>
                                <TechTerm term="Backdriveability" explanation="The ability for force applied to the output (your leg) to move the motor backwards" /> is a non-negotiable safety requirement.
                                In the event of system failure or user stumble, the transmission must allow the leg to move freely without mechanical locking, preventing potential injury.
                            </p>
                        </ExpandableSection>
                    </Section>

                    {/* Motor Research Section */}
                    <Section id="motor-research">
                        <div className="section-header">Component Sourcing</div>

                        <div className="research-block">
                            <h3>Market Analysis</h3>
                            <p>
                                Identifying a commercially available actuator that satisfied our torque, weight, and fiscal constraints proved challenging.
                                Standard UAV motors lacked sufficient torque, while industrial servo actuators exceeded our budget.
                            </p>
                            <div className="image-grid">
                                <div className="image-card">
                                    <img src="/research_images/image45.png" alt="Hypershell Specs" />
                                    <p className="image-caption">Hypershell Specifications Analysis</p>
                                </div>
                                <div className="image-card">
                                    <img src="/research_images/image52.png" alt="Hypershell Battery" />
                                    <p className="image-caption">Battery & Runtime Analysis</p>
                                </div>
                            </div>
                        </div>

                        <div className="research-block">
                            <h3>Motor Types Considered</h3>
                            <p>
                                The optimal solution was identified in the "robotic actuator" category: integrated modules combining high-torque BLDC motors with low-backlash planetary gears.
                                These units are purpose-built for dynamic joint actuation in quadrupedal robots and exoskeletons.
                            </p>
                            <div className="image-grid">
                                <div className="image-card">
                                    <img src="/research_images/image39.png" alt="Pancake Motor" />
                                    <p className="image-caption">Stator Geometry Analysis</p>
                                </div>
                                <div className="image-card">
                                    <img src="/research_images/image37.png" alt="Outrunner vs Inrunner" />
                                    <p className="image-caption">Rotor Configuration Comparison</p>
                                </div>
                            </div>
                        </div>

                        <div className="research-block">
                            <h3>Selected Configuration</h3>
                            <p>
                                We selected the Steadywin <strong>GIM8108-8</strong>, an integrated actuator module that combines a pancake-style BLDC motor with a highly integrated planetary gearbox.
                            </p>
                            <div className="highlight-box">
                                <div className="motor-specs">
                                    <img src="/research_images/image43.png" alt="GIM8108-8 Motor" className="featured-image" />
                                    <div className="specs-content">
                                        <h4>Selected Motor: GIM8108-8</h4>
                                        <ul>
                                            <li><strong>Torque:</strong> 22 Nm Peak / 7.5 Nm Rated</li>
                                            <li><strong>Gear Ratio:</strong> 1:8 (built-in planetary gearbox)</li>
                                            <li><strong>Weight:</strong> ~396g including driver</li>
                                            <li><strong>Cost:</strong> ~$200 CAD per unit</li>
                                            <li><strong>Size:</strong> 92mm diameter × 55mm height</li>
                                        </ul>
                                        <p>
                                            This motor provides excellent torque in a pancake form factor. Two motors (800g total) leaves 1.7kg for batteries, frame, and other components.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <ExpandableSection title="Budget Analysis: How We Estimated Motor Cost">
                            <p>
                                We estimated the Hypershell manufacturing cost by analyzing their retail price (~$2900 CAD).
                                Tech startups typically price at 4-5x manufacturing cost for marketing-heavy products.
                            </p>
                            <p>
                                This suggested a manufacturing cost of $580-725 CAD for the entire device.
                                Subtracting batteries (~$100) and frame (~$150) leaves about $200-275 for motors, matching our target.
                            </p>
                        </ExpandableSection>
                    </Section>

                    {/* Budget Section */}
                    <Section id="budget">
                        <div className="section-header">Fiscal Analysis</div>
                        <p className="text-block">
                            Project fiscal constraints were established at $500 CAD. This budgetary envelope necessitated strategic component selection and the in-house fabrication of structural components to prioritize expenditure on critical actuators.
                        </p>
                        <div className="budget-table-container">
                            <table className="budget-table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th>Category</th>
                                        <th>Qty</th>
                                        <th>Cost (per item)</th>
                                        <th>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Motor (GIM8108-8)</td>
                                        <td>Actuation</td>
                                        <td>2</td>
                                        <td>$150</td>
                                        <td>$300.00</td>
                                    </tr>
                                    <tr>
                                        <td>Battery (4S LiPo)</td>
                                        <td>Power System</td>
                                        <td>2</td>
                                        <td>$50</td>
                                        <td>$100.00</td>
                                    </tr>
                                    <tr>
                                        <td>IMU Sensor</td>
                                        <td>Control</td>
                                        <td>4</td>
                                        <td>$10</td>
                                        <td>$40.00</td>
                                    </tr>
                                    <tr>
                                        <td>Belt System</td>
                                        <td>Mechanical</td>
                                        <td>1</td>
                                        <td>$20</td>
                                        <td>$20.00</td>
                                    </tr>
                                    <tr>
                                        <td>Microcontroller</td>
                                        <td>Control</td>
                                        <td>1</td>
                                        <td>$0</td>
                                        <td>$0.00</td>
                                    </tr>
                                    <tr>
                                        <td>Wiring Harness</td>
                                        <td>Electrical</td>
                                        <td>1</td>
                                        <td>$10</td>
                                        <td>$10.00</td>
                                    </tr>
                                    <tr className="total-row">
                                        <td colSpan={4}>Total Bill of Materials</td>
                                        <td>$470.00</td>
                                        {/* TODO: Update total calculation logic if needed, currently hardcoded */}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* Belt Research Section */}
                    <Section id="belt-research">
                        <div className="section-header">Ergonomics & Interface Design</div>
                        <p className="text-block">
                            Effective torque transmission requires a rigid yet comfortable coupling between the exoskeleton and the user's iliac crest.
                            Anthropometric analysis of waist geometry—approximated as an ellipse—informed the design of the primary interference fit.
                        </p>
                        <div className="research-block">
                            <h3>Retention System Selection</h3>
                            <p>
                                The attachment mechanism was selected via a decision matrix evaluating durability, locking reliability, and user comfort:
                            </p>
                            <div className="design-matrix-container">
                                <table className="design-matrix">
                                    <thead>
                                        <tr>
                                            <th>Criteria</th>
                                            <th>Ratchet Mechanism</th>
                                            <th>Friction Slide</th>
                                            <th>Velcro / Hook & Loop</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Durability /8</td>
                                            <td>8</td>
                                            <td>7</td>
                                            <td>6</td>
                                        </tr>
                                        <tr>
                                            <td>Locking Security /5</td>
                                            <td>5</td>
                                            <td>5</td>
                                            <td>4</td>
                                        </tr>
                                        <tr>
                                            <td>Comfort /3</td>
                                            <td>3</td>
                                            <td>3</td>
                                            <td>3</td>
                                        </tr>
                                        <tr>
                                            <td>Ease of donning /3</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>3</td>
                                        </tr>
                                        <tr className="total-row">
                                            <td>Total /19</td>
                                            <td className="highlight-cell">18 (Selected)</td>
                                            <td>17</td>
                                            <td>16</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                <strong>Conclusion:</strong> A ratchet-style retention system reinforced with a semi-rigid frame was selected to maximize load transfer efficiency while maintaining adjustability.
                            </p>
                        </div>
                    </Section>

                    {/* Hardware Showcase Section */}
                    <Section id="hardware-showcase" className="hardware-section">
                        <div className="section-header">Physical Implementation</div>
                        <p className="text-block" style={{ maxWidth: '800px', marginBottom: '4rem' }}>
                            Precision engineering meets student budget. We utilized topology optimization and FOC motor control
                            to achieve high-torque performance in a compact form factor.
                        </p>
                        <HardwareGrid />
                    </Section>

                </div>
            </div>
        </div>
    );
};
