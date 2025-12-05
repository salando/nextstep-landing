import React from 'react';
import { Section } from '../components/UI/Section';
import { StatusBoard } from '../components/Progress/StatusBoard';
import { ProgressFeed } from '../components/Progress/ProgressFeed';

export const Development = () => {
    return (
        <div className="page-content">
            <Section id="dev-log">
                <div className="section-header">
                    <h2 className="section-title">Development Log</h2>
                    <div className="section-line"></div>
                </div>
                <div className="overview-text">
                    <p>
                        Tracking the engineering progress of the NextStep Exoskeleton.
                        Tasks are prioritized by critical path dependencies.
                    </p>
                </div>

                <div style={{ marginTop: '3rem' }}>
                    <StatusBoard />
                </div>

                <div style={{ marginTop: '5rem' }}>
                    <div className="section-header">
                        <h3 className="section-title" style={{ fontSize: '1.5rem' }}>Progress Log</h3>
                        <div className="section-line"></div>
                    </div>
                    <ProgressFeed />
                </div>
            </Section>
        </div>
    );
};
