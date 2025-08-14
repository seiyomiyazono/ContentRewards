export const formatCurrency = (amount: number): string => {
  return `$${amount.toFixed(2)}`;
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const formatDate = (dateString: string, locale: string = 'ja-JP'): string => {
  return new Date(dateString).toLocaleDateString(locale);
};

export const formatTimeAgo = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return '数分前';
  if (diffInHours < 24) return `${diffInHours}時間前`;
  if (diffInHours < 48) return '1日前';
  return `${Math.floor(diffInHours / 24)}日前`;
};