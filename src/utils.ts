export function severityClasses(severity: string) {
  switch (severity) {
    case 'critical':
      return {
        text: 'text-angel-critical',
        bg: 'bg-angel-critical/10',
        border: 'border-angel-critical/30',
        dot: 'bg-angel-critical',
        label: 'Critical',
      };
    case 'warning':
      return {
        text: 'text-angel-warning',
        bg: 'bg-angel-warning/10',
        border: 'border-angel-warning/30',
        dot: 'bg-angel-warning',
        label: 'Warning',
      };
    default:
      return {
        text: 'text-angel-gold-light',
        bg: 'bg-angel-gold/10',
        border: 'border-angel-gold/30',
        dot: 'bg-angel-gold',
        label: 'Info',
      };
  }
}

export function statusClasses(status: string) {
  switch (status) {
    case 'online':
    case 'active':
    case 'resolved':
    case 'secure':
      return {
        text: 'text-angel-secure',
        dot: 'bg-angel-secure',
        label: status === 'online' ? 'Online' : status === 'active' ? 'Active' : 'Resolved',
      };
    case 'offline':
      return { text: 'text-angel-muted', dot: 'bg-angel-muted', label: 'Offline' };
    case 'maintenance':
      return { text: 'text-angel-warning', dot: 'bg-angel-warning', label: 'Maintenance' };
    case 'inactive':
      return { text: 'text-angel-muted', dot: 'bg-angel-muted', label: 'Inactive' };
    default:
      return { text: 'text-angel-muted', dot: 'bg-angel-muted', label: status };
  }
}

export function alertStatusBadge(status: string) {
  switch (status) {
    case 'new':
      return { text: 'text-angel-gold-light', bg: 'bg-angel-gold/10', border: 'border-angel-gold/30', label: 'New' };
    case 'acknowledged':
      return { text: 'text-angel-ivory', bg: 'bg-angel-panel-hover', border: 'border-angel-border', label: 'Acknowledged' };
    case 'escalated':
      return { text: 'text-angel-critical', bg: 'bg-angel-critical/10', border: 'border-angel-critical/30', label: 'Escalated' };
    case 'resolved':
      return { text: 'text-angel-secure', bg: 'bg-angel-secure/10', border: 'border-angel-secure/30', label: 'Resolved' };
    default:
      return { text: 'text-angel-muted', bg: 'bg-angel-panel', border: 'border-angel-border', label: status };
  }
}
