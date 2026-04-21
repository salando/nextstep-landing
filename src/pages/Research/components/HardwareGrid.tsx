import { HardwareCard } from './HardwareCard';
import './Hardware.css';

export const HardwareGrid = () => {
    const hardwareItems = [
        {
            id: 1,
            title: "GIM8108-8 Motor",
            category: "Actuator",
            image: "/research_images/image43.png",
            description: "High-torque brushless motor with integrated planetary gearbox. The heart of the exoskeleton's movement system.",
            className: "grid-span-2",
            specs: [
                { label: "Torque", value: "22 Nm" },
                { label: "Gear Ratio", value: "8:1" },
                { label: "Weight", value: "396g" },
                { label: "Voltage", value: "24V" }
            ]
        },
        {
            id: 2,
            title: "Waveshare CAN HAT",
            category: "Interface",
            image: "/research_images/image54.png",
            description: "RS485/CAN HAT for Raspberry Pi 5. Enables CAN bus communication with GIM8108-8 motors via GDS68 driver.",
            className: "grid-span-2",
            specs: [
                { label: "Controller", value: "MCP2515" },
                { label: "Interface", value: "SPI" },
                { label: "Oscillator", value: "12MHz" },
                { label: "Transceiver", value: "SN65HVD230" }
            ]
        },
        {
            id: 3,
            title: "4S LiPo Battery",
            category: "Power",
            image: "/research_images/image52.png",
            description: "Turnigy Heavy Duty 5000mAh 4S 60C LiPo pack with swappable design for extended runtime.",
            className: "grid-span-2",
            specs: [
                { label: "Capacity", value: "5000mAh" },
                { label: "Voltage", value: "14.8V" },
                { label: "Config", value: "4S" },
                { label: "Discharge", value: "60C (300A)" }
            ]
        },
        {
            id: 4,
            title: "Frame & Harness",
            category: "Structure (Planned)",
            image: "/research_images/image45.png",
            description: "Rigid frame with ratchet belt system. Reinforced to support motors, brackets, and battery packs.",
            className: "grid-span-2",
            specs: [
                { label: "Belt", value: "Ratchet" },
                { label: "Frame", value: "Rigid" },
                { label: "Fit", value: "75-100cm" },
                { label: "Status", value: "Planned" }
            ]
        }
    ];

    return (
        <div className="hardware-grid">
            {hardwareItems.map(item => (
                <HardwareCard
                    key={item.id}
                    title={item.title}
                    category={item.category}
                    image={item.image}
                    description={item.description}
                    specs={item.specs}
                    className={item.className}
                />
            ))}
        </div>
    );
};
