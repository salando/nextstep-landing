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
    className?: string; // Allow passing grid span classes
}

export const HardwareCard: React.FC<HardwareCardProps> = ({
    title,
    category,
    image,
    description,
    specs,
    className = ''
}) => {
    return (
        <div className={`hardware-card ${className}`}>
            {/* Background Image - Full Cover */}
            <div className="card-bg-container">
                <img src={image} alt={title} className="card-bg-image" />
                <div className="card-overlay-gradient"></div>
            </div>

            {/* Content Overlay */}
            <div className="card-content-wrapper">
                <div className="card-header">
                    <span className="category-tag">{category}</span>
                    <h3 className="card-title">{title}</h3>
                </div>

                {/* Details slide up and fade in */}
                <div className="card-details-window">
                    <div className="card-details-inner">
                        <p className="card-description">{description}</p>

                        {specs && specs.length > 0 && (
                            <div className="specs-grid">
                                {specs.map((spec, index) => (
                                    <div className="spec-item" key={index}>
                                        <span className="spec-label">{spec.label}</span>
                                        <span className="spec-value">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
