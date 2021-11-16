import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import Styles from './Styles';
import {heightPercentageToDP} from '../../Helpers/Responsive';

function Container({children, safeArea, fixedHeight, check}) {
  const Root = safeArea ? SafeAreaView : View;
  return (
    <Root
      style={[
        Styles.container,
        {alignItems: check ? 'flex-start' : 'center', },
        fixedHeight ? {height: heightPercentageToDP('100%')
      } : null,
      ]}>
      {children}
    </Root>
  );
}

export {Container};
