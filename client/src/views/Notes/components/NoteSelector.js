import React from 'react'
import colors from '@colors'
import { Button } from '@components/Button'
import { Text } from '@components/Typography'
import styled from '@emotion/styled'
import { Flex } from 'lese'

const SidebarContainer = styled(Flex)`
  background-color: ${colors.backgrounds[700]};
  justify-content: space-between;
  right: 0px;
`.withComponent('nav')

const SideBarItem = styled(Flex)`
  padding: 20px 12px;
  border-right: ${({ active }) => (active ? `6px` : '0px')} solid ${colors.backgrounds.primary};
  background-color: ${colors.backgrounds[700]};
  cursor: pointer;

  &:hover {
    border-right-width: 6px;
    background-color: ${colors.backgrounds[800]};
  }
`

SideBarItem.defaultProps = {
  yAlign: true,
}

export const NoteSelector = () => {
  const projects = new Array(6).fill('Note Name')
  return (
    <SidebarContainer column yAlign="space-between">
      <Flex column>
        {projects.map((noteText) => (
          <SideBarItem>
            <Text>{noteText}</Text>
          </SideBarItem>
        ))}
      </Flex>
      <Button xAlign>Create New Note</Button>
    </SidebarContainer>
  )
}
