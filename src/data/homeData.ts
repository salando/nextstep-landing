// Home page data constants

export interface MissionCard {
    number: string;
    title: string;
    description: string;
}

export interface ProgressItem {
    icon: string;
    title: string;
    description: string;
    status: 'complete' | 'in-progress' | 'planned';
}

export interface FutureItem {
    number: string;
    title: string;
    description: string;
}

export const MISSION_CARDS: MissionCard[] = [
    {
        number: '01',
        title: 'Accessible Technology',
        description: 'Making exoskeleton technology affordable and available to everyone, not just research labs.'
    },
    {
        number: '02',
        title: 'Open Source Design',
        description: 'Sharing designs and research so others can build, modify, and improve upon this work.'
    },
    {
        number: '03',
        title: 'Real-World Impact',
        description: 'Helping people with mobility challenges and workers in physically demanding jobs.'
    }
];

export const PROGRESS_ITEMS: ProgressItem[] = [
    {
        icon: '✓',
        title: 'Research Complete',
        description: 'Biomechanics, motor selection, and power analysis finished.',
        status: 'complete'
    },
    {
        icon: '⚡',
        title: 'Hardware Acquired',
        description: 'Motors, controllers, and sensors sourced and ready.',
        status: 'complete'
    },
    {
        icon: '🔧',
        title: 'Assembly & Testing',
        description: 'Physical integration and control system development.',
        status: 'in-progress'
    },
    {
        icon: '◎',
        title: 'Field Testing',
        description: 'Real-world testing and optimization.',
        status: 'planned'
    }
];

export const FUTURE_ITEMS: FutureItem[] = [
    {
        number: '01',
        title: 'Knee Assist Module',
        description: 'Extending support to full lower-body movement assistance.'
    },
    {
        number: '02',
        title: 'Wireless Control App',
        description: 'Mobile app for monitoring and customizing assistance levels.'
    },
    {
        number: '03',
        title: 'Commercial Version',
        description: 'A polished, user-friendly product for everyday use.'
    }
];
