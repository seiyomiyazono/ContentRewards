import { Project, Group, Notification, EarningsData } from '../types';
import { ProjectDetail, Review, ClientProject } from '../types';

export const mockProjects: Project[] = [
  {
    id: '1',
    title: 'OddsJam Clipping Campaign',
    reward: '￥2.50/1,000再生',
    deadline: '2025-02-15',
    viewsRequired: 50000,
    totalPayout: 40000,
    progress: 1,
    category: 'video',
    status: 'in-progress'
  },
  {
    id: '2', 
    title: 'Timothy Sykes Clips (Earn $2 per...)',
    reward: '￥2.00/1,000再生',
    deadline: '2025-02-10',
    viewsRequired: 29926,
    totalPayout: 29926,
    progress: 0,
    category: 'video',
    status: 'in-progress'
  },
  {
    id: '3',
    title: 'CEO Gage Clips - Earn $3.33 per 1,000 views by...',
    reward: '￥3.33/1,000再生',
    deadline: '2025-02-20',
    viewsRequired: 172347,
    totalPayout: 30359,
    progress: 7,
    category: 'review',
    status: 'pending'
  },
  {
    id: '4',
    title: 'Fitness Content Creation',
    reward: '￥1.80/1,000再生',
    deadline: '2025-02-08',
    viewsRequired: 15000,
    totalPayout: 2500,
    progress: 90,
    category: 'article',
    status: 'requires-revision'
  },
  {
    id: '5',
    title: 'Tech Review Series',
    reward: '￥2.75/1,000再生',
    deadline: '2025-02-25',
    viewsRequired: 35000,
    totalPayout: 8750,
    progress: 45,
    category: 'video',
    status: 'in-progress'
  },
  {
    id: '6',
    title: 'Gaming Highlights Compilation',
    reward: '￥1.95/1,000再生',
    deadline: '2025-02-18',
    viewsRequired: 28000,
    totalPayout: 5460,
    progress: 23,
    category: 'video',
    status: 'in-progress'
  }
];

export const mockGroups: Group[] = [
  {
    id: '1',
    name: 'テックコンテンツクリエイターズ',
    memberCount: 24,
    activeProjects: 12,
    totalEarnings: 3420.50,
    status: 'member',
    role: 'participant'
  },
  {
    id: '2',
    name: 'ライフスタイル＆ウェルネス',
    memberCount: 18,
    activeProjects: 8,
    totalEarnings: 2180.75,
    status: 'member',
    role: 'creator'
  },
  {
    id: '3',
    name: 'プレミアムレビューアーズ',
    memberCount: 6,
    activeProjects: 15,
    totalEarnings: 5800.00,
    status: 'invited',
    role: 'participant'
  },
  {
    id: '4',
    name: 'エンタメ・カルチャー',
    memberCount: 32,
    activeProjects: 20,
    totalEarnings: 4250.25,
    status: 'pending',
    role: 'participant'
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'approval',
    title: '案件が承認されました',
    message: '「AIツール完全ガイド」が承認され、$125.00が支払われました。',
    timestamp: '2024-03-20T10:30:00Z',
    read: false
  },
  {
    id: '2',
    type: 'revision',
    title: '修正依頼',
    message: '「プロダクティビティアプリレビュー」について追加の情報が必要です。',
    timestamp: '2024-03-20T09:15:00Z',
    read: false
  },
  {
    id: '3',
    type: 'invitation',
    title: 'グループ招待',
    message: '「プレミアムレビューアーズ」グループに招待されました。',
    timestamp: '2024-03-19T16:45:00Z',
    read: true
  },
  {
    id: '4',
    type: 'info',
    title: 'ランクアップ！',
    message: 'おめでとうございます！プロライターランクに昇格しました。',
    timestamp: '2024-03-19T14:20:00Z',
    read: true
  },
  {
    id: '5',
    type: 'approval',
    title: '案件が承認されました',
    message: '「フィットネステック解説動画」が承認され、$240.00が支払われました。',
    timestamp: '2024-03-18T11:00:00Z',
    read: true
  },
  {
    id: '6',
    type: 'info',
    title: '新機能リリース',
    message: '新しいダッシュボード機能がリリースされました。',
    timestamp: '2024-03-17T13:30:00Z',
    read: true
  }
];

