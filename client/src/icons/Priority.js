import colors from '@colors'

export const NoPriority = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <circle cx="2" cy="9" r="2" fill={colors.typography.secondary} />
    <circle cx="8" cy="9" r="2" fill={colors.typography.secondary} />
    <circle cx="14" cy="9" r="2" fill={colors.typography.secondary} />
  </svg>
)

export const LowPriority = () => (
  <svg width="18" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="12" width="4" height="6" fill={colors.typography.accent} />
    <rect x="6" y="6" width="4" height="12" fill={colors.typography.secondary} />
    <rect x="12" width="4" height="18" fill={colors.typography.secondary} />
  </svg>
)

export const MediumPriority = () => (
  <svg width="18" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="12" width="4" height="6" fill={colors.typography.accent} />
    <rect x="6" y="6" width="4" height="12" fill={colors.typography.accent} />
    <rect x="12" width="4" height="18" fill={colors.typography.secondary} />
  </svg>
)

export const HighPriority = () => (
  <svg width="18" height="18" viewBox="0 0 16 18" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="12" width="4" height="6" fill={colors.typography.accent} />
    <rect x="6" y="6" width="4" height="12" fill={colors.typography.accent} />
    <rect x="12" width="4" height="18" fill={colors.typography.accent} />
  </svg>
)

export const UrgentPriority = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="18" height="18" rx="2" ry="2" fill={colors.backgrounds.primary} />
    <path
      d="M9.64844 11.7891H8.34375L8.24219 3.625H9.75781L9.64844 11.7891ZM8.1875 14.2734C8.1875 14.0391 8.25781 13.8438 8.39844 13.6875C8.54427 13.526 8.75781 13.4453 9.03906 13.4453C9.32031 13.4453 9.53385 13.526 9.67969 13.6875C9.82552 13.8438 9.89844 14.0391 9.89844 14.2734C9.89844 14.5078 9.82552 14.7031 9.67969 14.8594C9.53385 15.0104 9.32031 15.0859 9.03906 15.0859C8.75781 15.0859 8.54427 15.0104 8.39844 14.8594C8.25781 14.7031 8.1875 14.5078 8.1875 14.2734Z"
      fill={colors.typography.primary}
    />
  </svg>
)

export const getPriorityIcon = (priority) =>
  [NoPriority, LowPriority, MediumPriority, HighPriority, UrgentPriority][priority]
