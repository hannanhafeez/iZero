import {DefaultTheme} from '@react-navigation/native';
import colors from '../Constants/colors';

const Light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
    white: colors.pureWhite,
  },
};

export {Light};
