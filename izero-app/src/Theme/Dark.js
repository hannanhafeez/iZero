import {DefaultTheme, DarkTheme} from '@react-navigation/native';

const Dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

export {Dark};
