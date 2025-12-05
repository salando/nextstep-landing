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
            {/* Decoration: Technical Corners */}
            <div className="card-tech-corners">
                <div className="corner-tl"></div>
                <div className="corner-tr"></div>
                <div className="corner-bl"></div>
                <div className="corner-br"></div>
            </div>

            <div className="card-image-container">
                <img src={image} alt={title} className="card-image" />
            </div>

            <div className="card-content">
                <div className="card-header">
                    <span className="category-tag">{category}</span>
                    <h3 className="card-title">{title}</h3>
                </div>

                <p className="card-description">{description}</p>

                {specs && specs.length > 0 && (
                    <div className="specs-container">
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
    );
};
