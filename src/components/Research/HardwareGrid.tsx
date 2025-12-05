import { HardwareCard } from './HardwareCard';
import './Hardware.css';

export const HardwareGrid = () => {
    const hardwareItems = [
        {
            id: 1,
            title: "GIM8108-8 Motor",
            category: "Actuation",
            image: "/research_images/image43.png", // Using existing image from Research page
            description: "High-torque brushless motor with integrated planetary gearbox. The heart of the exoskeleton's movement system.",
            specs: [
                { label: "Torque", value: "22 Nm Peak" },
                { label: "Gear Ratio", value: "8:1" },
                { label: "Weight", value: "396g" },
                { label: "Voltage", value: "24V" }
            ]
        },
        {
            id: 2,
            title: "ODrive S1",
            category: "Motor Controller",
            image: "/research_images/image39.png", // Placeholder, using another existing image for now
            description: "High-performance motor controller capable of precise field-oriented control (FOC) for smooth motion.",
            specs: [
                { label: "Peak Current", value: "40A" },
                { label: "Input Voltage", value: "12-48V" },
                { label: "Interface", value: "CAN Bus" }
            ]
        },
        {
            id: 3,
            title: "Custom Battery Pack",
            category: "Power",
            image: "/research_images/image52.png", // Using existing image
            description: "6S2P Lithium-Ion battery pack designed for high discharge rates to handle peak motor loads.",
            specs: [
                { label: "Capacity", value: "5000mAh" },
                { label: "Voltage", value: "22.2V" },
                { label: "Max Discharge", value: "60A" }
            ]
        },
        {
            id: 4,
            title: "Carbon Fiber Frame",
            category: "Structure",
            image: "/research_images/image45.png", // Placeholder
            description: "Lightweight and rigid structural components to transfer force to the user's leg without flexing.",
            specs: [
                { label: "Material", value: "CF-Nylon" },
                { label: "Weight", value: "450g" },
                { label: "Process", value: "3D Print" }
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
                />
            ))}
        </div>
    );
};
