import colors from '@colors'

export const getStatus = (statusNum) => {
  if (statusNum < 0 || statusNum > 4) throw new Error('Status number must be between 0 and 4')
  return ['Cancelled', 'Backlog', 'Todo', 'In Progress', 'Done'][statusNum]
}

const statusColors = {
  Cancelled: colors.general.red,
  Backlog: colors.typography.secondary,
  Todo: colors.typography.primary,
  'In Progress': colors.general.yellow,
  Done: colors.general.blue,
}

export const getStatusColor = (status) => {
  if (typeof status === 'number') status = getStatus(status)

  if (typeof status !== 'string' || !Object.keys(statusColors).includes(status))
    throw new Error('Status must be a valid number or string')

  return statusColors[status]
}
