import colors from '@colors'
import { Text } from '@components/Typography'
import styled from '@emotion/styled'
import { Flex } from 'lese'

// TODO: Name this
const TopLeftContainer = styled(Flex)`
  background-color: ${colors.backgrounds[800]};
  padding: 12px;
`.withComponent('header')

export const TopLeft = () => (
  <TopLeftContainer yAlign>
    <Text>User</Text>
  </TopLeftContainer>
)
