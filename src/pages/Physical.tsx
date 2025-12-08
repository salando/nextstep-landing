import { useState, useMemo, useCallback } from 'react';
import { Section } from '../components/UI/Section';
import { ProgressFeed } from '../components/Progress/ProgressFeed';
import { PROGRESS_DATA } from '../data/progressData';
import './Physical.css';

export const Physical = () => {
    const [activeFilter, setActiveFilter] = useState<string>('All');

    // Calculate stats
    const stats = useMemo(() => {
        const totalUpdates = PROGRESS_DATA.length;
        const lastUpdate = PROGRESS_DATA.reduce((latest, current) => {
            return new Date(current.date) > new Date(latest.date) ? current : latest;
        }, PROGRESS_DATA[0]);

        // Get unique tags
        const allTags = new Set<string>();
        PROGRESS_DATA.forEach(entry => entry.tags.forEach(tag => allTags.add(tag)));

        return {
            totalUpdates,
            lastUpdateDate: lastUpdate.date,
            lastUpdateTitle: lastUpdate.title,
            uniqueTags: ['All', ...Array.from(allTags)]
        };
    }, []);

    const handleFilterChange = useCallback((filter: string) => {
        setActiveFilter(filter);
    }, []);

    return (
        <div className="physical-page page-content">
            <Section id="physical-dashboard">
                <div className="physical-container">
                    {/* Header / Dashboard Area */}
                    <div className="dashboard-header">
                        <div className="title-block">
                            <h1 className="section-title">Physical Progress</h1>
                            <p className="subtitle">Hardware integration and build log.</p>
                        </div>

                        <div className="stats-grid">
                            <div className="stat-card">
                                <span className="stat-label">Latest Update</span>
                                <span className="stat-value highlight">{stats.lastUpdateDate}</span>
                                <span className="stat-sub">{stats.lastUpdateTitle}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">Total Logs</span>
                                <span className="stat-value">{stats.totalUpdates}</span>
                            </div>
                            <div className="stat-card">
                                <span className="stat-label">System Status</span>
                                <span className="stat-value status-indicator">
                                    <span className="status-dot warning"></span>
                                    Debugging
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="content-grid">
                        {/* Sidebar */}
                        <aside className="sidebar">
                            <div className="filter-section">
                                <h3>Filter Updates</h3>
                                <div className="filter-tags">
                                    {stats.uniqueTags.map(tag => (
                                        <button
                                            key={tag}
                                            className={`filter-tag ${activeFilter === tag ? 'active' : ''}`}
                                            onClick={() => handleFilterChange(tag)}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sticky Report Summary (Optional Mini-view) */}
                            <div className="mini-report">
                                <h3>Current Issue</h3>
                                <div className="mini-alert warning">
                                    <strong>CAN Bus Failure</strong>
                                    <p>Motor unresponsive. Investigating signal integrity.</p>
                                </div>
                            </div>
                        </aside>

                        {/* Main Feed */}
                        <main className="feed-container">
                            <div className="feed-header">
                                <h2>Build Journal</h2>
                                <div className="section-line"></div>
                            </div>
                            <ProgressFeed activeFilter={activeFilter} />
                        </main>
                    </div>
                </div>
            </Section>
        </div>
    );
};
