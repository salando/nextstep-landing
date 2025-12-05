import { useState } from 'react';
import './FAQ.css';

interface FAQItem {
    question: string;
    answer: string;
    id: string;
}

interface FAQCategory {
    title: string;
    items: FAQItem[];
}

const faqData: FAQCategory[] = [
    {
        title: "SYSTEM_OVERVIEW",
        items: [
            {
                id: "gen-1",
                question: "What is the primary mission of NextStep?",
                answer: "NextStep aims to democratize exoskeleton technology. We are building a high-performance, lower-limb assistive device on a student budget (<$600 CAD) to prove that accessibility and advanced robotics can coexist."
            },
            {
                id: "gen-2",
                question: "Who is the target pilot demographic?",
                answer: "The current prototype is designed for individuals with partial mobility impairments, rehabilitation patients requiring gait assistance, and potentially for industrial fatigue reduction."
            }
        ]
    },
    {
        title: "TECHNICAL_SPECS",
        items: [
            {
                id: "tech-1",
                question: "What is the peak torque output?",
                answer: "The system utilizes GIM8108-8 motors with a 36:1 planetary gearbox, capable of delivering approximately 7.5 Nm of peak torque per joint, sufficient for 20-30% gait assistance."
            },
            {
                id: "tech-2",
                question: "How is the system powered?",
                answer: "We use a 6S (22.2V) LiPo battery configuration, providing high discharge rates for motor bursts. The system includes a custom power distribution board with voltage regulation for logic circuits."
            },
            {
                id: "tech-3",
                question: "What control architecture is used?",
                answer: "The exoskeleton runs on a distributed control system. An ESP32 microcontroller handles high-level gait logic and sensor fusion, communicating with ODrive motor controllers via CAN bus for precise field-oriented control (FOC)."
            }
        ]
    },
    {
        title: "SAFETY_PROTOCOLS",
        items: [
            {
                id: "safe-1",
                question: "What fail-safes are in place?",
                answer: "The system includes mechanical hard-stops to prevent hyperextension, emergency e-stop buttons, and software-defined torque limits that instantly cut power if abnormal resistance or velocity is detected."
            },
            {
                id: "safe-2",
                question: "Is there a manual override?",
                answer: "Yes. The actuators are back-drivable, meaning the user can mechanically overpower the motors in case of a system freeze, ensuring they are never 'locked' in a position."
            }
        ]
    }
];

export const FAQ = () => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());

    const toggleItem = (id: string) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(id)) {
            newOpenItems.delete(id);
        } else {
            newOpenItems.add(id);
        }
        setOpenItems(newOpenItems);
    };

    return (
        <div className="page-content">
            <div className="faq-container">
                <div className="faq-header">
                    <div className="header-decoration">
                        <span className="hex-icon">⬢</span>
                        <div className="header-line"></div>
                    </div>
                    <h1>FREQUENTLY ASKED QUESTIONS</h1>
                    <p className="mono">COMMON INQUIRIES & SPECS</p>
                </div>

                <div className="faq-grid">
                    {faqData.map((category, catIndex) => (
                        <div key={category.title} className="faq-category" style={{ animationDelay: `${catIndex * 0.1}s` }}>
                            <h3 className="category-title mono">
                                <span className="category-marker">/</span>
                                {category.title}
                            </h3>
                            <div className="category-items">
                                {category.items.map((item) => (
                                    <div
                                        key={item.id}
                                        className={`faq-item ${openItems.has(item.id) ? 'open' : ''}`}
                                        onClick={() => toggleItem(item.id)}
                                    >
                                        <div className="faq-question">
                                            <span className="status-indicator"></span>
                                            <h4>{item.question}</h4>
                                            <span className="expand-icon">{openItems.has(item.id) ? '−' : '+'}</span>
                                        </div>
                                        <div className="faq-answer">
                                            <div className="answer-content">
                                                <p>{item.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
