import React from 'react';
import {View, Text, Animated, TouchableWithoutFeedback} from 'react-native';
import styles from './Styles';

function Button({children, animated, style, textStyle, icon, onPress, disabled}) {
  const Root = animated ? Animated.View : View;
  return (
    <TouchableWithoutFeedback 
    disabled={disabled}
    onPress={onPress}>
      <Root style={[styles.container, style]}>
        {icon ? (
          icon
        ) : (
          <Text style={[styles.label, textStyle]}>{children}</Text>
        )}
      </Root>
    </TouchableWithoutFeedback>
  );
}

export {Button};
