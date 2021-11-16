import React from 'react';
import {View, Text} from 'react-native';
import styles from './Styles';

function Heading({children, sub, style, containerStyle}) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.text, style]}>{children}</Text>

      {sub ? <Text style={styles.sub}>{sub}</Text> : null}
    </View>
  );
}

export {Heading};
