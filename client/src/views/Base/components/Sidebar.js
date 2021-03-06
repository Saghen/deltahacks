import colors from '@colors'
import { Button } from '@components/Button'
import { Text } from '@components/Typography'
import styled from '@emotion/styled'
import { Flex } from 'lese'

const SidebarContainer = styled(Flex)`
  background-color: ${colors.backgrounds[800]};
`.withComponent('nav')

const SideBarItem = styled(Flex)`
  padding: 20px 12px;
  border-right: ${({ active }) => (active ? `6px` : '0px')} solid ${colors.backgrounds.primary};
  background-color: ${({ secondary }) => (secondary ? colors.backgrounds[700] : colors.backgrounds[800])};
  cursor: pointer;

  &:hover {
    border-right-width: 6px;
  }
`

SideBarItem.defaultProps = {
  yAlign: true,
}

export const Sidebar = () => {
  const projects = new Array(6).fill('Project Name')

  return (
    <SidebarContainer column yAlign="space-between">
      <Flex column>
        {projects.map((projectText) => (
          <SideBarItem>
            <Text>{projectText}</Text>
          </SideBarItem>
        ))}
      </Flex>
      <Button xAlign>Create New Project</Button>
    </SidebarContainer>
  )
}
