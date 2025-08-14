import { CATEGORY_PLATFORM_MAP, PROJECT_CATEGORIES } from '../constants/project';

export const getPlatformsByCategory = (category: string): string[] => {
  return CATEGORY_PLATFORM_MAP[category as keyof typeof CATEGORY_PLATFORM_MAP] || ['YouTube'];
};

export const calculateCurrentPayout = (totalPayout: number, progress: number): number => {
  return (totalPayout * progress) / 100;
};

export const formatJapaneseNumber = (num: number): string => {
  return num.toLocaleString();
};