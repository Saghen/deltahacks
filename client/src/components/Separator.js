import colors from '@colors';
import styled from '@emotion/styled';

export const Separator = styled('div')`
  background-color: ${({ color }) => color ?? colors.backgrounds.separator};
  ${({ horizontal }) => (horizontal ? 'height: 1px' : 'width: 1px')};
  ${({ horizontal, size }) => `${horizontal ? 'width' : 'height'}: ${size ?? '100%'}`};
`;
