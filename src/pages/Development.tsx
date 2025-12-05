import React from 'react';
import { Section } from '../components/UI/Section';
import { StatusBoard } from '../components/Progress/StatusBoard';

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
            </Section>
        </div>
    );
};
