export const PROJECT_CATEGORIES = {
  video: 'video',
  article: 'article', 
  review: 'review'
} as const;

export const PLATFORM_CONFIGS = {
  YouTube: {
    name: 'YouTube',
    bgColor: 'bg-red-500'
  },
  TikTok: {
    name: 'TikTok', 
    bgColor: 'bg-black'
  },
  Instagram: {
    name: 'Instagram',
    bgColor: 'bg-gradient-to-br from-purple-500 to-pink-500'
  },
  Twitter: {
    name: 'Twitter',
    bgColor: 'bg-blue-400'
  }
} as const;

export const CATEGORY_PLATFORM_MAP = {
  [PROJECT_CATEGORIES.video]: ['YouTube', 'TikTok', 'Instagram'],
  [PROJECT_CATEGORIES.article]: ['Instagram', 'TikTok', 'Twitter'],
  [PROJECT_CATEGORIES.review]: ['Instagram']
} as const;