export type ProgressEntry = {
    id: string;
    date: string;
    title: string;
    content: string;
    images?: string[];
    tags: string[];
};

export const PROGRESS_DATA: ProgressEntry[] = [
    {
        id: '1',
        date: '2025-10-15',
        title: 'Initial Motor Testing',
        content: 'Successfully tested the high-torque brushless motors. The response time is under 20ms, which is well within our safety margins. We built a simple test rig to verify the torque output against our theoretical calculations.',
        tags: ['Hardware', 'Testing', 'Motors'],
        images: [] // Placeholder for real images
    },
    {
        id: '2',
        date: '2025-10-28',
        title: 'PCB Design Finalized',
        content: 'Completed the schematic and board layout for the main control unit. The board includes the microcontroller, motor drivers, and power management circuits. Sent out for manufacturing today.',
        tags: ['Electronics', 'PCB', 'Design'],
        images: []
    },
    {
        id: '3',
        date: '2025-11-10',
        title: 'Frame Prototyping',
        content: 'Received the aluminum extrusions for the main frame. Started cutting and assembling the leg structure. The weight is slightly higher than anticipated, so we might need to drill some weight-reduction holes.',
        tags: ['Mechanical', 'Frame', 'Prototyping'],
        images: []
    }
];
