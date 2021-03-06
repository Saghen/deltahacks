import colors from '@colors'
import { Text } from '@components/Typography'
import styled from '@emotion/styled'
import { Flex } from 'lese'

// TODO: Temporary circle
const Circle = styled(Flex)`
  background-color: ${colors.backgrounds.primary};
  border-radius: 50%;
  width: 24px;
  height: 24px;
`

// TODO: Name this
const TopLeftContainer = styled(Flex)`
  background-color: ${colors.backgrounds[700]};
  padding: 12px;
`.withComponent('header')

export const TopLeft = () => (
  <TopLeftContainer separation="16px" yAlign>
    <Circle />
    <Text>Username</Text>
  </TopLeftContainer>
)