export const mockEarningsData = {
  week: [
    { period: '月', amount: 45 },
    { period: '火', amount: 120 },
    { period: '水', amount: 80 },
    { period: '木', amount: 200 },
    { period: '金', amount: 150 },
    { period: '土', amount: 90 },
    { period: '日', amount: 110 }
  ],
  month: [
    { period: '1週', amount: 805 },
    { period: '2週', amount: 920 },
    { period: '3週', amount: 1150 },
    { period: '4週', amount: 1320 }
  ],
  year: [
    { period: '1月', amount: 2840 },
    { period: '2月', amount: 3150 },
    { period: '3月', amount: 2950 },
    { period: '4月', amount: 3420 },
    { period: '5月', amount: 3800 },
    { period: '6月', amount: 4200 }
  ]
};

export const mockTopPerformers = [
  { rank: 1, name: '山田太郎', earnings: 4250, projects: 15 },
  { rank: 2, name: '佐藤花子', earnings: 3890, projects: 12 },
  { rank: 3, name: 'あなた', earnings: 3420, projects: 11, isCurrentUser: true },
  { rank: 4, name: '田中次郎', earnings: 3180, projects: 14 },
  { rank: 5, name: '鈴木美咲', earnings: 2950, projects: 9 }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    userName: 'Ali',
    avatar: '🦊',
    rating: 5,
    comment: 'Not bad',
    timestamp: '3 months ago',
    purchaseTime: 'Written 1 day after purchase'
  },
  {
    id: '2',
    userName: 'ahmsko',
    avatar: '🦊',
    rating: 2,
    comment: 'Not even 1 Star without checking the analytics he can say it is boring views',
    timestamp: '3 months ago',
    purchaseTime: 'Written 1 hour after purchase'
  },
  {
    id: '3',
    userName: 'Frozlyn07',
    avatar: '⚫',
    rating: 5,
    comment: 'Made almost 30 dollars from one video i JUST started. AMAZING!!!',
    timestamp: '4 months ago',
    purchaseTime: 'Written 6 days after purchase'
  },
  {
    id: '4',
    userName: 'Karim',
    avatar: '🦊',
    rating: 1,
    comment: 'Not even 1 star without checking the analytics he can say it is boring views',
    timestamp: '4 months ago',
    purchaseTime: 'Written 2 weeks after purchase'
  }
];

export const mockProjectDetails: ProjectDetail[] = [
  {
    ...mockProjects[0],
    description: 'Brezのエリートクリッパー向けプライベート招待グループ。チャレンジへの独占アクセスと特別報酬を提供します。',
    features: [
      '高単価RPM',
      '独占予算とチャレンジ',
      'エリートクリッピング講座'
    ],
    price: 49.00,
    memberCount: 120,
    rating: 4.0,
    totalReviews: 7,
    reviews: mockReviews,
    heroImage: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
    companyName: 'Brez Marketing'
  },
  {
    ...mockProjects[1],
    description: 'Timothy Sykes専用のクリッピング案件。高品質なコンテンツ制作で高収益を目指しましょう。プロフェッショナル向けの特別プログラムです。',
    features: [
      'プレミアムコンテンツアクセス',
      '高度な分析ツール',
      '優先サポート'
    ],
    price: 35.00,
    memberCount: 85,
    rating: 4.5,
    totalReviews: 12,
    reviews: mockReviews.slice(0, 2),
    heroImage: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
    companyName: 'Timothy Sykes'
  },
  {
    ...mockProjects[2],
    description: 'CEO Gageの独占クリッピング案件。1,000ビューあたり$3.33の高単価報酬を獲得できる特別プログラムです。',
    features: [
      '高単価RPMレート',
      '独占コンテンツ',
      '週次チャレンジ'
    ],
    price: 55.00,
    memberCount: 200,
    rating: 4.8,
    totalReviews: 25,
    reviews: mockReviews,
    heroImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    companyName: 'CEO Gage'
  }
];

export const getProjectDetail = (id: string): ProjectDetail | undefined => {
  return mockProjectDetails.find(project => project.id === id);
};

export const mockClientProjects: ClientProject[] = [
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