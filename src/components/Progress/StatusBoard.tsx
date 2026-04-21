import './StatusBoard.css';

type Task = {
  id: string;
  title: string;
  status: 'completed' | 'active' | 'pending' | 'backlog';
  priority: 'critical' | 'high' | 'medium' | 'low' | 'optional';
  detail: string;
};

const TASKS: Task[] = [
  { id: '1', title: 'Motor Research', status: 'completed', priority: 'critical', detail: 'Completed: GIM8108-8 selected (22Nm peak, 1:8 planetary).' },
  { id: '2', title: 'Component Selection', status: 'completed', priority: 'high', detail: 'Full BOM created: Motors, Pi 5, CAN HAT, LiPo.' },
  { id: '3', title: 'Parts Sourcing', status: 'completed', priority: 'high', detail: 'Received: GIM8108-8 motors, RPi 5, Waveshare CAN HAT.' },
  { id: '4', title: 'Hardware Integration', status: 'active', priority: 'critical', detail: 'Wiring complete. Debugging CAN bus to GDS68 driver.' },
  { id: '5', title: 'Motor Control Code', status: 'active', priority: 'critical', detail: 'Python control loop deployed. CAN comms failing.' },
  { id: '6', title: 'Battery Research', status: 'completed', priority: 'high', detail: '4S LiPo selected. Runtime: 21+ min continuous.' },
  { id: '7', title: 'Battery Wiring', status: 'pending', priority: 'medium', detail: 'XT-90 connectors. Swappable battery mount.' },
  { id: '8', title: 'Frame & Belt Assembly', status: 'backlog', priority: 'medium', detail: 'Ratchet belt + rigid frame harness.' },
  { id: '9', title: 'AI Implementation', status: 'backlog', priority: 'optional', detail: 'Adaptive gait learning (Future).' },
];

const StatusBadge = ({ status }: { status: Task['status'] }) => {
  const colors = {
    completed: 'var(--color-success)',
    active: 'var(--color-warning)',
    pending: 'var(--color-primary)',
    backlog: 'var(--color-text-muted)',
  };
  return (
    <span
      className="status-badge mono"
      style={{ borderColor: colors[status], color: colors[status] }}
    >
      {status.toUpperCase()}
    </span>
  );
};

export const StatusBoard = () => {
  return (
    <div className="status-board-grid">
      {TASKS.map((task) => (
        <div key={task.id} className={`task-card priority-${task.priority}`}>
          <div className="task-header">
            <span className={`priority-dot ${task.priority}`}></span>
            <span className="mono text-muted text-sm-priority">{task.priority.toUpperCase()}</span>
          </div>
          <h3 className="task-title">{task.title}</h3>
          <p className="task-detail">{task.detail}</p>
          <StatusBadge status={task.status} />
        </div>
      ))}
    </div>
  );
};
