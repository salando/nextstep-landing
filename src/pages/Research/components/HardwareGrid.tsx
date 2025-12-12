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
            description: "RS485/CAN HAT for Raspberry Pi 5. Enables communication with the CyberGear motors.",
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
            title: "Custom Battery",
            category: "Power",
            image: "/research_images/image52.png",
            description: "6S2P Li-Ion pack with high C-rating for burst power delivery.",
            className: "grid-span-2",
            specs: [
                { label: "Capacity", value: "5Ah" },
                { label: "Voltage", value: "22.2V" },
                { label: "Config", value: "6S2P" },
                { label: "Peak", value: "1200W" }
            ]
        },
        {
            id: 4,
            title: "CF-Nylon Frame",
            category: "Structure",
            image: "/research_images/image45.png",
            description: "Topology-optimized structure printed in Carbon Fiber Nylon.",
            className: "grid-span-2",
            specs: [
                { label: "Material", value: "PA12-CF" },
                { label: "Weight", value: "450g" },
                { label: "Process", value: "SLS" },
                { label: "Load", value: "120kg" }
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
