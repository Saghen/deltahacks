import colors from '@colors';
import styled from '@emotion/styled';
import { Base, propertyGenerator } from 'lese';

const TextPropertyGenerator = propertyGenerator([
  ['bold', () => 'font-weight: 700'],
  ['semiBold', () => 'font-weight: 600'],
  ['medium', () => 'font-weight: 500'],
  ['regular', () => 'font-weight: 400'],
  ['lineHeight', { property: 'line-height' }],
  ['fixedWidthNumbers', () => 'font-variant-numeric: tabular-nums'],
  ['align', { property: 'text-align', default: 'center' }],
  ['fontSize', { property: 'font-size' }],
  ['upperCase', () => 'text-transform: uppercase'],
  ['capitalize', () => 'text-transform: capitalize'],
]);

export const Text = styled(Base)`
  color: ${({ color }) => color ?? colors.typography.primary};
  ${TextPropertyGenerator}
`.withComponent('span');

export const TextAccent = styled(Text)`
  color: ${() => colors.typography.accent};
`

export const TextSecondary = styled(Text)`
  color: ${() => colors.typography.secondary};
`;

export const TextTertiary = styled(Text)`
  color: ${() => colors.typography.tertiary};
`;

export const TextQuaternary = styled(Text)`
  color: ${() => colors.typography.quaternary};
`;

export const Title = (props) => <Text fontSize="1.2em" bold {...props} />;

export const Link = styled(Text)`
  cursor: pointer;
  color: ${({ color }) => color ?? colors.typography.accent};
  text-decoration: none;
`.withComponent('a');
