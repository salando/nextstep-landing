
import React from 'react';
import './StatusBoard.css';

type Task = {
  id: string;
  title: string;
  status: 'completed' | 'active' | 'pending' | 'backlog';
  priority: 'critical' | 'high' | 'medium' | 'low' | 'optional';
  detail: string;
};

const TASKS: Task[] = [
  { id: '1', title: 'Motor Research', status: 'completed', priority: 'critical', detail: 'Completed: Specs analysis & selection.' },
  { id: '2', title: 'Component Selection', status: 'completed', priority: 'high', detail: 'Full BOM created (Power, Control, Safety).' },
  { id: '3', title: 'Parts Sourcing', status: 'active', priority: 'high', detail: 'Ordering vendors & logistics.' },
  { id: '4', title: 'Battery Calculations', status: 'pending', priority: 'critical', detail: 'Runtime & discharge analysis.' },
  { id: '5', title: 'Battery Wiring', status: 'backlog', priority: 'medium', detail: 'BMS implementation & safety circuits.' },
  { id: '6', title: 'Motor Coding', status: 'backlog', priority: 'medium', detail: 'CAN bus protocol implementation.' },
  { id: '7', title: 'AI Implementation', status: 'backlog', priority: 'optional', detail: 'Adaptive gait learning (Future).' },
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
            <span className="mono text-muted" style={{ fontSize: '0.8em' }}>{task.priority.toUpperCase()}</span>
          </div>
          <h3 className="task-title">{task.title}</h3>
          <p className="task-detail">{task.detail}</p>
          <StatusBadge status={task.status} />
        </div>
      ))}
    </div>
  );
};
