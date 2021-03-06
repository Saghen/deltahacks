import ReactSwitch from 'react-switch';

import colors from '@colors';

export const Switch = ({ checked, onChange, height, width }) => (
  <ReactSwitch
    checked={checked}
    onChange={onChange}
    offColor="#D5D8E8"
    onColor={colors.backgrounds.primary}
    boxShadow="0px 4px 4px rgba(0, 0, 0, 0.1)"
    activeBoxShadow="0px 4px 4px rgba(0, 0, 0, 0.1)"
    checkedIcon={false}
    uncheckedIcon={false}
    height={height ?? 20}
    width={width ?? 36}
  />
);
