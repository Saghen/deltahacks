import styled from '@emotion/styled'
import { Flex } from 'lese'

import colors from '@colors'

export const Button = styled(Flex)`
  ${({ disabled }) => disabled && 'pointer-events: none; opacity: 0.5;'}
  color: ${({ secondary, color, textColor }) =>
    secondary ? color || colors.secondary : textColor || colors.textOnPrimary};
  background: ${({ secondary, color }) => (secondary ? 'transparent' : color || colors.secondary)};
  border: 2px solid ${({ color }) => color || colors.secondary};
  padding: ${({ wide }) => (wide ? '12px 32px' : '12px 20px')};
  transition: 0.2s all;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  align-items: center;
`.withComponent('button')
