import React from 'react';
import './Hardware.css';

interface HardwareSpec {
    label: string;
    value: string;
}

interface HardwareCardProps {
    title: string;
    category: string;
    image: string;
    description: string;
    specs?: HardwareSpec[];
}

export const HardwareCard: React.FC<HardwareCardProps> = ({
    title,
    category,
    image,
    description,
    specs
}) => {
    return (
        <div className="hardware-card">
            <div className="card-image-container">
                <img src={image} alt={title} className="card-image" />
            </div>

            <div className="card-content">
                <span className="card-category">{category}</span>
                <h3 className="card-title">{title}</h3>
            </div>

            <div className="card-overlay">
                <h3 className="card-title" style={{ marginBottom: '1rem' }}>{title}</h3>
                <p className="overlay-description">{description}</p>

                {specs && specs.length > 0 && (
                    <ul className="specs-list-mini">
                        {specs.map((spec, index) => (
                            <li key={index}>
                                <span className="spec-label">{spec.label}</span>
                                <span className="spec-value">{spec.value}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};
