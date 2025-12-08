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
        id: '4',
        date: '2025-12-07',
        title: 'Motor Integration & Debugging',
        content: 'Integrated Raspberry Pi 5 with Waveshare CAN HAT and CyberGear motors. Successfully deployed the Python driver and v1 test script. Currently debugging a critical CAN communication issue where the motor is unresponsive to commands. Physical wiring verified, moving to signal analysis.',
        tags: ['Hardware', 'Integration', 'Debugging', 'Python'],
        images: [
            '/research_images/image56.png',
            '/research_images/image54.png',
            '/research_images/motor_setup_1.jpg',
            '/research_images/motor_setup_2.jpg',
            '/research_images/motor_setup_5.jpg',
            '/research_images/can_setup_1.png',
            '/research_images/can_setup_2.png'
        ]
    },
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
