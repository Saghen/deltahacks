import colors from '@colors'
import styled from '@emotion/styled'
import { Flex } from 'lese'
import { ChevronDown } from 'react-feather'
import { Text } from './Typography'

const SelectStyled = styled(Flex)`
  position: relative;
  padding: 12px 16px;
  cursor: pointer;

  &:not(:focus) > *:nth-child(2) {
    display: none;
  }
`

const SelectItem = styled(Flex)`
  padding: 12px 16px;
  background-color: ${colors.backgrounds[700]};
  transition: 0.2s background-color;
  white-space: nowrap;

  :hover {
    background-color: ${colors.backgrounds[800]};
  }
`

const SelectItemContainer = styled(Flex)`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;

  box-shadow: 0px 8px 12px #00000044;
`

export const Select = ({ color = colors.typography.primary, options, value, onChange }) => (
  <SelectStyled tabIndex="0">
    <Flex separation="8px">
      <Text>{value}</Text>
      <ChevronDown color={color} />
    </Flex>
    <SelectItemContainer column>
      {options.map((option) => (
        <SelectItem key={option.value} onClick={() => onChange(option)}>
          {option.component}
        </SelectItem>
      ))}
    </SelectItemContainer>
  </SelectStyled>
)
