import colors from '@colors'
import { TextAccent, TextSecondary, Title, Text } from '@components/Typography'
import styled from '@emotion/styled'
import { getStatus, getStatusColor } from '@helpers/status'
import { getPriorityIcon } from '@icons/Priority'
import { getStatusIcon } from '@icons/Status'
import { Flex } from 'lese'

import { X } from 'react-feather'

const PinnedTodoContainer = styled(Flex)`
  background-color: ${colors.backgrounds[800]};
  padding: 24px;
  border-radius: 8px;
  width: 300px;
`

export const PinnedTodo = ({ todo }) => {
  const PriorityIcon = getPriorityIcon(todo.properties.priority)
  const StatusIcon = getStatusIcon(todo.properties.status)
  return (
    <PinnedTodoContainer separation="8px" column xAlign="stretch">
      <Flex xAlign="space-between" yAlign>
        <Title>{todo.name}</Title>
        <X color={colors.typography.primary} />
      </Flex>
      <Flex separation="8px" yAlign>
        <TextAccent>#{todo.referenceId}</TextAccent>
        <TextSecondary>{todo.description}</TextSecondary>
      </Flex>
      <Flex xAlign="space-between" yAlign>
        <Flex separation="8px" yAlign>
          <StatusIcon />
          <Text color={getStatusColor(todo.properties.status)}>{getStatus(todo.properties.status)}</Text>
        </Flex>
        <PriorityIcon />
      </Flex>
    </PinnedTodoContainer>
  )
}
