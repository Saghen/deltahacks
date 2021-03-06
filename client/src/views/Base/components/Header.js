import colors from '@colors'
import { TextSecondary, Title } from '@components/Typography'
import styled from '@emotion/styled'
import { Flex } from 'lese'

const HeaderContainer = styled(Flex)`
  background-color: ${colors.backgrounds[700]};
  padding: 4px 12px;
`.withComponent('header')

export const Header = () => (
  <HeaderContainer yAlign separation="16px">
    <Title>Project Name</Title>
    <TextSecondary>Description of the project</TextSecondary>
  </HeaderContainer>
)
