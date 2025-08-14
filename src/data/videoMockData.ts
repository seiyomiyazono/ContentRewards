import { VideoProject, TimelineStep, ProjectFile, ChatMessage, Notification } from '../types/video';

export const mockVideoProjects: VideoProject[] = [
  {
    id: 'v1',
    title: 'Product Launch Video',
    thumbnail: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=400',
    editorName: 'Alex Chen',
    editorRating: 4.9,
    editorCompletedProjects: 127,
    status: 'in-progress',
    progress: 65,
    deliveryDate: '2025-02-15',
    createdAt: '2025-01-20',
    budget: 1500,
    description: 'Create a compelling product launch video showcasing our new AI-powered fitness tracker.',
    paymentStatus: 'pending',
    timeline: [
      {
        id: 't1',
        title: 'Material Uploaded',
        status: 'completed',
        completedAt: '2025-01-21T10:00:00Z',
        description: 'All raw footage and assets uploaded'
      },
      {
        id: 't2',
        title: 'Editing',
        status: 'in-progress',
        description: 'Video editing and post-production'
      },
      {
        id: 't3',
        title: 'Review',
        status: 'pending',
        description: 'Client review and feedback'
      },
      {
        id: 't4',
        title: 'Revision',
        status: 'pending',
        description: 'Apply client feedback'
      },
      {
        id: 't5',
        title: 'Final Delivery',
        status: 'pending',
        description: 'Final video delivery'
      }
    ],
    files: [
      {
        id: 'f1',
        name: 'raw_footage_01.mp4',
        type: 'material',
        url: '#',
        uploadedAt: '2025-01-21T10:00:00Z',
        uploadedBy: 'client',
        size: '2.4 GB'
      },
      {
        id: 'f2',
        name: 'draft_v1.mp4',
        type: 'draft',
        url: '#',
        uploadedAt: '2025-01-25T14:30:00Z',
        uploadedBy: 'editor',
        size: '850 MB'
      }
    ],
    messages: [
      {
        id: 'm1',
        sender: 'editor',
        message: 'Hi! I\'ve started working on your project. The first draft should be ready by tomorrow.',
        timestamp: '2025-01-22T09:15:00Z'
      },
      {
        id: 'm2',
        sender: 'client',
        message: 'Great! Looking forward to seeing the progress.',
        timestamp: '2025-01-22T09:30:00Z'
      }
    ]
  },
  {
    id: 'v2',
    title: 'Corporate Training Video',
    thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400',
    editorName: 'Sarah Johnson',
    editorRating: 4.8,
    editorCompletedProjects: 89,
    status: 'awaiting-feedback',
    progress: 90,
    deliveryDate: '2025-02-10',
    createdAt: '2025-01-15',
    budget: 2200,
    description: 'Educational video for employee onboarding process.',
    paymentStatus: 'paid',
    timeline: [
      {
        id: 't1',
        title: 'Material Uploaded',
        status: 'completed',
        completedAt: '2025-01-16T08:00:00Z',
        description: 'All raw footage and assets uploaded'
      },
      {
        id: 't2',
        title: 'Editing',
        status: 'completed',
        completedAt: '2025-01-28T16:00:00Z',
        description: 'Video editing and post-production'
      },
      {
        id: 't3',
        title: 'Review',
        status: 'in-progress',
        description: 'Client review and feedback'
      },
      {
        id: 't4',
        title: 'Revision',
        status: 'pending',
        description: 'Apply client feedback'
      },
      {
        id: 't5',
        title: 'Final Delivery',
        status: 'pending',
        description: 'Final video delivery'
      }
    ],
    files: [
      {
        id: 'f3',
        name: 'training_materials.zip',
        type: 'material',
        url: '#',
        uploadedAt: '2025-01-16T08:00:00Z',
        uploadedBy: 'client',
        size: '1.8 GB'
      },
      {
        id: 'f4',
        name: 'final_draft.mp4',
        type: 'draft',
        url: '#',
        uploadedAt: '2025-01-28T16:00:00Z',
        uploadedBy: 'editor',
        size: '1.2 GB'
      }
    ],
    messages: [
      {
        id: 'm3',
        sender: 'editor',
        message: 'The final draft is ready for your review. Please let me know if you need any changes.',
        timestamp: '2025-01-28T16:15:00Z'
      }
    ]
  },
  {
    id: 'v3',
    title: 'Social Media Campaign',
    thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=400',
    editorName: 'Mike Rodriguez',
    editorRating: 4.7,
    editorCompletedProjects: 156,
    status: 'completed',
    progress: 100,
    deliveryDate: '2025-01-30',
    createdAt: '2025-01-10',
    budget: 800,
    description: 'Short-form videos for Instagram and TikTok campaign.',
    paymentStatus: 'paid',
    timeline: [
      {
        id: 't1',
        title: 'Material Uploaded',
        status: 'completed',
        completedAt: '2025-01-11T12:00:00Z',
        description: 'All raw footage and assets uploaded'
      },
      {
        id: 't2',
        title: 'Editing',
        status: 'completed',
        completedAt: '2025-01-25T14:00:00Z',
        description: 'Video editing and post-production'
      },
      {
        id: 't3',
        title: 'Review',
        status: 'completed',
        completedAt: '2025-01-27T10:00:00Z',
        description: 'Client review and feedback'
      },
      {
        id: 't4',
        title: 'Revision',
        status: 'completed',
        completedAt: '2025-01-29T15:00:00Z',
        description: 'Apply client feedback'
      },
      {
        id: 't5',
        title: 'Final Delivery',
        status: 'completed',
        completedAt: '2025-01-30T11:00:00Z',
        description: 'Final video delivery'
      }
    ],
    files: [
      {
        id: 'f5',
        name: 'social_content.zip',
        type: 'material',
        url: '#',
        uploadedAt: '2025-01-11T12:00:00Z',
        uploadedBy: 'client',
        size: '500 MB'
      },
      {
        id: 'f6',
        name: 'final_videos.zip',
        type: 'final',
        url: '#',
        uploadedAt: '2025-01-30T11:00:00Z',
        uploadedBy: 'editor',
        size: '300 MB'
      }
    ],
    messages: [
      {
        id: 'm4',
        sender: 'editor',
        message: 'All videos have been delivered! Thank you for working with me.',
        timestamp: '2025-01-30T11:15:00Z'
      },
      {
        id: 'm5',
        sender: 'client',
        message: 'Excellent work! Will definitely hire you again.',
        timestamp: '2025-01-30T12:00:00Z'
      }
    ]
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'message',
    title: 'New message from Alex Chen',
    message: 'The first draft is ready for review',
    timestamp: '2025-01-28T16:15:00Z',
    read: false,
    projectId: 'v1'
  },
  {
    id: 'n2',
    type: 'delivery',
    title: 'Project completed',
    message: 'Social Media Campaign has been delivered',
    timestamp: '2025-01-30T11:00:00Z',
    read: true,
    projectId: 'v3'
  },
  {
    id: 'n3',
    type: 'payment',
    title: 'Payment reminder',
    message: 'Payment pending for Product Launch Video',
    timestamp: '2025-01-29T09:00:00Z',
    read: false,
    projectId: 'v1'
  }
];

