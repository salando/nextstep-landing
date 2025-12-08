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
            <div className="card-inner">
                {/* FRONT OF CARD */}
                <div className="card-face card-front">
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
                    </div>
                </div>

                {/* BACK OF CARD */}
                <div className="card-face card-back">
                    <div className="card-tech-corners">
                        <div className="corner-tl"></div>
                        <div className="corner-tr"></div>
                        <div className="corner-bl"></div>
                        <div className="corner-br"></div>
                    </div>

                    <div className="card-back-content">
                        <h3 className="card-title-back">{title}</h3>
                        <p className="card-description-back">{description}</p>

                        {specs && specs.length > 0 && (
                            <div className="specs-container-back">
                                {specs.map((spec, index) => (
                                    <div className="spec-item" key={index}>
                                        <span className="spec-label">{spec.label}</span>
                                        <span className="spec-value">{spec.value}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Optional: faded background image for the back too */}
                    <div className="card-back-bg" style={{ backgroundImage: `url(${image})` }}></div>
                </div>
            </div>
        </div>
    );
};
