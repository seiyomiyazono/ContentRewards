export interface VideoProject {
  id: string;
  title: string;
  thumbnail: string;
  editorName: string;
  editorRating: number;
  editorCompletedProjects: number;
  status: 'in-progress' | 'awaiting-feedback' | 'completed' | 'revision-requested' | 'material-uploaded';
  progress: number;
  deliveryDate: string;
  createdAt: string;
  budget: number;
  description: string;
  timeline: TimelineStep[];
  files: ProjectFile[];
  messages: ChatMessage[];
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

export interface TimelineStep {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
  completedAt?: string;
  description: string;
}

export interface ProjectFile {
  id: string;
  name: string;
  type: 'material' | 'draft' | 'final';
  url: string;
  uploadedAt: string;
  uploadedBy: 'client' | 'editor';
  size: string;
}

export interface ChatMessage {
  id: string;
  sender: 'client' | 'editor';
  message: string;
  timestamp: string;
  attachments?: string[];
}

export interface Notification {
  id: string;
  type: 'message' | 'delivery' | 'payment';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  projectId?: string;
}