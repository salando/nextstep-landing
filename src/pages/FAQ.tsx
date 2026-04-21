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
                answer: "NextStep aims to democratize exoskeleton technology. We are building a high-performance, lower-limb assistive device on a student budget (<$500 CAD) to prove that accessibility and advanced robotics can coexist. The goal is to engineer something accessible that improves people's quality of life."
            },
            {
                id: "gen-2",
                question: "Who is the target user demographic?",
                answer: "The current prototype is designed for individuals with partial mobility impairments, rehabilitation patients requiring gait assistance, workers in physically demanding jobs like construction or manufacturing, and anyone seeking reduced walking effort."
            },
            {
                id: "gen-3",
                question: "What is the current project status?",
                answer: "We are currently in the hardware integration and debugging stage. Motors have been sourced (GIM8108-8), the Raspberry Pi 5 and CAN HAT are wired, and the Python control script has been deployed. We are debugging CAN bus communication between the controller and motor drivers."
            },
            {
                id: "gen-4",
                question: "What is the target weight?",
                answer: "The target total system weight is under 2.5 kg for mobility. The two motors weigh approximately 800g total (396g each with driver), leaving 1,700g for batteries, frame, belt system, and other components."
            }
        ]
    },
    {
        title: "TECHNICAL_SPECS",
        items: [
            {
                id: "tech-1",
                question: "What is the motor torque output?",
                answer: "The system uses GIM8108-8 motors with a built-in 1:8 planetary gearbox. Each motor delivers 7.5 Nm rated torque and 22 Nm peak torque. The motor operates at 7A rated current and 22A peak current, providing excellent efficiency at 0.93 A/Nm — a 133% improvement over the alternative GIM6010-8."
            },
            {
                id: "tech-2",
                question: "How is the system powered?",
                answer: "We use a 4S (14.8V nominal) LiPo battery — the Turnigy Heavy Duty 5000mAh with 60C discharge rate (300A capable). This provides approximately 74 Wh of energy and over 21 minutes of continuous running at peak average torque. The system features a swappable battery design for extended use."
            },
            {
                id: "tech-3",
                question: "What control architecture is used?",
                answer: "A Raspberry Pi 5 serves as the central brain, communicating with GIM8108-8 motors via CAN bus through a Waveshare RS485 CAN HAT. The motors use integrated GDS68 drivers that accept CAN commands and USB-C for debugging. A custom Python control loop manages motor commands."
            },
            {
                id: "tech-4",
                question: "How much does it reduce walking effort?",
                answer: "Based on research from existing hip-assist exoskeletons, the target is a 20-40% reduction in metabolic cost per step. The motor is designed to assist during the hip flexion (swing) phase of walking, directly augmenting the user's natural stride."
            },
            {
                id: "tech-5",
                question: "What is the expected battery runtime?",
                answer: "With the 4S 5000mAh LiPo battery, the system can sustain approximately 21.4 minutes of continuous operation at peak average torque (207.2W across both motors). In real-world use with variable assistance levels, runtime would be considerably longer. The swappable battery design allows quick changes for extended sessions."
            }
        ]
    },
    {
        title: "SAFETY_PROTOCOLS",
        items: [
            {
                id: "safe-1",
                question: "What fail-safes are in place?",
                answer: "The system includes software-defined torque limits that instantly cut power if abnormal resistance or velocity is detected, emergency stop capability, and the inherent backdriveable nature of the planetary gearbox mechanism."
            },
            {
                id: "safe-2",
                question: "What does backdriveability mean for safety?",
                answer: "Backdriveability is crucial for safety — it means force applied to the output (your leg) can move the motor backwards. If you stumble or need to override the motor, the planetary gearbox allows your leg to move freely. This is why we specifically chose planetary gears over worm gears, which are 'self-locking' and could cause injury by trapping the user."
            },
            {
                id: "safe-3",
                question: "Is there a manual override?",
                answer: "Yes. The actuators use planetary gearboxes which are fully backdriveable, meaning the user can mechanically overpower the motors at any time. The user is never 'locked' in a position by the mechanism."
            }
        ]
    },
    {
        title: "DESIGN_DECISIONS",
        items: [
            {
                id: "des-1",
                question: "Why direct motor drive instead of cables or springs?",
                answer: "We evaluated three approaches: direct motor drive, cable pull systems, and spring energy storage. Direct motor drive scored 26/27 in our design matrix — the highest — due to its simplicity (5/5), functionality (8/8), consistency (5/5), and ease of wear (5/5). Simplicity reduces failure points and makes prototyping easier, which is essential with our timeline."
            },
            {
                id: "des-2",
                question: "Why a ratchet belt system?",
                answer: "After evaluating ratchet, slide, and velcro belt designs, the ratchet system scored 18/19 — highest for durability (8/8), reliability (5/5), and comfort (3/3). All belt types are reinforced with a rigid frame to secure motors, brackets, and battery packs in place."
            },
            {
                id: "des-3",
                question: "Why LiPo batteries over other chemistries?",
                answer: "We compared Lead-Acid, NiMH, Li-Ion, and LiPo. Lead-acid was too heavy (~7kg per cell). NiMH would require a 4kg+ parallel array to deliver 22A. LiPo batteries offer 20C-50C+ discharge rates, making our 22A draw trivial, while staying lightweight at ~500g per pack. The massive current overhead (300A capable vs 22A needed) keeps the batteries cool and safe."
            }
        ]
    },
    {
        title: "FUTURE_ROADMAP",
        items: [
            {
                id: "fut-1",
                question: "Is this open source?",
                answer: "Yes. Upon project completion, we plan to release all design files and source code under an open-source license to encourage further innovation in the assistive robotics community."
            },
            {
                id: "fut-2",
                question: "What are the next planned features?",
                answer: "Future iterations will focus on implementing adaptive gait prediction, reducing the overall frame weight with advanced materials, extending battery life through optimized motor control, and potentially adding knee-assist modules for full lower-body support."
            }
        ]
    }
];

export const FAQ = () => {
    const [openItems, setOpenItems] = useState<Set<string>>(new Set());
    const [searchQuery, setSearchQuery] = useState("");

    const toggleItem = (id: string) => {
        const newOpenItems = new Set(openItems);
        if (newOpenItems.has(id)) {
            newOpenItems.delete(id);
        } else {
            newOpenItems.add(id);
        }
        setOpenItems(newOpenItems);
    };

    const filteredFAQData = faqData.map(category => ({
        ...category,
        items: category.items.filter(item =>
            item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(category => category.items.length > 0);

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

                <div className="faq-search-container">
                    <input
                        type="text"
                        placeholder="Search for keywords..."
                        className="faq-search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="faq-grid">
                    {filteredFAQData.length > 0 ? (
                        filteredFAQData.map((category, catIndex) => (
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
                                                <span className="faq-status-indicator"></span>
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
                        ))
                    ) : (
                        <div className="no-results" style={{ textAlign: "center", padding: "2rem", opacity: 0.7 }}>
                            <p>No results found for "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
