import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { PROGRESS_DATA } from '../../data/progressData';
import './ProgressFeed.css';

interface ProgressFeedProps {
    activeFilter?: string;
}

export const ProgressFeed = ({ activeFilter = 'All' }: ProgressFeedProps) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
    const [selectedEntry, setSelectedEntry] = useState<typeof PROGRESS_DATA[0] | null>(null);
    const [slideDirection, setSlideDirection] = useState<'next' | 'prev'>('next');
    const [isAnimating, setIsAnimating] = useState(false);
    const [previousImageIndex, setPreviousImageIndex] = useState<number>(0);

    const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isOpeningRef = useRef(false);

    // Filter and Sort Data
    const sortedData = useMemo(() => {
        let data = [...PROGRESS_DATA];

        if (activeFilter !== 'All') {
            data = data.filter(entry => entry.tags.includes(activeFilter));
        }

        return data.sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }, [activeFilter]);

    const handleImageClick = (imageIndex: number, entry: typeof PROGRESS_DATA[0], e: React.MouseEvent) => {
        e.stopPropagation();
        if (isOpeningRef.current || selectedEntry) return;

        isOpeningRef.current = true;
        setSelectedImageIndex(imageIndex);
        setPreviousImageIndex(imageIndex);
        setSelectedEntry(entry);
        setIsAnimating(false);

        if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
        document.body.style.overflow = 'hidden';

        // Reset the opening guard after a short delay
        setTimeout(() => {
            isOpeningRef.current = false;
        }, 500);
    };

    const navigateImage = useCallback((direction: 'prev' | 'next') => {
        if (!selectedEntry?.images) return;

        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }

        setPreviousImageIndex(selectedImageIndex);
        setSlideDirection(direction);
        setIsAnimating(true);

        const imageCount = selectedEntry.images.length;
        if (direction === 'prev') {
            setSelectedImageIndex((prev) => (prev - 1 + imageCount) % imageCount);
        } else {
            setSelectedImageIndex((prev) => (prev + 1) % imageCount);
        }

        // Reset animation state after transition
        animationTimeoutRef.current = setTimeout(() => {
            setIsAnimating(false);
            animationTimeoutRef.current = null;
        }, 600); // Match CSS animation duration
    }, [selectedEntry, selectedImageIndex]);

    const closeLightbox = useCallback(() => {
        if (animationTimeoutRef.current) {
            clearTimeout(animationTimeoutRef.current);
        }
        setIsAnimating(false);
        setSelectedImageIndex(0);
        setSelectedEntry(null);
        document.body.style.overflow = 'auto';
    }, []);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (!selectedEntry) return;
        if (e.key === 'ArrowLeft') navigateImage('prev');
        if (e.key === 'ArrowRight') navigateImage('next');
        if (e.key === 'Escape') closeLightbox();
    }, [selectedEntry, navigateImage, closeLightbox]);


    useEffect(() => {
        if (selectedEntry) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedEntry, handleKeyDown]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto';
            if (animationTimeoutRef.current) {
                clearTimeout(animationTimeoutRef.current);
            }
        };
    }, []);

    const lightboxContent = selectedEntry && selectedEntry.images && selectedEntry.images.length > 0 && (
        <div className="lightbox-overlay" onClick={closeLightbox}>
            <div className="lightbox-content" onClick={e => e.stopPropagation()}>
                <button className="lightbox-close" onClick={closeLightbox}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="lightbox-grid">
                    <div className="lightbox-image-wrapper">
                        {/* Navigation arrows (now inside image wrapper) */}
                        {selectedEntry.images.length > 1 && (
                            <>
                                <button className="lightbox-nav lightbox-nav-prev" onClick={() => navigateImage('prev')}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="15 18 9 12 15 6"></polyline>
                                    </svg>
                                </button>
                                <button className="lightbox-nav lightbox-nav-next" onClick={() => navigateImage('next')}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </button>
                            </>
                        )}

                        {/* Render Previous Image (Exiting) */}
                        {isAnimating && (
                            <img
                                key={`prev-${previousImageIndex}`}
                                src={selectedEntry.images[previousImageIndex]}
                                alt=""
                                className={`lightbox-img slide-out-${slideDirection}`}
                            />
                        )}

                        {/* Render Current Image (Entering or Static) */}
                        <img
                            key={`curr-${selectedImageIndex}`}
                            src={selectedEntry.images[selectedImageIndex]}
                            alt={selectedEntry.title}
                            className={`lightbox-img ${isAnimating ? `slide-in-${slideDirection}` : ''}`}
                        />

                        {/* Image counter */}
                        <div className="lightbox-counter">
                            {selectedImageIndex + 1} / {selectedEntry.images.length}
                        </div>
                    </div>
                    <div className="lightbox-details">
                        <span className="lightbox-date">{selectedEntry.date}</span>
                        <h2>{selectedEntry.title}</h2>
                        <p>{selectedEntry.content}</p>
                        <div className="lightbox-tags">
                            {selectedEntry.tags.map(tag => (
                                <span key={tag} className="tag">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <div className="progress-feed">
                {sortedData.map((entry) => {
                    const hasImages = entry.images && entry.images.length > 0;

                    return (
                        <div key={entry.id} className="progress-entry">
                            <div className="entry-date">{entry.date}</div>
                            <div className="entry-card">
                                <h3 className="entry-title">{entry.title}</h3>

                                {/* Only show text if no images, or if explicitly desired (Plan says hide text if images exist) */}
                                {!hasImages && <p className="entry-content">{entry.content}</p>}

                                {hasImages && (
                                    <div className="entry-images">
                                        {entry.images!.map((img, index) => (
                                            <div
                                                key={index}
                                                className="image-container"
                                                onClick={(e) => handleImageClick(index, entry, e)}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${entry.title} - Image ${index + 1}`}
                                                    className="feed-image"
                                                />
                                                <div className="image-overlay">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                                                    </svg>
                                                    <span>Expand</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="entry-tags">
                                    {entry.tags.map(tag => (
                                        <span key={tag} className="tag">#{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selectedEntry && createPortal(lightboxContent, document.body)}
        </>
    );
};