export const mockClientProjects = [
  {
    id: 'c1',
    title: 'AIツール紹介動画制作',
    description: '最新のAIツールの使い方を分かりやすく解説する動画を制作してください。初心者向けの内容で、実際の操作画面を含めた構成をお願いします。',
    reward: '￥5.00/1,000再生',
    budget: 150000,
    deadline: '2025-03-15',
    category: 'video',
    status: 'active',
    applicants: 24,
    acceptedWorkers: 8,
    totalViews: 125000,
    createdAt: '2025-01-15',
    requirements: [
      '動画編集スキル必須',
      'AI関連の知識があること',
      '5分以上の動画制作',
      '字幕・テロップ付き'
    ]
  },
  {
    id: 'c2',
    title: 'プロダクトレビュー記事執筆',
    description: '新商品のレビュー記事を執筆していただきます。実際に商品を使用した感想や特徴を詳しく記載してください。',
    reward: '￥3.50/1,000再生',
    budget: 80000,
    deadline: '2025-02-28',
    category: 'article',
    status: 'active',
    applicants: 15,
    acceptedWorkers: 5,
    totalViews: 67000,
    createdAt: '2025-01-20',
    requirements: [
      '商品レビュー経験',
      '2000文字以上',
      '写真撮影可能',
      'SEO対策済み'
    ]
  },
  {
    id: 'c3',
    title: 'フィットネスアプリ解説',
    description: 'フィットネス関連のアプリの使い方や効果について解説するコンテンツを制作してください。',
    reward: '￥4.20/1,000再生',
    budget: 200000,
    deadline: '2025-04-10',
    category: 'video',
    status: 'draft',
    applicants: 0,
    acceptedWorkers: 0,
    totalViews: 0,
    createdAt: '2025-01-25',
    requirements: [
      'フィットネス知識',
      '動画制作経験',
      '実演可能',
      '10分以上の動画'
    ]
  },
  {
    id: 'c4',
    title: 'テクノロジートレンド解説',
    description: '2025年のテクノロジートレンドについて分析・解説する記事を執筆してください。',
    reward: '￥6.00/1,000再生',
    budget: 120000,
    deadline: '2025-03-01',
    category: 'article',
    status: 'completed',
    applicants: 32,
    acceptedWorkers: 12,
    totalViews: 180000,
    createdAt: '2024-12-10',
    requirements: [
      'テック業界知識',
      '3000文字以上',
      'データ分析スキル',
      '図表作成可能'
    ]
  },
  {
    id: 'c5',
    title: 'ライフスタイル商品紹介',
    description: 'ライフスタイル関連商品の魅力を伝える動画コンテンツを制作してください。',
    reward: '￥3.80/1,000再生',
    budget: 95000,
    deadline: '2025-02-20',
    category: 'video',
    status: 'paused',
    applicants: 18,
    acceptedWorkers: 6,
    totalViews: 45000,
    createdAt: '2025-01-10',
    requirements: [
      'ライフスタイル系経験',
      '商品撮影スキル',
      '7分以上の動画',
      'ナレーション付き'
    ]
  }
];