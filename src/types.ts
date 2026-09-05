export type Severity = 'critical' | 'warning' | 'info';
export type AlertStatus = 'new' | 'acknowledged' | 'escalated' | 'resolved';
export type AlertType =
  | 'Person Detected'
  | 'Restricted-Zone Intrusion'
  | 'Crowd Gathering'
  | 'Possible Fall'
  | 'Smoke/Fire Warning'
  | 'Camera Tampering'
  | 'Unattended Object';

export type CameraStatus = 'online' | 'offline' | 'maintenance';

export interface Camera {
  id: string;
  name: string;
  location: string;
  group: string;
  status: CameraStatus;
  image: string;
  lastUpdate: string;
}

export interface Alert {
  id: string;
  type: AlertType;
  severity: Severity;
  cameraName: string;
  location: string;
  timestamp: string;
  confidence: number;
  description: string;
  status: AlertStatus;
  thumbnail: string;
}

export interface Incident {
  id: string;
  severity: Severity;
  cameraName: string;
  location: string;
  dateTime: string;
  guardian: string;
  status: string;
  type: AlertType;
  description: string;
  resolution: string;
}

export interface Guardian {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  notificationPref: string;
  status: 'active' | 'inactive';
  avatar: string;
}

export interface UploadRecord {
  id: string;
  fileName: string;
  camera: string;
  location: string;
  uploadTime: string;
  status: 'processing' | 'analyzed' | 'queued' | 'failed';
  alertsFound: number;
  fileSize: string;
}
