export interface Project {
  id: string;
  title: string;
  reward: string;
  deadline: string;
  viewsRequired: number;
  totalPayout: number;
  progress: number;
  category: string;
  status: 'pending' | 'in-progress' | 'completed' | 'requires-revision';
}

export interface Group {
  id: string;
  name: string;
  memberCount: number;
  activeProjects: number;
  totalEarnings: number;
  status: 'member' | 'pending' | 'invited';
  role: 'participant' | 'creator';
}

export interface Notification {
  id: string;
  type: 'approval' | 'revision' | 'invitation' | 'info';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface EarningsData {
  period: string;
  amount: number;
}

export interface Review {
  id: string;
  userName: string;
  avatar: string;
  rating: number;
  comment: string;
  timestamp: string;
  purchaseTime: string;
}

export interface ProjectDetail extends Project {
  description: string;
  features: string[];
  price: number;
  memberCount: number;
  rating: number;
  totalReviews: number;
  reviews: Review[];
  heroImage: string;
  companyName: string;
}

export interface ClientProject {
  id: string;
  title: string;
  description: string;
  reward: string;
  budget: number;
  deadline: string;
  category: string;
  status: 'draft' | 'active' | 'paused' | 'completed' | 'cancelled';
  applicants: number;
  acceptedWorkers: number;
  totalViews: number;
  createdAt: string;
  requirements: string[];
}