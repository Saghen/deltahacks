import { useState } from 'react'

import colors from '@colors'
import { Button } from '@components/Button'
import { Text } from '@components/Typography'
import styled from '@emotion/styled'
import { Flex } from 'lese'
import { PinnedTodo } from './components/PinnedTodo'
import { Todo } from './components/Todo'

import { Select } from '@components/Select'

const TodosContainer = styled(Flex)`
  padding: 32px;
  background-color: ${colors.backgrounds[500]};
  overflow-y: auto;
`

const TodoContainer = styled(Flex)`
  background-color: ${colors.backgrounds[700]};
  padding: 0;
  border-radius: 8px;

  min-width: 400px;
  max-width: 1000px;
  width: 100%;
`

const sortOptions = [
  { component: <Text>Sort by Status</Text>, value: 'status' },
  { component: <Text>Sort by Priority</Text>, value: 'priority' },
  { component: <Text>Sort by Age</Text>, value: 'age' },
]

const pinnedTodoData = new Array(3).fill({
  name: 'Pinned Todo',
  description: 'Description of Todo Item',
  referenceId: 134,
  properties: { status: 3, priority: 3 },
})
const todoData = new Array(50).fill(0).map(() => ({
  name: 'Todo Title',
  description: 'Description of Todo Item',
  referenceId: 134,
  properties: { status: Math.floor(Math.random() * 5), priority: Math.floor(Math.random() * 5) },
}))

export const Todos = () => {
  const [sortOption, setSortOption] = useState(sortOptions[1])
  return (
    <TodosContainer column xAlign="center" separation="24px">
      <Flex xAlign separation="36px">
        {pinnedTodoData.map((todo) => (
          <PinnedTodo todo={todo} />
        ))}
      </Flex>
      <TodoContainer column xAlign="stretch">
        <Flex yAlign xAlign="space-between" style={{ margin: '16px 24px' }}>
          <Select options={sortOptions} value={sortOption.component} onChange={setSortOption}></Select>
          <Button>Create new Todo</Button>
        </Flex>
        {todoData
          .sort((todo1, todo2) => todo2.properties.status - todo1.properties.status)
          .sort((todo1, todo2) => todo2.properties[sortOption.value] - todo1.properties[sortOption.value])
          .map((todo) => (
            <Todo todo={todo} />
          ))}
      </TodoContainer>
    </TodosContainer>
  )
}
