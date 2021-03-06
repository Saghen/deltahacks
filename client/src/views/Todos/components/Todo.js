import colors from '@colors'
import { TextAccent, TextSecondary, Title, Text } from '@components/Typography'
import styled from '@emotion/styled'
import { getStatus, getStatusColor } from '@helpers/status'
import { getPriorityIcon } from '@icons/Priority'
import { getStatusIcon } from '@icons/Status'
import { Flex } from 'lese'

const TodoContainer = styled(Flex)`
  transition: 0.2s background-color;

  background-color: ${colors.backgrounds[800]};
  padding: 24px;

  :hover {
    background-color: ${colors.backgrounds[900]};
    cursor: pointer;
  }
`

export const Todo = ({ todo }) => {
  const PriorityIcon = getPriorityIcon(todo.properties.priority)
  const StatusIcon = getStatusIcon(todo.properties.status)
  return (
    <TodoContainer separation="16px" xAlign="space-between">
      <Flex separation="8px" yAlign>
        <TextAccent>#{todo.referenceId}</TextAccent>
        <Title>{todo.name}</Title>
        <TextSecondary>{todo.description}</TextSecondary>
      </Flex>
      <Flex separation="16px" yAlign>
        <Flex separation="8px" yAlign>
          <StatusIcon />
          <Text color={getStatusColor(todo.properties.status)}>{getStatus(todo.properties.status)}</Text>
        </Flex>
        <PriorityIcon />
      </Flex>
    </TodoContainer>
  )
}
