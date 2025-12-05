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
                        Building an exoskeleton is not just about assembling parts. It is about solving a complex optimization problem.
                        We faced strict constraints: a student budget of <span className="highlight">$600 CAD</span>, a weight limit of <span className="highlight">2.5kg</span>, and the need for high-torque actuation.
                    </p>
                </div>
            </Section>

            <div className="container">
                <div className="research-content">

                    {/* Introduction Section */}
                    <Section id="introduction">
                        <div className="section-header">Introduction</div>
                        <div className="text-block">
                            <p>
                                NextStep is an exoskeleton designed to assist lower-body movement, specifically helping with <TechTerm term="hip flexion" explanation="The movement of lifting your thigh toward your chest, like when walking or running" />: the motion of lifting your leg when you walk or run.
                                Think of it as a "power assist" for your legs, similar to how e-bikes help you pedal.
                            </p>
                            <p>
                                This technology has applications in demanding physical work (construction, logistics, manufacturing) and the medical field, where it can help people with mobility challenges regain or enhance their movement.
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
                        <div className="section-header">Understanding Human Movement</div>
                        <div className="text-block">
                            <p>
                                Before designing any hardware, we needed to understand exactly <em>how</em> humans walk and run.
                                The hip joint acts like a pivot point - when you lift your leg, your thigh bone (femur) rotates around this joint.
                            </p>
                        </div>

                        <div className="info-callout">
                            <h4>Key Insight</h4>
                            <p>Walking requires about <strong>40-50°</strong> of hip rotation, while running increases this to <strong>60-65°</strong>. This tells us exactly how much rotation our motor needs to provide.</p>
                        </div>

                        <div className="research-block">
                            <h3>The Numbers Behind Walking</h3>
                            <p>
                                At a fast running pace, humans take about 180-200 steps per minute (called <TechTerm term="cadence" explanation="The number of steps taken per minute during walking or running" />).
                                Combined with the rotation angle, this means the hip moves through roughly <strong>13,000 degrees per minute</strong>.
                            </p>
                            <p>
                                Converting this to motor terms: our motor needs to turn at least <strong>36 RPM</strong> (rotations per minute) to keep up with a runner.
                                That might sound slow, and it is. But here is the tricky part: we also need a lot of force (<TechTerm term="torque" explanation="Rotational force: how hard the motor can twist. Higher torque means more pushing power." />).
                            </p>
                        </div>

                        <ExpandableSection title="Why This Matters for Motor Selection">
                            <p>
                                Most motors are designed for high speed (thousands of RPM) but low torque. We need the opposite: low speed but high torque.
                                This fundamental mismatch drove most of our motor research. We had to find creative solutions to get both.
                            </p>
                        </ExpandableSection>
                    </Section>

                    {/* Power Analysis Section */}
                    <Section id="power-analysis">
                        <div className="section-header">Power Analysis: Reverse-Engineering the Competition</div>
                        <div className="text-block">
                            <p>
                                To understand what motors we needed, we analyzed a commercial exoskeleton - the Hypershell X Ultra - by working backwards from their published specifications.
                                This would give us a realistic target for our own design.
                            </p>
                        </div>

                        <div className="warning-callout">
                            <h4>Marketing vs Reality</h4>
                            <p>
                                Hypershell claims "1000W peak power" - but our calculations showed this is misleading.
                                With a 72Wh battery lasting 7.5 hours in eco mode, the <em>actual</em> average power is only about <strong>10 watts</strong>.
                                The 1000W figure is likely the "stall" power - what happens if the motor is completely blocked - not normal operation.
                            </p>
                        </div>

                        <div className="research-block">
                            <h3>What We Calculated</h3>
                            <p>Using the battery specs and run times, we derived realistic motor requirements:</p>
                            <ul className="specs-list">
                                <li><strong>Voltage:</strong> 14.4V (4-cell lithium battery)</li>
                                <li><strong>Running Current:</strong> ~3.75 amps</li>
                                <li><strong>Speed Needed:</strong> 36 RPM (minimum)</li>
                                <li><strong>Peak Torque:</strong> 40 Nm</li>
                                <li><strong>Running Torque:</strong> 4.3 Nm</li>
                            </ul>
                        </div>

                        <ExpandableSection title="Show Me the Math">
                            <div className="calculation-block">
                                <p><strong>Voltage calculation:</strong></p>
                                <code>Voltage = Energy ÷ Charge = 72Wh ÷ 5Ah = 14.4V</code>
                                <p><strong>Power in hyper mode:</strong></p>
                                <code>Power = 72Wh ÷ 1.33 hours = 54W average</code>
                                <p><strong>Current draw:</strong></p>
                                <code>Current = Power ÷ Voltage = 54W ÷ 14.4V = 3.75A</code>
                                <p>These calculations helped us understand what's actually achievable on a student budget.</p>
                            </div>
                        </ExpandableSection>
                    </Section>

                    {/* Methodology Section */}
                    <Section id="methodology">
                        <div className="section-header">Design Approach</div>
                        <p className="text-block">
                            We evaluated three fundamentally different ways to apply force to the leg.
                            Each has trade-offs between complexity, reliability, and performance.
                        </p>

                        <div className="design-comparison">
                            <div className="design-option">
                                <h4>Direct Motor Drive</h4>
                                <p>Motor attached directly to the hip joint. Simple, reliable, but finding a motor with enough torque at low speed is challenging.</p>
                            </div>
                            <div className="design-option">
                                <h4>Cable Pull System</h4>
                                <p>Motor pulls cables attached to the leg. Lighter motors possible, but cables can tangle and wear out over time.</p>
                            </div>
                            <div className="design-option">
                                <h4>Spring Energy Storage</h4>
                                <p>Motor charges springs that release energy at the right moment. Most complex, but potentially very efficient.</p>
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
                        <div className="section-header">Understanding Motors</div>
                        <div className="text-block">
                            <p>
                                Not all motors are created equal. For our exoskeleton, we needed to understand the different types and pick the right one for the job.
                            </p>
                        </div>

                        <div className="motor-types-grid">
                            <div className="motor-type-card">
                                <h4>Brushed vs Brushless</h4>
                                <div className="comparison-visual">
                                    <div className="vs-item bad">
                                        <span className="vs-label">Brushed</span>
                                        <p>Simpler, cheaper, but wears out faster due to physical contact inside</p>
                                    </div>
                                    <div className="vs-item good">
                                        <span className="vs-label">Brushless ✓</span>
                                        <p>More efficient, quieter, longer-lasting. Uses magnets instead of brushes</p>
                                    </div>
                                </div>
                            </div>

                            <div className="motor-type-card">
                                <h4>Inrunner vs Outrunner</h4>
                                <div className="comparison-visual">
                                    <div className="vs-item">
                                        <span className="vs-label">Inrunner</span>
                                        <p>Spinning parts inside, higher speed, lower torque</p>
                                    </div>
                                    <div className="vs-item good">
                                        <span className="vs-label">Outrunner ✓</span>
                                        <p>Outer shell spins, higher torque, wider and flatter shape</p>
                                    </div>
                                </div>
                            </div>

                            <div className="motor-type-card">
                                <h4>Form Factor: "Pancake" Motors</h4>
                                <p>
                                    We needed a motor that sits flat against the hip, not one that sticks out like a cylinder.
                                    These flat, wide motors are nicknamed "pancake" motors - perfect for wearable applications.
                                </p>
                            </div>
                        </div>
                    </Section>

                    {/* Gearing Section */}
                    <Section id="gearing">
                        <div className="section-header">The Gearing Challenge</div>
                        <div className="text-block">
                            <p>
                                Here's our problem: motors that spin fast are small and cheap. Motors with high torque are big and expensive.
                                We need high torque at low speed. The solution? <strong>Gears</strong> - trading speed for force, like the gears on a bicycle.
                            </p>
                        </div>

                        <div className="info-callout">
                            <h4>The Bicycle Analogy</h4>
                            <p>
                                When you shift to a lower gear on a bike, you pedal faster but climb hills more easily.
                                That's exactly what we're doing: taking a fast-spinning motor and "gearing it down" to spin slower but with much more pushing power.
                            </p>
                        </div>

                        <div className="research-block">
                            <h3>Gearing Options We Considered</h3>
                            <div className="gear-options">
                                <div className="gear-option">
                                    <h4>Spur Gears</h4>
                                    <p>Simple interlocking gears. Easy to understand, but need many stages for high reduction. Gets bulky.</p>
                                    <span className="gear-verdict bad">Too bulky for our needs</span>
                                </div>
                                <div className="gear-option">
                                    <h4>Worm Gears</h4>
                                    <p>Compact and high reduction, but a major flaw: not "backdriveable." If you push on the output, it locks up. Dangerous for an exoskeleton.</p>
                                    <span className="gear-verdict bad">Not backdriveable</span>
                                </div>
                                <div className="gear-option selected">
                                    <h4>Planetary Gears</h4>
                                    <p>Compact, high reduction, and backdriveable. Multiple small gears orbit around a central gear. Complex but reliable.</p>
                                    <span className="gear-verdict good">Best balance for our needs</span>
                                </div>
                                <div className="gear-option">
                                    <h4>Harmonic Drive</h4>
                                    <p>Extremely compact and precise. Used in robots and space equipment. But costs more than our entire budget!</p>
                                    <span className="gear-verdict bad">Too expensive</span>
                                </div>
                            </div>
                        </div>

                        <ExpandableSection title="Why Backdriveability Matters">
                            <p>
                                <TechTerm term="Backdriveability" explanation="The ability for force applied to the output (your leg) to move the motor backwards" /> is crucial for safety.
                                If you stumble or need to override the motor, the mechanism must allow your leg to move freely.
                                Worm gears are "self-locking" - force from your leg can't spin the motor backwards, which could cause injury.
                            </p>
                        </ExpandableSection>
                    </Section>

                    {/* Motor Research Section */}
                    <Section id="motor-research">
                        <div className="section-header">Motor Research & Selection</div>

                        <div className="research-block">
                            <h3>The Search Process</h3>
                            <p>
                                Finding the right motor was like searching for a needle in a haystack. Most motors available for purchase didn't meet our requirements for torque, speed, weight, AND budget all at once.
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
                                Our breakthrough came when we searched for "robotic actuator" - motors designed for robot joints.
                                These motors are built for exactly our use case: high torque, low speed, compact size.
                            </p>
                            <div className="image-grid">
                                <div className="image-card">
                                    <img src="/research_images/image39.png" alt="Pancake Motor" />
                                    <p className="image-caption">Pancake Motor Form Factor</p>
                                </div>
                                <div className="image-card">
                                    <img src="/research_images/image37.png" alt="Outrunner vs Inrunner" />
                                    <p className="image-caption">Outrunner vs Inrunner Design</p>
                                </div>
                            </div>
                        </div>

                        <div className="research-block">
                            <h3>The Winning Solution</h3>
                            <p>
                                We found motors with built-in planetary gearboxes - combining the motor and gearing into one compact unit.
                                The <strong>GIM8108-8</strong> from Steadywin emerged as the best option.
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
                        <div className="section-header">Budget Breakdown</div>
                        <p className="text-block">
                            The budget for this project is set at under $500, though flexible. This constraint forced us to be creative with component selection.
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
                                        <td>Mechanical</td>
                                        <td>2</td>
                                        <td>$150</td>
                                        <td>$300.00</td>
                                    </tr>
                                    <tr>
                                        <td>Battery (4S LiPo)</td>
                                        <td>Power</td>
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
                                        <td>Controller</td>
                                        <td>Control</td>
                                        <td>1</td>
                                        <td>$0</td>
                                        <td>$0.00</td>
                                    </tr>
                                    <tr>
                                        <td>Wire (15ft)</td>
                                        <td>Mechanical</td>
                                        <td>1</td>
                                        <td>$10</td>
                                        <td>$10.00</td>
                                    </tr>
                                    <tr className="total-row">
                                        <td colSpan={4}>Total Estimated Cost</td>
                                        <td>$470.00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </Section>

                    {/* Belt Research Section */}
                    <Section id="belt-research">
                        <div className="section-header">Belt & Attachment Research</div>
                        <p className="text-block">
                            The exoskeleton needs to attach securely to your body without slipping during movement.
                            We analyzed the human waist geometry (which is actually an ellipse, not a circle) to design the attachment system.
                        </p>
                        <div className="research-block">
                            <h3>Fastening Mechanism</h3>
                            <p>
                                We evaluated three belt types based on durability, reliability, comfort, and ease of use:
                            </p>
                            <div className="design-matrix-container">
                                <table className="design-matrix">
                                    <thead>
                                        <tr>
                                            <th>Criteria</th>
                                            <th>Ratchet Belt</th>
                                            <th>Slide Belt</th>
                                            <th>Velcro Belt</th>
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
                                            <td>Reliability /5</td>
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
                                            <td>Ease of use /3</td>
                                            <td>2</td>
                                            <td>2</td>
                                            <td>3</td>
                                        </tr>
                                        <tr className="total-row">
                                            <td>Total /19</td>
                                            <td className="highlight-cell">18 (Winner)</td>
                                            <td>17</td>
                                            <td>16</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p>
                                <strong>Conclusion:</strong> We selected a ratchet-style adjustable belt system reinforced with a rigid frame to secure the components.
                            </p>
                        </div>
                    </Section>

                    {/* Hardware Showcase Section */}
                    <Section id="hardware-showcase">
                        <div className="section-header">Physical Implementation</div>
                        <p className="text-block">
                            From CAD models to reality. Here are the physical components that power NextStep.
                            Hover over each card to see technical specifications.
                        </p>
                        <HardwareGrid />
                    </Section>

                </div>
            </div>
        </div>
    );
};
