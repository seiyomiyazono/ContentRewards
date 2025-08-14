export const colors = {
  primary: {
    50: 'bg-teal-50',
    100: 'bg-teal-100',
    400: 'bg-teal-400',
    500: 'bg-teal-500',
    600: 'bg-teal-600',
  },
  text: {
    primary: 'text-teal-500',
    secondary: 'text-teal-600',
    white: 'text-white',
  },
  status: {
    completed: 'bg-green-100 text-green-800',
    inProgress: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    requiresRevision: 'bg-red-100 text-red-800',
  },
  notification: {
    approval: 'bg-green-50 border-green-200 text-green-600',
    revision: 'bg-red-50 border-red-200 text-red-600',
    invitation: 'bg-blue-50 border-blue-200 text-blue-600',
    info: 'bg-gray-50 border-gray-200 text-gray-600',
  }
} as const;