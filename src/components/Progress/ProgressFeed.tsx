import { PROGRESS_DATA } from '../../data/progressData';
import './ProgressFeed.css';

export const ProgressFeed = () => {
    // Sort by date descending (newest first)
    const sortedData = [...PROGRESS_DATA].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="progress-feed">
            {sortedData.map((entry) => (
                <div key={entry.id} className="progress-entry">
                    <div className="entry-date">{entry.date}</div>
                    <div className="entry-card">
                        <h3 className="entry-title">{entry.title}</h3>
                        <p className="entry-content">{entry.content}</p>

                        {entry.images && entry.images.length > 0 && (
                            <div className="entry-images">
                                {/* Image gallery implementation would go here */}
                            </div>
                        )}

                        <div className="entry-tags">
                            {entry.tags.map(tag => (
                                <span key={tag} className="tag">#{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
